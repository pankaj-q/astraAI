const renderInline = (text) => {
  return text.split(/\n/).map((line, i) => {
    const chunks = line.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/);
    return (
      <span key={i} className="block">
        {chunks.map((chunk, j) => {
          if (!chunk) return null;
          if (chunk.startsWith("**") && chunk.endsWith("**")) {
            return <strong key={j}>{chunk.slice(2, -2)}</strong>;
          }
          if (chunk.startsWith("`") && chunk.endsWith("`")) {
            return (
              <code key={j} className="bg-[#1F2227] px-1 py-0.5 rounded text-[#A78BFA]">
                {chunk.slice(1, -1)}
              </code>
            );
          }
          const link = chunk.match(/^\[(.+)\]\((.+)\)$/);
          if (link) {
            return (
              <a
                key={j}
                href={link[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A78BFA] underline underline-offset-4"
              >
                {link[1]}
              </a>
            );
          }
          return chunk;
        })}
      </span>
    );
  });
};

const renderContent = (content) => {
  if (!content) return null;
  const blocks = content.split(/```(\w+)?\n([\s\S]*?)```/g);
  return blocks.map((block, i) => {
    const position = i % 4;
    if (position === 1) return null;
    if (position === 2) {
      return (
        <pre
          key={i}
          className="my-2 rounded-lg bg-[#0D1117] p-3 text-xs font-mono text-[#E8E9EB] overflow-x-auto leading-6"
        >
          <code>{block}</code>
        </pre>
      );
    }
    return <span key={i} className="my-2 block leading-7">{renderInline(block)}</span>;
  });
};

function messageBubble({ message }) {
  const isUser = message.role === "user";
  const content = message.content || message.message || "";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-7 ${
          isUser
            ? "rounded-br-md bg-[#292D35] text-[#F3F4F6]"
            : "rounded-bl-md bg-[#1F2227] border border-[#24272C] text-[#D1D5DB]"
        }`}
      >
        <markdown>{renderContent(content)}</markdown>
        
      </div>
    </div>
  );
}

export default messageBubble;
