/**
 * Secciones de la página, en orden de lectura. La navegación de la columna
 * fija y el scroll-spy leen de aquí; las etiquetas traducidas están en
 * `copy.js` (`nav`).
 *
 * Proyectos va primero a propósito: con un año de experiencia profesional, lo
 * que más demuestra son los sistemas construidos (uno en producción).
 */
export const sections = [
  { id: "projects" },
  { id: "experience" },
  { id: "stack" },
  { id: "about" },
  { id: "contact" },
];

export const sectionIds = sections.map((s) => s.id);

export default sections;
