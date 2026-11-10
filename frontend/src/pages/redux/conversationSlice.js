import { createSlice } from "@reduxjs/toolkit";
export const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    conversations: [],
    selectedConversation: null
  },
  reducers: {
      setConversation:(state,action)=> {
        state.conversations = action.payload || [];
      },
      addConversation:(state,action)=> {
        state.conversations.unshift(action.payload)
      },
      setSelectedConversation:(state,action)=> {
        state.selectedConversation = action.payload
      },
      removeConversation:(state,action)=> {
        const id = action.payload;
        state.conversations = state.conversations.filter((c) => (c._id || c.id) !== id);
        if ((state.selectedConversation?._id || state.selectedConversation?.id) === id) {
          state.selectedConversation = null;
        }
      }
  },
});
export const { setConversation,
               addConversation,
               setSelectedConversation,
               removeConversation
            } = conversationSlice.actions;
export default conversationSlice.reducer;
