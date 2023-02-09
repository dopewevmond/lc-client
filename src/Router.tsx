import { useRoutes } from "react-router-dom";
import { Authguard } from "./components/Authguard";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { SignupPage } from "./pages/Signup";

export const Router = () =>
  useRoutes([
    {
      path: "/",
      element: <Authguard />,
      children: [
        {
          element: <HomePage />,
          index: true,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ]);
