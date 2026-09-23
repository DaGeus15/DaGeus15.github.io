/**
 * Datos estructurales de cada puesto: lo que no se traduce. El texto (rol,
 * fechas, logros) vive en `copy.js`, en `experience`, y se cruza por `id`.
 *
 * `stack` son nombres de tecnología; `layer` les da el color de su capa, el
 * mismo que en la rejilla del stack (ver `--tech-*` en tokens.css).
 */
export const experience = [
  {
    id: "alquimiasoft",
    company: "Alquimiasoft S.A.",
    current: true,
    stack: [
      { name: "Java", layer: "core" },
      { name: "Spring Boot", layer: "core" },
      { name: "Spring MVC", layer: "core" },
      { name: "PostgreSQL", layer: "data" },
      { name: "Mockito", layer: "cloud" },
      { name: "Swagger/OpenAPI", layer: "core" },
      { name: "Docker", layer: "cloud" },
      { name: "Flutter" },
      { name: "Jira" },
    ],
  },
];

export default experience;
