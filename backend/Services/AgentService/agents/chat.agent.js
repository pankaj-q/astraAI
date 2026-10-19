import { getModel } from "../config/llmModels"

export const chatAgent = async(state) => {
   const llm = getModel("Chat");
   const systemPrompt = "You are an AstraAI - for helping to get right thought of query"
   const response = await llm.invoke([
    {
        "role":"system",
        "content":systemPrompt
    },
    {
        "role":"human",
        "content":state.prompt
    }
  ])
  return {
    ...state,
    aiResponse: response.content
  }
}