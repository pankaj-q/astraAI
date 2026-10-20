import { configureStore } from "@reduxjs/toolkit";
import  userreducer  from "./userSlice.js";
import conversatoinReducer  from './conversationSlice.js'


export const store = configureStore({
  reducer: {
    user: userreducer,
    conversation: conversatoinReducer
  },
});
 