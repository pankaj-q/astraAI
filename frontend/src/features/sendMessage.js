import api from '../utils/axios.js'

async function sendMessage(payload) {
  try {
    const response = await api.post("/api/chat", payload);
    return response.data;
  } catch (error) {
    console.error("Send message error:", error);
    throw error;
  }
}

export default sendMessage