import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js"
import {getMemory} from '../config/memory.js'

export const chatAgent = async(state) => {
   const llm = getModel("Chat");

   const history = await getMemory(state.conversationId);

   const systemPrompt = "You are an AstraAI - for helping to get right thought of query"

   const messages = [
     new SystemMessage(systemPrompt)
   ]
   history.forEach(msg => {
      if(msg.role === "user"){
        messages.push(new HumanMessage(msg.content))
      } else {
        messages.push(new AIMessage(msg.content))
      }
   })
   messages.push(new HumanMessage(state.prompt))
   console.log(messages);
   const response = await llm.invoke(messages);
  return {
    ...state,
    aiResponse: response.content
  }
}