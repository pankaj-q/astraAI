import api from "../utils/axios.js";

export const deleteConversation = async (conversationId) => {
  try {
    const { data } = await api.delete("/api/chat/delete-conversation", {
      data: { conversationId },
    });
    return data;
  } catch (error) {
    console.error(
      "DELETE CONVERSATION ERROR:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
