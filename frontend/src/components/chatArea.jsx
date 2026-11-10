import Navbar from "./Navbar.jsx";
import MessageList from "./MessageList.jsx";
import InputMessage from "./InputMessage.jsx";
import ArtifactArea from "./ArtifactArea.jsx";
import sendMessage from "../features/sendMessage.js";
import { createConversation } from "../features/createConversation.js";
import { updateConversation } from "../features/updateConversation.js";
import getMessage from "../features/getMessage.js";

import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessage } from "../pages/redux/messageSlice.js";
import {
  setSelectedConversation,
  addConversation,
  setConversation,
} from "../pages/redux/conversationSlice.js";
import { useState, useEffect, useRef } from "react";

function ChatArea() {
  const { selectedConversation, conversations } = useSelector(
    (state) => state.conversations,
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [artifact, setArtifact] = useState(null);

  const isNewConversationRef = useRef(false);

  // Load messages whenever the selected conversation changes.
  useEffect(() => {
    // Skip the fetch for a conversation we just created in handleSendMessage,
    // since its messages are already managed optimistically.
    if (isNewConversationRef.current) {
      isNewConversationRef.current = false;
      return;
    }

    const id = selectedConversation?._id || selectedConversation?.id;
    if (!id) {
      dispatch(setMessage([]));
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const data = await getMessage(id);
        if (cancelled) return;
        const msgs = Array.isArray(data?.message)
          ? data.message
          : data?.messages || [];
        dispatch(setMessage(msgs.slice().reverse()));
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedConversation?._id, selectedConversation?.id]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || loading) return;

    setLoading(true);
    setError(null);

    // Show user message immediately on the right
    const userMessage = { role: "user", content: text };
    dispatch(addMessage(userMessage));

    try {
      let conversation = selectedConversation;
      const title = text.trim().slice(0, 40);

      // Auto-create conversation if none selected
      if (!conversation?._id && !conversation?.id) {
        const conv = await createConversation();
        if (!conv?._id && !conv?.id) throw new Error("Failed to create conversation");
        conv.title = title || conv.title || "New chat";
        isNewConversationRef.current = true;
        dispatch(addConversation(conv));
        dispatch(setSelectedConversation(conv));
        conversation = conv;

        // Persist the generated title (best effort).
        (conv._id || conv.id) &&
          updateConversation(conv._id || conv.id, conv.title).catch(() => {});
      } else {
        // If the selected conversation still has a default title, name it
        // from the first prompt.
        const currentTitle = (conversation.title || "").trim().toLowerCase();
        if (!currentTitle || currentTitle === "new chat" || currentTitle === "newchat") {
          const updated = { ...conversation, title };
          dispatch(setSelectedConversation(updated));
          const updatedList = (conversations || []).map((c) =>
            (c._id || c.id) === (conversation._id || conversation.id)
              ? { ...c, title }
              : c,
          );
          dispatch(setConversation(updatedList));
          updateConversation(conversation._id || conversation.id, title).catch(
            () => {},
          );
        }
      }

      const conversationId = conversation._id || conversation.id;
      const data = await sendMessage({
        conversationId,
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
