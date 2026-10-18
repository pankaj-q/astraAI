import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { imageAgent } from "../agents/image.agent.js";

const workflow = new StateGraph(agentState)
workflow.addNode("router", router)
workflow.addNode("chat", chatAgent)
workflow.addNode("code", codingAgent)
workflow.addNode("pdf", pdfAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("imgae",imageAgent);

workflow.addEdge("--start--", "router")
workflow.addconditionEdge("router",)

