import "dotenv/config"
import { ChatGroq } from "@langchain/groq";
import {ChatOpenRouter} from '@langchain/openrouter'

const groqModel = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});

const openRouterModel = new ChatOpenRouter({
  model: "cohere/north-mini-code:free",
  temperature: 0,
  maxToken: 2500,
});

// export const geminiModel = new ChatGoogleGenerativeAi({
//   model: "",
//   temperature: 0,
//   maxTokens: undefined,
//   maxRetries: 2,
// });

export const getModel = (agent) => {
  switch (agent) {
    case "chat":
      return groqModel;
    case "search":
      return groqModel;
    case "coding":
      return openRouterModel;
    default:
      return groqModel;
  }
};
