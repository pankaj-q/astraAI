import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
    name: String,
    content: String,
},
{
    _id: false
})

const artifactSchema = new mongoose.Schema(
  {
    id: Number,
    type: String,
    files: [fileSchema],
  },
  {
    _id: false,
  },
);
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
        artifacts:[artifactSchema]
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