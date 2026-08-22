"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
const THEME_EVENT = "portfolio-theme-change";
const DEFAULT_THEME = "dark";

/**
 * Script que corre ANTES del primer paint para evitar el flash de tema
 * incorrecto (FOUC). Se inyecta en <head> desde `layout.js`.
 *
 * Se mantiene como string porque debe ejecutarse de forma síncrona y
 * bloqueante, antes de que React hidrate.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'${DEFAULT_THEME}';}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}');}})();`;

const readTheme = () => {
  if (typeof document === "undefined") return DEFAULT_THEME;
  return document.documentElement.getAttribute("data-theme") || DEFAULT_THEME;
};

const subscribe = (callback) => {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // El atributo data-theme del <html> es la fuente de verdad; el script inline
  // ya lo dejó correcto antes de hidratar, así que no hace falta ningún efecto.
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);

  const setTheme = useCallback((next) => {
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* modo privado / storage bloqueado — el tema sigue aplicándose */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(readTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  }
  return ctx;
}
