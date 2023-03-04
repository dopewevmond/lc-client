import React, { createContext, useEffect, useState, type FC } from "react";

type Props = {
  children: React.ReactNode;
};

type IThemeContext = {
  theme: "light" | "dark";
  setTheme: (val: "light" | "dark") => void;
};

const initialThemeContext: IThemeContext = {
  theme: (localStorage.getItem("theme") as "light" | "dark") ?? "dark",
  setTheme: () => {},
};

export const ThemeContext = createContext<IThemeContext>(initialThemeContext);

const ThemeContextProvider: FC<Props> = ({ children }) => {
  const [theme, themeSetter] = useState<"light" | "dark">(
    initialThemeContext.theme
  );
  const setTheme = (val: "light" | "dark") => {
    themeSetter(val);
    localStorage.setItem("theme", val);
  };
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      return;
    }
    document.documentElement.classList.add("dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
