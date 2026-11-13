import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./markdown.css";

import CodeBlock from "./CodeBlock.jsx";
import MarkdownTable from "./MarkdownTable.jsx";
import MarkdownLink from "./MarkdownLink.jsx";

function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: MarkdownLink,
          table: MarkdownTable,
          code: ({ inline, className, children }) => {
            if (inline) {
              return <code className="inline-code">{children}</code>;
            }
            return (
              <CodeBlock className={className}>{children}</CodeBlock>
            );
          },
          pre: ({ children }) => <>{children}</>,
          img: ({ src, alt }) => (
            <img src={src} alt={alt || "image"} className="my-2 max-h-72 rounded-lg object-contain" />
          ),
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
