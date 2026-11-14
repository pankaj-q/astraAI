import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdown.css";

import CodeBlock from "./CodeBlock.jsx";
import MarkdownTable from "./MarkdownTable.jsx";
import MarkdownLink from "./MarkdownLink.jsx";
import ZoomableImage from "./ZoomableImage.jsx";

function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: MarkdownLink,
          table: MarkdownTable,
          ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5">{children}</ol>,
          li: ({ children }) => <li className="my-1">{children}</li>,
          code: ({ inline, className, children }) => {
            if (inline) {
              return <code className="inline-code">{children}</code>;
            }
            const match = /language-(\w+)/.exec(className || "");
            return (
              <CodeBlock language={match?.[1]} code={String(children).replace(/\n$/, "")} />
            );
          },
          pre: ({ children }) => <>{children}</>,
          img: ({ src, alt }) => (
            <ZoomableImage src={src} alt={alt || "image"} />
          ),
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
