import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
    name:"user",
    initialState: {
       userData: null,
    },
    reducer: {
        setUserData:(state, action)=> {
          state.userData = action.payload
        }
    }
})