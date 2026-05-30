import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/config';
import { logout } from '../../Store/authSlice';

const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <>
            <button
                onClick={logoutHandler}
                className="
                    px-5
                    py-2
                    rounded-xl
                    bg-red-500
                    text-white
                    font-semibold
                    shadow-md
                    hover:bg-red-600
                    hover:scale-105
                    active:scale-95
                    transition-all
                    duration-300
                "
            >
                Logout
            </button>
        </>
    );
};

export default LogoutBtn;