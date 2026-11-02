import { useSelector } from "react-redux";
import { Sparkles, MessageCircle } from "lucide-react";
import MessageBubble from "./messageBubble.jsx";

function MessageList() {
  const { messages = [] } = useSelector((state) => state.message);

  const showWelcome = messages.length === 0;

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto bg-[#15171A]">
      {showWelcome ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#30343A] bg-[#111316]">
            <Sparkles size={28} strokeWidth={1.5} className="text-[#A78BFA]" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#E8E9EB] sm:text-3xl">
            AstraAI — Ask whatever you want.
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-[#858A93]">
            Explore ideas, ask questions, or build something amazing. Your next
            idea starts here.
          </p>

          <div className="mt-8 flex items-center gap-2 rounded-full border border-[#30343A] bg-[#111316] px-4 py-2 text-xs text-[#858A93]">
            <MessageCircle size={14} />
            <span>Ready when you are</span>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-8 sm:px-6">
          {messages.map((msg, index) => (
            <div key={msg._id || index}>
              <MessageBubble message={msg} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageList;
