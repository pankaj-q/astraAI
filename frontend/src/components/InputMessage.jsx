import { useState } from "react";
import { Send, Paperclip, Mic } from "lucide-react";

function InputMessage({ onSend, loading = false }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = value.trim();

    if (!text || loading) return;
    console.log("send message", text);

    onSend(text);
    setValue("");
  };

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
            <button
              type="button"
              aria-label="Attach file"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[#858A93] hover:bg-[#25282E] hover:text-[#E8E9EB]"
            >
              <Paperclip size={18} strokeWidth={1.8} />
            </button>

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
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#111316] border-t-transparent" />
                ) : (
                  <Send size={17} strokeWidth={2} />
                )}
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