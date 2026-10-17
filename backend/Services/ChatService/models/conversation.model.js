const conversationSchema = new mongoose.Schema({
   userId: {
     type:String,
     requried: true,
   },
   
    title: {
        type: String,
        default: "New Chat",
    },

},{timestamps: true})
const Conversation = mongoose.model("Coversation", conversationSchema);
export default Conversation
    