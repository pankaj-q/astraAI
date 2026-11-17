import { createSlice } from "@reduxjs/toolkit";
export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    artifacts:[]
  },
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    getMessages: (state, action) => {
      state.messages = action.payload;
    },
    setArtifacts: (state, action) => {
      state.artifacts = action.payload
    },
  },
});
export const { setMessage, addMessage, getMessages,setArtifacts } = messageSlice.actions;
export default messageSlice.reducer;
