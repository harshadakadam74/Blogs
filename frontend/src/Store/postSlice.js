import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: [],
    userPost: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        // Start Loading
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        // Fetch All Posts
        setPosts: (state, action) => {
            state.posts = action.payload;
        },

        // Create New Post
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },

        // Delete Post
        removePost: (state, action) => {
            state.posts = state.posts.filter(
                (post) => post.$id !== action.payload
            );
        },
    }
})

export const { 
    setLoading,
    setPosts,
    addPost,
    removePost,
} = postSlice.actions

export default postSlice.reducer;
