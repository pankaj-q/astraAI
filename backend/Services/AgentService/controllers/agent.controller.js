import axios from "axios";
const getChat = async(req,res)=> {
    const {promp, conversationId} = req.body;
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`);
}