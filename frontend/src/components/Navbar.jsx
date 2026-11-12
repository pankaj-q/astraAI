import { MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";

function Navbar() {
  const { selectedConversation } = useSelector((state) => state.conversations);
  const { messages = [] } = useSelector((state) => state.message);

  const title = selectedConversation?.title?.trim() || "New chat";

  return (
    <nav className="flex h-[45px] w-full shrink-0 items-center rounded-xl border border-[#363A40] bg-[#141414] px-5">
      {/* Conversation Icon */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#30343A] bg-[#111316]">
        <MessageCircle size={16} strokeWidth={1.7} className="text-[#B7BBC1]" />
      </div>

      {/* Conversation Title */}
      <div className="ml-3 flex min-w-0 items-center gap-2">
        <p className="max-w-[500px] truncate text-[14px] font-medium text-[#E8E9EB]">
          {title}
        </p>
        <span className="shrink-0 rounded-full border border-[#30343A] bg-[#111316] px-2 py-0.5 text-[11px] text-[#858990]">
          {messages.length}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
