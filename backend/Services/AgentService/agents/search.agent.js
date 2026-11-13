import { searchTool } from "../config/tavily";

export const searchAgent = async (state) => {
    try {
         const results = await searchTool({
            query:state.prompt
         })
         console.log(results)
         return {
            ...state,
            searchResults:results,
            images:results.images
         }
    } catch (error) {
        return {
            ...state,
            searchResults:[],
            images:[],
        }
    }
};
