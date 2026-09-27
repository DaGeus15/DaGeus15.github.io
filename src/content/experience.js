/**
 * Datos estructurales de cada puesto: lo que no se traduce. El texto (rol,
 * fechas, logros) vive en `copy.js`, en `experience`, y se cruza por `id`.
 *
 * `stack` son nombres de tecnología, en el orden en que se leen.
 */
export const experience = [
  {
    id: "alquimiasoft",
    company: "Alquimiasoft S.A.",
    current: true,
    stack: [
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "Spring MVC" },
      { name: "PostgreSQL" },
      { name: "Mockito" },
      { name: "Swagger/OpenAPI" },
      { name: "Docker" },
      { name: "Flutter" },
      { name: "Jira" },
    ],
  },
];

export default experience;
