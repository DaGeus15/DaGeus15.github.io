"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "lang";
const LANG_EVENT = "portfolio-lang-change";

/** El idioma con el que se genera el HTML estático. */
export const DEFAULT_LANG = "es";
export const LANGS = ["es", "en"];

/**
 * El idioma funciona igual que el tema (ver `theme.jsx`), y por los mismos
 * motivos:
 *
 *   lang / data-lang   el idioma aplicado ahora mismo: "es" | "en"
 *   data-lang-source   de dónde sale: "browser" (sigue al navegador) o
 *                      "user" (el visitante lo fijó con el botón ES/EN)
 *
 * Por defecto sigue al navegador; el botón fija un override, y si con él se
 * elige justo lo que ya dice el navegador el override se borra y se vuelve al
 * automático.
 *
 * Sobre la hidratación: el sitio es un export estático generado en español,
 * así que `getServerSnapshot` devuelve SIEMPRE `es`. React hidrata con ese
 * valor —que es el del HTML— y sólo después vuelve a renderizar con el idioma
 * real del visitante. Sin eso, un navegador en inglés produciría un texto
 * distinto al del HTML y React abortaría la hidratación.
 */

const browserLang = () =>
  String(navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en";

const storedPreference = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return LANGS.includes(value) ? value : null;
  } catch {
    return null;
  }
};

function apply(lang, source) {
  const root = document.documentElement;
  root.setAttribute("lang", lang);
  root.setAttribute("data-lang", lang);
  root.setAttribute("data-lang-source", source);
  window.dispatchEvent(new Event(LANG_EVENT));
}

/**
 * Corre antes del primer paint para dejar `lang` y `data-lang` puestos.
 * Se mantiene como string porque debe ejecutarse de forma síncrona.
 */
export const langInitScript = `(function(){try{var p=localStorage.getItem('${STORAGE_KEY}');var u=(p==='es'||p==='en');var l=u?p:((navigator.language||'').toLowerCase().indexOf('es')===0?'es':'en');var d=document.documentElement;d.setAttribute('lang',l);d.setAttribute('data-lang',l);d.setAttribute('data-lang-source',u?'user':'browser');}catch(e){document.documentElement.setAttribute('data-lang','${DEFAULT_LANG}');document.documentElement.setAttribute('data-lang-source','browser');}})();`;

const SERVER_SNAPSHOT = `${DEFAULT_LANG}|browser`;

const readSnapshot = () => {
  if (typeof document === "undefined") return SERVER_SNAPSHOT;
  const root = document.documentElement;
  const lang = root.getAttribute("data-lang") || DEFAULT_LANG;
  const source = root.getAttribute("data-lang-source") || "browser";
  return `${lang}|${source}`;
};

const subscribe = (callback) => {
  // Otra pestaña cambió el idioma: hay que resolverlo de nuevo aquí.
  const onStorage = (event) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    const stored = storedPreference();
    apply(stored ?? browserLang(), stored ? "user" : "browser");
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(LANG_EVENT, callback);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LANG_EVENT, callback);
  };
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => SERVER_SNAPSHOT);
  const [lang, source] = snapshot.split("|");

  /* El HTML estático se genera en español, así que React hidrata con
     SERVER_SNAPSHOT. Si el visitante tiene otro idioma, el script inline ya
     dejó `data-lang` en el suyo, pero el árbol sigue renderizado en español
     hasta que el store avise. Esto no es un `setState` en el montaje: es una
     notificación al store para que React relea el snapshot del cliente. */
  useEffect(() => {
    if (readSnapshot() !== SERVER_SNAPSHOT) {
      window.dispatchEvent(new Event(LANG_EVENT));
    }
  }, []);

  const setLang = useCallback((next) => {
    if (next === browserLang()) {
      // Coincide con el navegador: se borra el override.
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* modo privado — el idioma se aplica igual */
      }
      apply(next, "browser");
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* modo privado — el idioma se aplica igual */
    }
    apply(next, "user");
  }, []);

  const toggleLang = useCallback(() => {
    setLang(document.documentElement.getAttribute("data-lang") === "es" ? "en" : "es");
  }, [setLang]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggleLang, followsBrowser: source === "browser" }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  }
  return ctx;
}
