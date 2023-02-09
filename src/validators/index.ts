import { object, string } from "yup";

export const loginSchema = object({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});

export const signupSchema = object({
  username: string().required("Username is required"),
  password: string()
    .min(8, "Password has to be at least 8 characters long")
    .required("Password is required"),
  displayName: string().required("Display name is required"),
});
