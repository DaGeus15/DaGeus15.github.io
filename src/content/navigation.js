/**
 * Secciones de la página, en orden de lectura. La píldora de navegación y el
 * scroll-spy leen de aquí; las etiquetas traducidas están en `copy.js`
 * (`nav`).
 *
 * Trabajo va primero a propósito: con un año de experiencia profesional, lo
 * que más demuestra son los sistemas construidos (uno en producción).
 *
 * `mobile`: también en la píldora de móvil, que va abajo y sólo tiene sitio
 * para tres enlaces junto al idioma y el tema.
 */
export const sections = [
  { id: "projects", mobile: true },
  { id: "experience" },
  { id: "stack" },
  { id: "about", mobile: true },
  { id: "contact", mobile: true },
];

export const sectionIds = sections.map((s) => s.id);

export default sections;
