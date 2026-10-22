import { configureStore } from "@reduxjs/toolkit";
import  userreducer  from "./userSlice.js";
import conversatoinReducer  from './conversationSlice.js'
import messageReducer from './messageSlice.js'


export const store = configureStore({
  reducer: {
    user: userreducer,
    conversations: conversatoinReducer,
    message: messageReducer
  },
});
 