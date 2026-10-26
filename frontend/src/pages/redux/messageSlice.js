import { createSlice } from "@reduxjs/toolkit";
export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
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
  },
});
export const { setMessage, addMessage, getMessages } = messageSlice.actions;
export default messageSlice.reducer;
