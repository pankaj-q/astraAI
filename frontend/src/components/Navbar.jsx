import { MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";

function Navbar() {
  const { selectedConversation } = useSelector((state) => state.conversations);

  const title = selectedConversation?.title?.trim() || "New chat";

  return (
    <nav className="flex h-[64px] w-full shrink-0 items-center border-b border-[#363A40] bg-[#0D0D0D] px-5">
      {/* Conversation Icon */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#30343A] bg-[#111316]">
        <MessageCircle size={16} strokeWidth={1.7} className="text-[#B7BBC1]" />
      </div>

      {/* Conversation Title */}
      <div className="ml-3 min-w-0">
        <p className="max-w-[500px] truncate text-[14px] font-medium text-[#E8E9EB]">
          {title}
        </p>
      </div>
    </nav>
  );
}

export default Navbar;
