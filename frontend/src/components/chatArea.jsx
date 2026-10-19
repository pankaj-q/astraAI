import {
  Sparkles,
  Paperclip,
  AtSign,
  Mic,
  ArrowUp,
  Copy,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

function ChatArea() {
  return (
    <main className="flex h-screen min-w-0 flex-col bg-[#0B0D10] text-[#F3F4F6]">
      {/* Header */}
      <header className="flex h-[64px] shrink-0 items-center border-b border-[#252A32] px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#5B8CFF] to-[#8B5CF6]">
            <Sparkles size={14} className="text-white" strokeWidth={2} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium">Astra</span>

            <span className="text-[#667085]">/</span>

            <span className="text-[13px] text-[#9CA3AF]">Coding Agent</span>

            <ChevronDown size={14} className="text-[#667085]" />
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[820px] px-6 py-10">
          {/* User Message */}
          <div className="mb-8 flex justify-end">
            <div className="max-w-[70%] rounded-2xl rounded-br-md bg-[#181C22] px-4 py-3 text-[14px] leading-6 text-[#F3F4F6]">
              Build a Node.js authentication API with JWT and refresh tokens.
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3">
            {/* AI Avatar */}
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#5B8CFF] to-[#8B5CF6]">
              <Sparkles size={14} className="text-white" strokeWidth={2} />
            </div>

            <div className="min-w-0 flex-1">
              {/* Agent Header */}
              <div className="mb-2 flex items-center gap-2">
                <span className="text-[13px] font-semibold">Astra</span>

                <span className="rounded-md border border-[#252A32] bg-[#14171C] px-1.5 py-0.5 text-[10px] text-[#9CA3AF]">
                  Coding Agent
                </span>
              </div>

              {/* Response */}
              <div className="space-y-4 text-[14px] leading-7 text-[#D1D5DB]">
                <p>
                  I'll create the authentication flow with access tokens,
                  refresh tokens, protected routes, and secure password
                  handling.
                </p>

                {/* Generated Code */}
                <div>
                  <p className="mb-2 font-medium text-[#F3F4F6]">Created:</p>

                  <div className="rounded-xl border border-[#252A32] bg-[#111419] p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[12px] text-[#9CA3AF]">
                        auth.controller.js
                      </span>

                      <button className="text-[#667085] transition hover:text-[#F3F4F6]">
                        <Copy size={14} />
                      </button>
                    </div>

                    <pre className="mt-3 overflow-x-auto font-mono text-[12px] leading-6 text-[#D1D5DB]">
                      {`const accessToken = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);

return res.json({
  accessToken,
  refreshToken
});`}
                    </pre>
                  </div>
                </div>

                <p>
                  The complete implementation is available in the artifact panel
                  on the right.
                </p>
              </div>

              {/* Response Actions */}
              <div className="mt-4 flex items-center gap-1">
                <button className="flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] text-[#667085] transition hover:bg-[#181C22] hover:text-[#D1D5DB]">
                  <Copy size={13} />
                  Copy
                </button>

                <button className="flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] text-[#667085] transition hover:bg-[#181C22] hover:text-[#D1D5DB]">
                  <RotateCcw size={13} />
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Composer */}
      <div className="shrink-0 px-6 pb-5 pt-3">
        <div className="mx-auto w-full max-w-[820px]">
          <div className="rounded-2xl border border-[#252A32] bg-[#14171C] transition-colors focus-within:border-[#3A465A]">
            {/* Input */}
            <textarea
              rows={2}
              placeholder="Ask anything..."
              className="block w-full resize-none bg-transparent px-4 pt-4 text-[14px] leading-6 text-[#F3F4F6] outline-none placeholder:text-[#667085]"
            />

            {/* Input Actions */}
            <div className="flex items-center justify-between px-3 pb-3 pt-2">
              <div className="flex items-center gap-1">
                {/* Attach */}
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#1A2029] hover:text-[#F3F4F6]">
                  <Paperclip size={16} />
                </button>

                {/* Agent */}
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#1A2029] hover:text-[#F3F4F6]">
                  <AtSign size={16} />
                </button>

                {/* Voice */}
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#1A2029] hover:text-[#F3F4F6]">
                  <Mic size={16} />
                </button>
              </div>

              {/* Send */}
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5B8CFF] text-white transition hover:bg-[#7AA2FF]">
                <ArrowUp size={17} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-2 text-center text-[10px] text-[#667085]">
            Astra can make mistakes. Check important information.
          </p>
        </div>
      </div>
    </main>
  );
}

export default ChatArea;
