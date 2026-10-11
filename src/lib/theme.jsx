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

/**
 * Aplica el tema. Con `animate`, el cambio va dentro de una View Transition:
 * el navegador fotografía la página antes y después y las funde (250ms, ver
 * `base.css`). Antes el fondo transicionaba 0.5s mientras tarjetas y texto
 * cambiaban de golpe, y durante medio segundo se veía un fondo oscuro con
 * tarjetas ya claras. Sin soporte, o con la pestaña oculta, el cambio es
 * instantáneo, que también es coherente.
 */
function apply(theme, source, { animate = false, origin = null } = {}) {
  const root = document.documentElement;
  const run = () => {
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-theme-source", source);
    root.style.colorScheme = theme;
    window.dispatchEvent(new Event(THEME_EVENT));
  };
  if (!animate || !document.startViewTransition || document.hidden) {
    run();
    return;
  }
  // Desde el botón: el tema nuevo se revela en un círculo que crece desde su
  // centro hasta la esquina más lejana (ver `[data-vt="reveal"]` en base.css).
  // También con movimiento reducido (más corto): es un recorte que se abre,
  // sin desplazar ni escalar nada, tan suave como un fundido. Antes se
  // apagaba, y con "Efectos de animación" desactivados en Windows (muy
  // común) nadie lo veía. Si el cambio viene del sistema, fundido.
  if (origin) {
    const { x, y } = origin;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${r}px`);
    root.dataset.vt = "reveal";
  }
  const transition = document.startViewTransition(run);
  transition.finished.finally(() => {
    delete root.dataset.vt;
  });
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
    apply(media.matches ? "dark" : "light", "system", { animate: true });
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

  /** `origin` ({ x, y } en la ventana): desde dónde se revela el tema nuevo. */
  const setTheme = useCallback((next, origin = null) => {
    if (next === systemTheme()) {
      // Coincide con el navegador: se borra el override para seguir al
      // sistema a partir de ahora.
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* modo privado / storage bloqueado — el tema sigue aplicándose */
      }
      apply(next, "system", { animate: true, origin });
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* modo privado / storage bloqueado — el tema sigue aplicándose */
    }
    apply(next, "user", { animate: true, origin });
  }, []);

  /** `from`: el botón pulsado; el tema nuevo crece desde su centro. */
  const toggleTheme = useCallback(
    (from) => {
      const rect = from?.getBoundingClientRect?.();
      const origin = rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : null;
      setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark", origin);
    },
    [setTheme],
  );

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
