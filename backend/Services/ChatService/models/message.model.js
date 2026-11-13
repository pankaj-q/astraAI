import mongoose from "mongoose"
const messageSchema = new mongoose.Schema({
    conversationId :{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        requried: true,
    },
    role: {
        type: String,
        enum : ["user","assistant"],
        requried: true,
    },
    content: {
        type: String,
        rquried: true,
    },
    images: {
        type: [String],
        default: [],
    },
    status: {
        type: String, 
        enum: ["pending","completed","failed"],
        default: "completed"
    }
},{timestamps: true})

const Message = mongoose.model("Message",messageSchema)
export default Message