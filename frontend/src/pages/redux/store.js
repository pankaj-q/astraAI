import { configureStore } from "@reduxjs/toolkit";
import  userreducer  from "./userSlice.js";


export const store = configureStore({
  reducer: {
    user: userreducer
  },
});
