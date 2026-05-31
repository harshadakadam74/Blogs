import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Outlet } from "react-router-dom";

import authService from "./appwrite/auth";

import { login, logout } from "./Store/authSlice";

import { Footer, Header } from "./Components";

const App = () => {

    // Loading should start true
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {

        authService
            .getCurrentUser()
            .then((userData) => {

                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }

            })
            .catch((error) => {
                console.log("Auth Error:", error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [dispatch]);

  
    return !loading ? (
        <>
            <Header />

            <main className="min-h-screen">
                {/* App Content */}
                <Outlet />
            </main>

            <Footer />
        </>
    ): null;
};

export default App;