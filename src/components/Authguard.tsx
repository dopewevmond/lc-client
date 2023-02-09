import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { selectAuthIsLoggedIn } from "../redux/authSlice";

export const Authguard = () => {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
};
