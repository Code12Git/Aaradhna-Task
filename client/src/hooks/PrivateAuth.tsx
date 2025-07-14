// hooks/privateAuth.tsx
import { useNavigate, Outlet } from "react-router-dom";
import useAuth from "./auth";

const PrivateAuth = () => {
  const { userData, token } = useAuth();
  const navigate = useNavigate();

  if (!userData || !token) {
    navigate("/login");
    return null; 
  }

  return <Outlet />; 
};

export default PrivateAuth;