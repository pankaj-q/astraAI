import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);
  const codeText = (code || "").replace(/\n$/, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="my-3 overflow-hidden rounded-lg border border-[#252A32] bg-[#0D1117]">
      <div className="flex items-center justify-between border-b border-[#252A32] px-3 py-2">
        <span className="text-xs font-medium text-[#A7ABB1]">{language && language !== "text" ? language : ""}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-[#A7ABB1] hover:text-[#F3F4F6]"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <SyntaxHighlighter
        language={language || "text"}
        style={vscDarkPlus}
        customStyle={{ margin: 0, background: "transparent", padding: "0.75rem" }}
        wrapLongLines
      >
        {codeText}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
