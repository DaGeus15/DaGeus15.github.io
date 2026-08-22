/**
 * Definición única de las secciones del portafolio.
 * El nav de escritorio, el drawer móvil y el scroll-spy leen todos de aquí.
 * Para añadir una sección: agregá una entrada y creá su componente en
 * `src/components/sections/`, luego registralo en `ContentArea.jsx`.
 */
export const sections = [
  { id: "about", label: "Sobre Mí", icon: "user" },
  { id: "experience", label: "Experiencia", icon: "briefcase" },
  { id: "projects", label: "Proyectos", icon: "code" },
  { id: "contact", label: "Contacto", icon: "mail" },
];

export const sectionIds = sections.map((s) => s.id);

export default sections;
