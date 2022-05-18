import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/UserSlice";
import loadingSlice from "./slices/LoadingSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        loading: loadingSlice
    }
});

export default store;