import axios from "axios";
import {graph} from '../graph/graph.js'


const getAgent = async(req,res)=> {
    try {
        const {promp, conversationId} = req.body;
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {conversationId, role:"user", content:prompt});
    
    
        const result = await graph.invoke({
            prompt,
            conversationId,
        })
        const response = result.aiResponse()
        return res.status(200).json({
            success: true,
            message: "chat generate sucessfully",
            response: response
       })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `internal server error for generating response ${error} `
        })
    }
} 
export default  getAgent