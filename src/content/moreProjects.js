/**
 * Más proyectos: lo que va en la lista compacta bajo el mosaico de Proyectos.
 * Trabajos pequeños o de clase, sin capturas ni caso de estudio, para que
 * estén y se puedan abrir. El nombre y el resumen viven en `copy.js`
 * (`moreProjects[id]`) y se cruzan por `id`.
 *
 * Sólo repositorios públicos con commits suyos (comprobados en GitHub); en
 * los de equipo, el resumen dice qué hizo ella.
 *
 * Campos: year, tech (como en el CV), repo, live (demo publicada, si la hay).
 */
export const moreProjects = [
  {
    id: "scalar",
    year: "2026",
    tech: ["NestJS", "Scalar", "Swagger", "SQLite"],
    repo: "https://github.com/Jhanina03/practicaScalar",
  },
  {
    id: "mnist",
    year: "2026",
    tech: ["Python", "TensorFlow", "NumPy", "Matplotlib"],
    repo: "https://github.com/Jhanina03/mnist",
  },
  {
    id: "search",
    year: "2026",
    tech: ["Python", "A*"],
    repo: "https://github.com/Jhanina03/BusquedasInformadasIA",
  },
  {
    id: "feriauto",
    year: "2026",
    tech: ["JavaScript", "HTML", "Vercel"],
    repo: "https://github.com/Jhanina03/feriauto-juego",
    live: "https://feriauto-juego.vercel.app",
  },
  {
    id: "freecodecamp",
    year: "2026",
    tech: ["Node.js", "Express", "WebSockets", "JWT"],
    repo: "https://github.com/DaGeus15/freecodecamp-backend-apis",
  },
  {
    id: "datascience",
    year: "2026",
    tech: ["Python", "pandas", "Matplotlib", "scikit-learn"],
    repo: "https://github.com/DaGeus15/data-science-essentials-python",
  },
];

export default moreProjects;
