import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  login as loginThunk,
  signup as signupThunk,
  logout as logoutAction,
  clearError,
} from "../redux/authSlice";
import { selectAuthError } from "../redux/authSlice";
import type { ILoginCredentials, ISignupCredentials } from "../types";
import { useEffect } from "react";

export const useAuth = () => {
  const error = useAppSelector(selectAuthError);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearError());
  }, []);

  const initialLoginFormValues: ILoginCredentials = {
    username: "",
    password: "",
  };
  const initialSignupFormValues: ISignupCredentials = {
    username: "",
    password: "",
    displayName: "",
  };

  const login = async (
    formvalues: ILoginCredentials,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    await dispatch(loginThunk(formvalues));
    setSubmitting(false);
  };

  const signup = async (
    formvalues: ISignupCredentials,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    await dispatch(signupThunk(formvalues));
    setSubmitting(false);
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    initialLoginFormValues,
    initialSignupFormValues,
    error,
    login,
    signup,
    logout,
  };
};
