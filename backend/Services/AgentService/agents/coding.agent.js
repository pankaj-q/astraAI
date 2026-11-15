import {getModel} from '../config/llmModels.js'
export const codingAgent = async (params) => {
    const intentLlm = getModel("intent");
    const llm = getModel("coding")
    const intentRes = await intentLlm.invoke(`
       you are an intent classifier.
       Return ONLY one of these values:

       CODE_GENERATION
       CODE_REVIEW
       CODE_EXPLANATION
       DEBUGGING
       CONVERSTION 
       OPTIMIZATION
       DOCUMENTATION

       User Request:
       ${state.prompt}
    `)
    const intent = intentRes.content
    if(intent === "CODE_GENERATION"){
        const prompt = ``
    }
};
