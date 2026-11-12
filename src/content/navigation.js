/**
 * Páginas del sitio, en el orden de la píldora. Las etiquetas traducidas
 * están en `copy.js` (`nav`); la ruta, en `lib/locales.js` (`pagePath`).
 *
 * Antes era una sola página con anclas. Con el contenido que fue llegando
 * (competencias, congresos, certificados, hobbies) ya no cabía sin esconder
 * nada, y cada tema pasó a tener su página. El inicio resume y enlaza.
 *
 * `anchor`: no es una página sino una sección del inicio (el contacto).
 * `mobile`: también en la píldora de móvil, que va abajo y sólo tiene sitio
 * para tres enlaces junto al idioma y el tema.
 */
export const pages = [
  { id: "projects", mobile: true },
  { id: "experience" },
  { id: "about", mobile: true },
  { id: "notes" },
  { id: "contact", anchor: true, mobile: true },
];

export const pageIds = pages.filter((p) => !p.anchor).map((p) => p.id);

export default pages;
