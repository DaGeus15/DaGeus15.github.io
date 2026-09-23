import { otherLang } from "@/lib/locales";

/**
 * Cambio de idioma: un enlace a la misma página en el otro idioma, no un
 * estado. Cada idioma es su propio HTML (ver `locales.js`).
 */
export default function LangSwitch({ lang, href, label }) {
  const target = otherLang(lang);
  return (
    <a href={href} hrefLang={target} lang={target} className="pref-btn mono" title={label} aria-label={label}>
      {target.toUpperCase()}
    </a>
  );
}
