import { createSlice } from "@reduxjs/toolkit";

const sanitizeUserData = (userData) => {
    if (!userData || typeof userData !== "object") return userData;

    return JSON.parse(
        JSON.stringify(userData, (_key, value) =>
            typeof value === "function" ? undefined : value,
        ),
    );
};

const initialState = {
    status: false,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        login: (state, action) => {
            const userData = action.payload;
            state.status = !!userData;
            state.userData = userData || null;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
    prepare: (userData) => ({ payload: sanitizeUserData(userData) }),
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;