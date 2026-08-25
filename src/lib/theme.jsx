"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
const THEME_EVENT = "portfolio-theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const DEFAULT_THEME = "dark";

/**
 * El tema tiene DOS piezas de estado, no una:
 *
 *   data-theme         el tema aplicado ahora mismo: "dark" | "light"
 *   data-theme-source  de dónde sale: "system" (sigue al navegador) o
 *                      "user" (el visitante lo fijó con el botón)
 *
 * Por defecto la fuente es "system": el sitio adopta el modo claro/oscuro
 * configurado en el navegador o el sistema operativo, y lo sigue en vivo —si
 * se cambia el ajuste con la página abierta, la página cambia con él.
 *
 * El botón fija un override. Y si con él se elige justo lo que ya dice el
 * sistema, el override se borra y se vuelve a seguir al navegador: así hay
 * forma de volver al automático sin añadir un tercer estado al control.
 */

const systemTheme = () => (window.matchMedia(DARK_QUERY).matches ? "dark" : "light");

const storedPreference = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
};

function apply(theme, source) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.setAttribute("data-theme-source", source);
  root.style.colorScheme = theme;
  window.dispatchEvent(new Event(THEME_EVENT));
}

/**
 * Script que corre ANTES del primer paint para evitar el flash de tema
 * incorrecto (FOUC). Se inyecta en <head> desde `layout.js`.
 *
 * Se mantiene como string porque debe ejecutarse de forma síncrona y
 * bloqueante, antes de que React hidrate.
 */
export const themeInitScript = `(function(){try{var p=localStorage.getItem('${STORAGE_KEY}');var u=(p==='light'||p==='dark');var t=u?p:(window.matchMedia('${DARK_QUERY}').matches?'dark':'light');var d=document.documentElement;d.setAttribute('data-theme',t);d.setAttribute('data-theme-source',u?'user':'system');d.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}');document.documentElement.setAttribute('data-theme-source','system');}})();`;

/* Instantánea como string: `useSyncExternalStore` compara por identidad, así
   que devolver un objeto nuevo en cada lectura provocaría un bucle. */
const SERVER_SNAPSHOT = `${DEFAULT_THEME}|system`;

const readSnapshot = () => {
  if (typeof document === "undefined") return SERVER_SNAPSHOT;
  const root = document.documentElement;
  const theme = root.getAttribute("data-theme") || DEFAULT_THEME;
  const source = root.getAttribute("data-theme-source") || "system";
  return `${theme}|${source}`;
};

const subscribe = (callback) => {
  const media = window.matchMedia(DARK_QUERY);

  // El navegador cambió de modo. Sólo manda si no hay override del visitante.
  const onSystemChange = () => {
    if (document.documentElement.getAttribute("data-theme-source") === "user") return;
    apply(media.matches ? "dark" : "light", "system");
  };

  // Otra pestaña tocó la preferencia: hay que resolverla de nuevo aquí.
  const onStorage = (event) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    const stored = storedPreference();
    apply(stored ?? systemTheme(), stored ? "user" : "system");
  };

  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_EVENT, callback);

  return () => {
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_EVENT, callback);
  };
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Los atributos del <html> son la fuente de verdad; el script inline ya los
  // dejó correctos antes de hidratar, así que no hace falta ningún efecto.
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => SERVER_SNAPSHOT);
  const [theme, source] = snapshot.split("|");

  const setTheme = useCallback((next) => {
    if (next === systemTheme()) {
      // Coincide con el navegador: se borra el override para seguir al
      // sistema a partir de ahora.
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* modo privado / storage bloqueado — el tema sigue aplicándose */
      }
      apply(next, "system");
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* modo privado / storage bloqueado — el tema sigue aplicándose */
    }
    apply(next, "user");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  }, [setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === "dark",
        followsSystem: source === "system",
      }}
    >
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
