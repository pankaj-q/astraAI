import { createSlice } from "@reduxjs/toolkit";
export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: null,
  },
  reducers: {
      setConversation:(state,action)=> {
        state.conversations = action.payload
      },
      addConverastion:(state,action)=> {
        state.conversations.unshift(action.payload)
      }
  },
});
export const {setConversation, addConverastion } = conversationSlice.actions;
export default conversationSlice.reducer;
