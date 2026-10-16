import { configureStore } from "@reduxjs/toolkit";
import {userSlice} from '@reduxjs/toolkit'
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
export const {setUserData} = userSlice.actions
export default userSlice.actions 