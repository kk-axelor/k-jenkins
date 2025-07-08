import { createContext, ReactNode, useEffect, useState } from "react";

type ThemeType = "dark" | "light";

interface ThemeState {
  theme: ThemeType;
  toogleTheme: () => void;
}
const INITIAL_STATE: ThemeState = {
  theme: "light",
  toogleTheme: () => {},
};

export const ThemeContext = createContext<ThemeState>(INITIAL_STATE);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    const theme = localStorage.getItem("theme") as ThemeType;
    setTheme(theme || "light");
  }, []);
  const toogleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toogleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
