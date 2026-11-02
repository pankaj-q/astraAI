import Navbar from "./Navbar.jsx";
import MessageList from "./MessageList.jsx";
import InputMessage from "./InputMessage.jsx";
import ArtifactArea from "./ArtifactArea.jsx";
import sendMessage from "../features/sendMessage.js";
import { createConversation } from "../features/createConversation.js";

import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../pages/redux/messageSlice.js";
import { setSelectedConversation } from "../pages/redux/conversationSlice.js";
import { useState } from "react";

function ChatArea() {
  const { selectedConversation } = useSelector((state) => state.conversations);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [artifact, setArtifact] = useState(null);

  const handleSendMessage = async (text) => {
    if (!text.trim() || loading) return;

    setLoading(true);
    setError(null);

    // Show user message immediately on the right
    const userMessage = { role: "user", content: text };
    dispatch(addMessage(userMessage));

    try {
      let conversation = selectedConversation;
      // Auto-create conversation if none selected
      if (!conversation?._id) {
        const conv = await createConversation();
        if (!conv?._id) throw new Error("Failed to create conversation");
        dispatch(setSelectedConversation(conv));
        conversation = conv;
      }

      const data = await sendMessage({
        conversationId: conversation._id,
        prompt: text,
      });

      const aiMessage = {
        role: "assistant",
        content: data.response,
      };

      if (data.artifact) setArtifact(data.artifact);
      dispatch(addMessage(aiMessage));
    } catch (err) {
      console.error("Message error:", err);
      setError(err.message || "Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-[#15171A] text-[#E8E9EB]">
      <Navbar />

      <div className="min-h-0 flex-1 overflow-y-auto relative">
        {error && (
          <div className="mx-auto w-full max-w-4xl px-4 py-4 text-center">
            <p className="text-sm text-[#F87171]">{error}</p>
          </div>
        )}
        <MessageList />
        <ArtifactArea artifact={artifact} onClose={() => setArtifact(null)} />
      </div>

      <div className="shrink-0 border-t border-[#24272C] bg-[#15171A]">
        <InputMessage onSend={handleSendMessage} loading={loading} />
      </div>
    </main>
  );
}

export default ChatArea;
