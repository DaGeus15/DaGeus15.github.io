"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LANG } from "./locales";

/**
 * El idioma de la ruta, disponible para los componentes de cliente. Lo fija
 * `app/[lang]/layout.js`; no hay estado ni detección aquí (ver `locales.js`).
 */
const LanguageContext = createContext(DEFAULT_LANG);

export function LanguageProvider({ lang, children }) {
  return <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
