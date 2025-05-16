import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

/* ---------- helpers & constants (до экспорта компонентов!) ---------- */
const THEME_KEY = "theme";
const prefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

/* -------------------------------------------------------------------- */
const ThemeContext = createContext();

/** Провайдер темы */
export function ThemeProvider({ children }) {
  // начальное значение: localStorage → system
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY);
    return stored ?? (prefersDark() ? "dark" : "light");
  });

  // применяем / убираем класс к <html>
  useLayoutEffect(() => {
    const cls = document.documentElement.classList;
    theme === "dark" ? cls.add("dark") : cls.remove("dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** удобный хук */
export const useTheme = () => useContext(ThemeContext);
