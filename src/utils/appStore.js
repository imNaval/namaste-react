import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userSlice from "./userSlice";

const appStore = configureStore({
    reducer : {
        cart : cartReducer,
        user : userSlice
    }
});

export default appStore;