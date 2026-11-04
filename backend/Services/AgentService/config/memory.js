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