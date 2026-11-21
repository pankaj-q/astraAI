import "dotenv/config"
import { ChatGroq } from "@langchain/groq";

const groqModel = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});

// Coding answers (especially full HTML pages) need a higher output budget.
const codingModel = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: 8192,
  maxRetries: 2,
});

export const getModel = (agent) => {
  switch (agent) {
    case "coding":
      return codingModel;
    case "chat":
    case "search":
    default:
      return groqModel;
  }
};
