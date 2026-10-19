import {
  Search,
  SquarePen,
  Settings,
  CircleUserRound,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

function SideArea() {
  return (
    <aside className="flex h-screen w-[260px] flex-col border-r border-[#252A32] bg-[#0F1115] text-[#F3F4F6]">
      {/* Logo */}
      <div className="flex h-[64px] items-center px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#5B8CFF] to-[#8B5CF6] text-sm font-semibold text-white">
            ✦
          </div>

          <span className="text-[17px] font-semibold tracking-tight">
            Astra
          </span>
        </div>
      </div>

      {/* New Chat + Search */}
      <div className="px-3">
        <button className="flex h-10 w-full items-center gap-2.5 rounded-lg border border-[#252A32] bg-[#14171C] px-3 text-[13px] font-medium transition hover:bg-[#181C22]">
          <SquarePen size={16} />
          <span>New chat</span>
        </button>

        <button className="mt-2 flex h-9 w-full items-center gap-2.5 rounded-lg px-3 text-[13px] text-[#9CA3AF] transition hover:bg-[#181C22] hover:text-white">
          <Search size={16} />

          <span>Search chats</span>

          <span className="ml-auto rounded border border-[#252A32] px-1.5 py-0.5 text-[10px] text-[#667085]">
            ⌘ K
          </span>
        </button>
      </div>

      {/* Conversations */}
      <div className="mt-7 flex-1 overflow-y-auto px-3">
        {/* Recent */}
        <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#667085]">
          Recent
        </div>

        <div className="space-y-1">
          {/* Active Chat */}
          <button className="group flex w-full items-center gap-2 rounded-lg border-l-2 border-[#5B8CFF] bg-[#1A2029] px-2.5 py-2.5 text-left">
            <MessageSquare size={15} className="shrink-0 text-[#5B8CFF]" />

            <span className="min-w-0 flex-1 truncate text-[13px]">
              Build authentication API
            </span>

            <MoreHorizontal
              size={15}
              className="hidden text-[#667085] group-hover:block"
            />
          </button>

          {/* Chat */}
          <button className="group flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-left transition hover:bg-[#181C22]">
            <MessageSquare size={15} className="shrink-0 text-[#667085]" />

            <span className="min-w-0 flex-1 truncate text-[13px] text-[#9CA3AF] group-hover:text-white">
              Explain Redis architecture
            </span>

            <MoreHorizontal
              size={15}
              className="hidden text-[#667085] group-hover:block"
            />
          </button>

          {/* Chat */}
          <button className="group flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-left transition hover:bg-[#181C22]">
            <MessageSquare size={15} className="shrink-0 text-[#667085]" />

            <span className="min-w-0 flex-1 truncate text-[13px] text-[#9CA3AF] group-hover:text-white">
              LangGraph routing
            </span>

            <MoreHorizontal
              size={15}
              className="hidden text-[#667085] group-hover:block"
            />
          </button>
        </div>

        {/* Yesterday */}
        <div className="mb-2 mt-7 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#667085]">
          Yesterday
        </div>

        <div className="space-y-1">
          <button className="group flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-left transition hover:bg-[#181C22]">
            <MessageSquare size={15} className="shrink-0 text-[#667085]" />

            <span className="min-w-0 flex-1 truncate text-[13px] text-[#9CA3AF] group-hover:text-white">
              Create a Node.js server
            </span>

            <MoreHorizontal
              size={15}
              className="hidden text-[#667085] group-hover:block"
            />
          </button>

          <button className="group flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-left transition hover:bg-[#181C22]">
            <MessageSquare size={15} className="shrink-0 text-[#667085]" />

            <span className="min-w-0 flex-1 truncate text-[13px] text-[#9CA3AF] group-hover:text-white">
              PostgreSQL database design
            </span>

            <MoreHorizontal
              size={15}
              className="hidden text-[#667085] group-hover:block"
            />
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t border-[#252A32] p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition hover:bg-[#181C22]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A2029] text-[#9CA3AF]">
            <CircleUserRound size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium">Pankaj</p>

            <p className="text-[11px] text-[#667085]">Free plan</p>
          </div>

          <Settings size={16} className="text-[#667085]" />
        </button>
      </div>
    </aside>
  );
}

export default SideArea;
