/**
 * Idiomas y rutas. Módulo neutro (sin "use client") para que lo usen tanto los
 * componentes de servidor —páginas, metadatos— como los de cliente.
 *
 * El idioma sale de la URL (`/es/…`, `/en/…`), no del navegador. Antes se
 * generaba un único HTML en español y se cambiaba al idioma del navegador
 * después de hidratar: quien leía en inglés veía el español un instante y
 * Google sólo indexaba el español. Con una ruta por idioma, cada HTML ya sale
 * en su idioma. La detección del navegador queda sólo en la raíz
 * (`app/(root)/page.js`), que redirige a una de las dos.
 */
export const LANGS = ["es", "en"];
export const DEFAULT_LANG = "es";

export const isLang = (value) => LANGS.includes(value);
export const otherLang = (lang) => (lang === "es" ? "en" : "es");

export const SITE_URL = "https://dageus15.github.io";

/** Rutas con barra final: `trailingSlash` genera `es/index.html`, que es lo
    que GitHub Pages sirve sin reescrituras. */
export const homePath = (lang) => `/${lang}/`;
export const projectPath = (lang, id) => `/${lang}/projects/${id}/`;
export const notePath = (lang, id) => `/${lang}/notes/${id}/`;

/** Fecha corta de una nota ("21 oct 2026" / "Oct 21, 2026"). En UTC: la
    fecha es un día, no un instante, y no debe moverse con la zona del build. */
export const formatDate = (lang, iso) =>
  new Intl.DateTimeFormat(lang === "es" ? "es-EC" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

/** Vista previa al compartir el enlace (Open Graph). Se genera con
    `npm run og` a partir de scripts/og/. */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Daylé García Fernández · Software Engineer",
};
