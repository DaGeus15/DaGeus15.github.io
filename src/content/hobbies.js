/**
 * Fuera del código: lo que no se traduce. El nombre, la línea y el texto del
 * enlace van en `copy.js` (`hobbies[id]`).
 *
 *   icon  "trend" | "book" | "gamepad": el icono de `react-icons/fi`.
 *   url   Su perfil público, si lo quiere enlazar.
 *   site  La clave de su logo en `logos.js` (sale junto al enlace).
 *
 * Pocos y suyos: es una línea para conocerla, no una sección que compita con
 * el trabajo.
 */
export const hobbies = [
  // Lo que está aprendiendo ahora, con lo que lo respalda (Cisco, Power BI).
  { id: "learning", icon: "trend", url: null },
  { id: "reading", icon: "book", url: "https://www.goodreads.com/user/show/155512397-dayle-garcia", site: "goodreads" },
  { id: "games", icon: "gamepad", url: "https://steamcommunity.com/profiles/76561198870134163/", site: "steam" },
];

export default hobbies;
