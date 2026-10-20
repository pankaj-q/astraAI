import api from "../utils/axios";

export const getCoversation = async () => {
  try {
    const { data } = await api.get("/api/chat/get-conversations");
    return data;
  } catch (error) {
    console.log(`error fetching conversation ${error}`);
  }
};
