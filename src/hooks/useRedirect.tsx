import { useAppSelector } from "../redux/store";
import { selectAuthIsLoggedIn } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useRedirect = () => {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);
};
