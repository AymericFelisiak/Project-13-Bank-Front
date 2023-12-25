import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

// Redux store to keep the user state

const store = configureStore({
    reducer:{
        user: userReducer
    }
});

export default store;