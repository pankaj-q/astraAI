import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js"
import {getMemory} from '../config/memory.js'

export const chatAgent = async(state) => {
   const llm = getModel("Chat");

   const history = await getMemory(state.conversationId);
   const searchContext = state.searchResult?`web search result: ${JSON.strigify(state.searchResults)} answer the user using only above search result`:""

   const systemPrompt = `You are an AstraAI - for helping to get right thought of query
   ${searchContext}
   if contextSearch exist:
   - use search result to answer.
   - do not mention internal tool.`

 

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