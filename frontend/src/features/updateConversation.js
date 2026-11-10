import api from "../utils/axios.js";

export const updateConversation = async (conversationId, title) => {
  try {
    const { data } = await api.put("/api/chat/update-conversation", {
      conversationId,
      title,
    });
    return data?.conversation || data;
  } catch (error) {
    console.error(
      "UPDATE CONVERSATION ERROR:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
