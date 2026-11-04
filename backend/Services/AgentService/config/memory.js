import { getMessages } from "../../../../frontend/src/pages/redux/messageSlice"
import redis from "../../../Shared/Redis/redis.js"
import { getMessage } from "../utils/getMessage"

export const getMemory = async (conversationId) => {
    const key = `messages-${conversationId}`
    const cashed =  await redis.get(key)
    if(cashed){
        return JSON.parse(cashed)
    }
    const messages = await getMessage(conversationId)
    await redis.set(key, JSON.stringify(messages),"EX",24*60*60)
    return messages
}

export const addMessage = async (conversationId,role,content) => {
   const key = `messages-${conversationId}`
   const rawMessages = await redis.get(key);
   const message = rawMessages? JSON.parse :[]
   message.push({role, content})
}
if(message.length > 20){
    message.shift();
}