import { useRoutes } from "react-router-dom";
import { Authguard } from "./components/Authguard";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { SignupPage } from "./pages/Signup";
import { CurrentChat } from "./components/CurrentChat";
import { OpenChatPlaceholder } from "./components/ChatPlaceholder";

export const Router = () =>
  useRoutes([
    {
      path: "/",
      element: <Authguard />,
      children: [
        {
          element: <HomePage />,
          path: "/",
          children: [
            {
              element: <OpenChatPlaceholder />,
              index: true,
            },
            {
              path: "chat/:id",
              element: <CurrentChat />,
            },
          ],
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
