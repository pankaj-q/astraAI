import Navbar from "./Navbar.jsx";
import MessageList from "./MessageList.jsx";
import InputMessage from "./InputMessage.jsx";

import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../pages/redux/messageSlice.js";
import { useState } from "react";

function ChatArea() {
  const { selectedConversation } = useSelector((state) => state.conversations);

  const { messages } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    setLoading(true);

    try {
      const userMessage = {
        role: "user",
        content: text,
      };

      // Show user message immediately
      dispatch(setMessage([...messages, userMessage]));

      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          conversationId: selectedConversation?._id,
          message: text,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      const aiMessage = {
        role: "assistant",
        content: data.message,
      };

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

      <div className="min-h-0 flex-1 overflow-y-auto">
        <MessageList />
      </div>

      <div className="shrink-0 border-t border-[#24272C] bg-[#15171A]">
        <InputMessage onSend={sendMessage} loading={loading} />

        <p className="pb-3 text-center text-[11px] text-[#555A62]">
          AstraAI can make mistakes. Check important information.
        </p>
      </div>
    </main>
  );
}

export default ChatArea;
