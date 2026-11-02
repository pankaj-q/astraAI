import api from "../utils/axios.js"

// export const createConversation = async () => {
//   try {
//     const { data } = await api.get("/api/chat/create-conversation");
//     console.log("CREATED CONVERSATION:", data);
//     return data.conversation;
//   } catch (error) {
//     console.error("CREATE CONVERSATION ERROR:",error.response?.data || error.message);
//     throw error;
//   }
// };

export const createConversation = async () => {
  try {
    const response = await api.get("/api/chat/create-conversation");

    console.log("STATUS:", response.status);
    console.log("API RESPONSE:", response.data);

    // backend responds with { success, message, conversation }
    // we must return the conversation object itself so _id is available
    return response.data.conversation;
  } catch (error) {
    console.error(
      "CREATE CONVERSATION ERROR:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
