import { useState } from "react";
import { Copy, Check } from "lucide-react";

function getText(node) {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (node.props?.children) return getText(node.props.children);
  return "";
}

function CodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false);
  const language = (className || "").match(/language-(\w+)/)?.[1] || "code";
  const codeText = getText(children).replace(/\n$/, "");

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
        <span className="text-xs font-medium text-[#A7ABB1]">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-[#A7ABB1] hover:text-[#F3F4F6]"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-sm leading-6">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;
