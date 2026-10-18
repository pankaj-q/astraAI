import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

const createConversation = async(req,res) => {
    try {
        const {userId} = req.headers["x-user-id"];
        console.log("userId", userId);
        const conversation = await Conversation.create({
            userId: userId
        })
        return res.status(201).json({
            success: true,
            message: "conversation created successfully",
            conversation:conversation
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

const updateConversation = async (req, res) => {
  try {
    const { conversationId } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(conversationId, {
      title,
    });
    return res.status(201).json({
      success: true,
      message: "Conversation updated",
      conversation: conversation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `failed to upadated conversation ${error}`,
    });
  }
};

const saveMessage = async(req,res) => {
   try {
     const {conversationId, content, role} = req.body;
     const message = await Message.create({
         conversationId,
         content,
         role
     })
     return res.status(201).json({
       success: true,
       message: "messages Saved successfully",
       message: Message
     });
   } catch (error) {
    return res.status(500).json({
      success: false,
      message: `failed to save message ${error}`,
    });
   }
}

const getMessages = async(req, res) => {
    try {
        const {conversationId} = req.body;
        const messages = await Message.find({
            conversationId
        }).sort({createdAt: -1})
        return res.status(200).json({
            success: true,
            message: "messages fatch succesfully",
            message: messages
        })
    } catch (error) {
         return res.status(500).json({
           success: false,
           message: `failed to get messages ${error}`,
         });
    }
}

export {
    createConversation, 
    getConverastaions, 
    saveMessage, 
    getMessages,
    updateConversation
}