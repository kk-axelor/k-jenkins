import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const { theme, toogleTheme } = useContext(ThemeContext);
  return { theme, toogleTheme };
};
