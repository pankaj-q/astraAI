import { useState } from "react";
import { Send, Paperclip, Mic, Zap, MessageSquare, Code2, FileText, Presentation, ImageIcon, Globe, ChevronDown } from "lucide-react";

function InputMessage({ onSend, loading = false }) {
  const [value, setValue] = useState("");
  const[selectedAgent, setSelectedAgent] = useState("auto");
  const [agentMenuOpen, setAgentMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = value.trim();

    if (!text || loading) return;
    console.log("send message", text);

    onSend(text, selectedAgent);
    setValue("");
  }
  const agents = [
    {
      id: "auto",
      icon: Zap,
      lable: "Auto",
    },
    {
      id: "chat",
      icon: MessageSquare,
      lable: "Chat",
    },
    {
      id: "coding",
      icon: Code2,
      lable: "Coding",
    },
    {
      id: "pdf",
      icon: FileText,
      lable: "PDF",
    },
    {
      id: "ppt",
      icon: Presentation,
      lable: "PPT",
    },
    {
      id: "image",
      icon: ImageIcon,
      lable: "Image",
    },
    {
      id: "search",
      icon: Globe,
      lable: "Search",
    },
  ];
  

  return (
    <div className="w-full bg-[#15171A] px-4 pb-5 pt-3 sm:px-6">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl border border-[#363A40] bg-[#111316]">

          <textarea
            id="message"
            name="message"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="ask whatever you want...."
            rows={1}
            disabled={loading}
            className="max-h-40 min-h-14 w-full resize-none bg-transparent px-4 py-4 text-sm leading-6 text-[#E8E9EB] outline-none placeholder:text-[#686D75] disabled:opacity-60"
          />

          <div className="flex items-center justify-between px-3 pb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Attach file"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#858A93] hover:bg-[#25282E] hover:text-[#E8E9EB]"
              >
                <Paperclip size={18} strokeWidth={1.8} />
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAgentMenuOpen((v) => !v)}
                  className="flex h-9 items-center gap-1.5 rounded-xl border border-[#30343A] px-2.5 text-xs text-[#858A93] hover:bg-[#25282E] hover:text-[#E8E9EB]"
                >
                  {(() => {
                    const agent = agents.find((a) => a.id === selectedAgent) || agents[0];
                    const Icon = agent.icon;
                    return (
                      <>
                        <Icon size={14} strokeWidth={2} />
                        <span>{agent.lable}</span>
                      </>
                    );
                  })()}
                  <ChevronDown size={13} strokeWidth={2} />
                </button>

                {agentMenuOpen && (
                  <div className="absolute bottom-11 left-0 z-10 min-w-[130px] rounded-xl border border-[#30343A] bg-[#111316] py-1 shadow-lg">
                    {agents.map((agent) => {
                      const Icon = agent.icon;
                      return (
                        <button
                          key={agent.id}
                          type="button"
                          onClick={() => {
                            setSelectedAgent(agent.id);
                            setAgentMenuOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-[#25282E] ${
                            selectedAgent === agent.id
                              ? "text-[#A78BFA]"
                              : "text-[#858A93]"
                          }`}
                        >
                          <Icon size={13} strokeWidth={2} />
                          <span>{agent.lable}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Record Voice"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#858A93] hover:bg-[#25282E] hover:text-[#E8E9EB]"
              >
                <Mic size={19} strokeWidth={1.8} />
              </button>

              <button
                type="submit"
                disabled={!value.trim() || loading}
                aria-label="Send message"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-[#E8E9EB] text-[#111316] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Send size={17} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-[11px] text-[#686D75]">
          AstraAI can make mistakes. Verify important information.
        </p>
      </form>
    </div>
  );
}
export default InputMessage;