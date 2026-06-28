import { useDispatch } from "react-redux";
import { LogOut } from "lucide-react";
import authService from "../../appwrite/auth";
import { logout } from "../../Store/authSlice";
import Button from "../Button";

const LogoutBtn = ({ className = "" }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <Button onClick={logoutHandler}>
      <LogOut size={18} />
      Logout
    </Button>
  );
};

export default LogoutBtn;
