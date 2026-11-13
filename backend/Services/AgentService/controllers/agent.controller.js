import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";



const getAgent = async (req, res) => {
  try {
    const { prompt, conversationId , agent} = req.body;
     await addMessage(conversationId, "user", prompt);
   
    console.log("Conversation ID:", conversationId);
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt,
    });

    const result = await graph.invoke({
      prompt,
      conversationId,
      agent,
    });

    const response = result.aiResponse;
   
    await addMessage(conversationId, "assistant",response);
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "assistant",
      content:result.aiResponse,
      images: result.images
    });
    return res.status(200).json({
      answer:result.aiResponse,
      images:result.images,
      success: true,
      message: "chat generate sucessfully",
      response: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `internal server error for generating response ${error}`,
    });
  }
};

export default getAgent;
