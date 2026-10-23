import Navbar from "./Navbar.jsx";
import MessageList from "./MessageList.jsx";
import InputMessage from "./InputMessage.jsx";
import ArtifactArea from "./ArtifactArea.jsx";
import sendMessage from "../features/sendMessage.js";

import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../pages/redux/messageSlice.js";
import { useState } from "react";

function ChatArea() {
  const { selectedConversation } = useSelector((state) => state.conversations);

  const { messages } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [artifact, setArtifact] = useState(null);

  const handleSendMessage = async (text) => {
    if (!text.trim() || loading) return;

    setLoading(true);

    try {
      const userMessage = {
        role: "user",
        content: text,
      };

      // Show user message immediately
      dispatch(setMessage([...messages, userMessage]));

      const data = await sendMessage({
        conversationId: selectedConversation?._id,
        message: text,
      });

      const aiMessage = {
        role: "assistant",
        content: data.message,
      };

      // Check if response contains an artifact
      if (data.artifact) {
        setArtifact(data.artifact);
      }

      dispatch(setMessage([...messages, userMessage, aiMessage]));
    } catch (error) {
      console.error("Message error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-[#15171A] text-[#E8E9EB]">
      <Navbar />

      <div className="min-h-0 flex-1 overflow-y-auto relative">
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
