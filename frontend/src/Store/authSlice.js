import { createSlice } from "@reduxjs/toolkit";

const sanitizeUserData = (userData) => {
    if (!userData || typeof userData !== "object") return userData;

    const sanitized = {};

    Object.keys(userData).forEach((key) => {
        const value = userData[key];

        if (typeof value === "function") return;
        sanitized[key] = value;
    });

    return sanitized;
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
            const userData = sanitizeUserData(action.payload);
            state.status = !!userData;
            state.userData = userData || null;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;