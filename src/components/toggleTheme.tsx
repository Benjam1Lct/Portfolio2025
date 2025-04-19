"use client"

import { useEffect, useState } from "react";

export default function ToggleTheme() {
  type Theme = "light" | "dark" | "system";
  const themes: Theme[] = ["light", "dark", "system"];
  const themeIcons: Record<Theme, string> = { light: "☀️", dark: "🌑", system: "🖥️" };

  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Empêcher le rendu au début

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
    setActiveTheme(savedTheme);
    applyTheme(savedTheme);
    setIsMounted(true); // Marquer le composant comme monté

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (savedTheme === "system") applySystemTheme();
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const handleThemeChange = () => {
    if (!activeTheme) return;
    const nextTheme = themes[(themes.indexOf(activeTheme) + 1) % themes.length];
    setActiveTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  const applyTheme = (theme: Theme) => {
    if (theme === "system") {
      applySystemTheme();
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  };

  const applySystemTheme = () => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
  };

  if (!isMounted || activeTheme === null) return null; // Attendre avant d'afficher le bouton

  return (
    <button 
      onClick={handleThemeChange} 
      className="z-[1000] fixed bottom-4 text-2xl left-4 w-14 h-14 flex items-center justify-center rounded-full 
        dark:bg-slate-50 border-2 bg-slate-950 
        transition-all duration-200 active:scale-[0.8] shadow-lg"
          >
      {themeIcons[activeTheme]}
    </button>
  );
}
