import Conversation from "../models/conversation.model";

const createConversation = async(req,res) => {
    try {
        const {userId} = req.headers["x-user-id"];
        console.log("userId", userId);
        const conversation = await Conversation.create({
            userId: userId
        })
        return res.status(200).json({
            message: "conversation created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "failed create coversation",
            error: error,

        })
    }

} 

const getConverastaions = async(req, res) => {
    try {
        const {userId} = req.headers["x-user-id"];
        const conversations = await Conversation.find({
          userId: userId,
        }).sort({ updatedAt: -1 });
        return res.status(200).json({
          success: true,
          message: "conversation found successfully",
          conversations: conversations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `failed to get the conversations ${error}`
        })
    }
   

}

export default  {
    createConversation, getConverastaion
}