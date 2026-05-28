import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: false,
    userPost: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        login: (state, action) => {
            state.post = true;
            state.userPost = action.payload.userPost;
        },
        logout: (state) => {
            state.post = false;
            state.userPost = null;
        }

    }
})

export const { login , logout} = postSlice.actions

export default postSlice.reducer;
