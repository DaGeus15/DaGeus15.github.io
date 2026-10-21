/**
 * Datos estructurales de cada puesto: lo que no se traduce. El texto (rol,
 * fechas, logros) vive en `copy.js`, en `experience`, y se cruza por `id`.
 *
 * `stack` son nombres de tecnología, en el orden en que se leen.
 * `links` son webs públicas del puesto (el producto, lo que publiqué); su
 * texto va en `copy.js`, en `linkText[id]`.
 */
export const experience = [
  {
    id: "alquimiasoft",
    company: "Alquimiasoft S.A.",
    current: true,
    links: [
      { id: "product", url: "https://migo.com.ec/" },
      { id: "apiDocs", url: "https://apidocs.migo.com.ec/" },
    ],
    stack: [
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "Spring MVC" },
      { name: "PostgreSQL" },
      { name: "Mockito" },
      { name: "Swagger/OpenAPI" },
      { name: "Apidog" },
      { name: "Docker" },
      { name: "Flutter" },
      { name: "Jira" },
    ],
  },
];

export default experience;
