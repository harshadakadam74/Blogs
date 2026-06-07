import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../Store/authSlice';

const LogoutBtn = ({ className = "" }) => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button
            onClick={logoutHandler}
            className={`px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 hover:scale-105 active:scale-95 transition-all duration-300 ${className}`}
        >
            Logout
        </button>
    );
};

export default LogoutBtn;