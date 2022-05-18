import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialState,
    reducers: {
        setIsLoading: (state) => {
            console.log("Start Loading");
            state.isLoading = true;
        },
        setNotLoading: (state) => {
            console.log("Stop loading");
            state.isLoading = false;
        }
    }
});

export const isLoading = (state) => state.loading.isLoading;

export default loadingSlice.reducer;

export const { setIsLoading, setNotLoading } = loadingSlice.actions;