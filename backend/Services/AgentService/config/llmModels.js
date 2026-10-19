import {ChatGroq} from '@langchain/groq'

const groqModel = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});

// export const geminiModel = new ChatGoogleGenerativeAi({
//   model: "",
//   temperature: 0,
//   maxTokens: undefined,
//   maxRetries: 2,
// }); 

export const getModel = async(agent) => {
    switch (agent) {
        case "chat":
            return groqModel;
        case "search":
            return groqModel;
        case "coding":
            return geminiModel;
        default:
            return groqModel;
    }
}
