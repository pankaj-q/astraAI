import { getModel } from "../config/llmModels.js";

const detectLanguage = (text = "") => {
  const match = text.match(/```([\w+#.-]+)/);
  return match ? match[1].toLowerCase() : "text";
};

const looksLikeWeb = (prompt = "") =>
  /website|web\s?app|landing\s?page|frontend|front-end|html|css|javascript|dashboard|portfolio|clone|ui\b|web\s?page/i.test(
    prompt,
  );

export const codingAgent = async (params) => {
  const intentLlm = getModel("intent");
  const llm = getModel("coding");

  const intentRes = await intentLlm.invoke(`
       you are an intent classifier.
       Return ONLY one of these values:

       CODE_GENERATION
       CODE_REVIEW
       CODE_EXPLANATION
       DEBUGGING
       CONVERSATION
       OPTIMIZATION
       DOCUMENTATION

       User Request:
       ${params.prompt}
    `);

  const intent = String(intentRes.content || "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  const isGeneration = intent.includes("GENERATION");
  let aiResponse = "";

  if (isGeneration) {
    const prompt = `
You are AstraAI, an expert Senior Software Engineer and Code Generation Assistant.

### CORE INSTRUCTIONS

1. Understand the user's requirements carefully before generating code.
2. Generate complete, working code that directly solves the requested problem.
3. Follow industry-standard coding practices and appropriate design patterns.
4. Write clean, readable, modular, and maintainable code.
5. Handle edge cases and potential runtime errors.
6. Follow the language and framework specified by the user.
7. If the user does not specify a language, infer the most appropriate one.
8. Never leave incomplete implementations, TODO comments or placeholder logic.
9. Never fabricate APIs or library functionality.
${
  looksLikeWeb(params.prompt)
    ? `
### WEB / UI REQUEST

The user wants a website or UI. Build it as ONE complete, self-contained HTML file:
- Return the whole page inside a single \`\`\`html code block.
- Put all CSS in a <style> tag and all JS in a <script> tag inside that same file.
- No external frameworks, bundlers or CDNs unless the user explicitly asks.
- Use real, polished content and a modern responsive design — no lorem-ipsum placeholders.
- The file must render correctly on its own in a browser.

Response format (keep it short so the file is never cut off):
1. A 2-3 line summary.
2. The complete \`\`\`html file.
3. A short "How to run" note (1-2 lines).
`
    : `
### CODE OUTPUT FORMAT

Structure your response using Markdown:

## Solution
Briefly explain what you are going to build.

## Implementation
Provide the complete code inside appropriate language-specific code blocks.

## Explanation
Explain the important parts of the implementation.

## Usage
Explain how to run or use the generated code.
`
}
### IMPORTANT RULES

- If the user requests a single function, generate only that function.
- If multiple files are required, clearly separate them using file names as headings.
- If essential requirements are ambiguous, ask a clarification question instead of making major assumptions.
- If the user provides existing code, preserve its existing architecture and conventions.

### USER REQUEST
${params.prompt}

Generate the solution now.`;

    const res = await llm.invoke(prompt);
    aiResponse = res.content;
  } else {
    const res = await llm.invoke(`
    The user request is:
    ${params.prompt}

    The classified intent is: ${intent}

    Return markdown only.
    Never generate project files.
    Use headings like:

    # Overview
    ## Problems
    ## Improvements
    ## Review
    ## Explanation
    ## Best Practices
    ## Optimised Code

    User request:
    ${params.prompt}`);
    aiResponse = res.content;
  }

  // Show code in the artifact panel for generations and any reply with code.
  const hasCode =
    isGeneration ||
    /```[\w+#.-]*\n[\s\S]*?```/.test(aiResponse || "") ||
    /<(html|!doctype|head|body|style|script)[\s>]/i.test(aiResponse || "");

  const artifacts = hasCode
    ? [
        {
          id: Date.now(),
          type: "code",
          language: detectLanguage(aiResponse),
          title: params.prompt,
          content: aiResponse,
        },
      ]
    : [];

  return {
    ...params,
    message: "response generated successfully",
    aiResponse,
    artifacts,
  };
};
