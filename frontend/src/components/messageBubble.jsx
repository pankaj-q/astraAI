import MarkdownRenderer from "./markdown/MarkdownRenderer.jsx";

function messageBubble({ message }) {
  const isUser = message.role === "user";
  const content = message.content || message.message || "";
  const images = Array.isArray(message.images) ? message.images : [];

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-full px-4 py-3 text-sm ${
          isUser
            ? "w-fit max-w-[85%] rounded-2xl bg-[#292D35] text-[#F3F4F6]"
            : "w-full rounded-none bg-[#15171A] text-[#D1D5DB]"
        }`}
      >
        <MarkdownRenderer content={content} />

        {images.length > 0 && (
          <div className="mt-2 flex flex-col gap-2">
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`result-${idx}`}
                className="max-h-72 rounded-lg object-contain"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default messageBubble;
