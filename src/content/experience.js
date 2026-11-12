/**
 * Datos estructurales de cada puesto: lo que no se traduce. El texto (rol,
 * fechas, logros) vive en `copy.js`, en `experience`, y se cruza por `id`.
 *
 * `stack` son nombres de tecnología, en el orden en que se leen.
 * `links` son webs públicas del puesto (el producto, lo que publiqué); su
 * texto va en `copy.js`, en `linkText[id]`.
 * `logo` (de la empresa y de cada web) va en una pastilla clara, igual en los
 * dos temas: los logos son de colores y sobre el marino se perdían. Los
 * archivos están en `public/assets/images/logos/` (cuadrados, 176 px).
 */
export const experience = [
  {
    id: "alquimiasoft",
    company: "Alquimiasoft S.A.",
    logo: "/assets/images/logos/alquimiasoft.webp",
    current: true,
    links: [
      { id: "product", url: "https://migo.com.ec/", logo: "/assets/images/logos/migo.webp" },
      { id: "apiDocs", url: "https://apidocs.migo.com.ec/", logo: "/assets/images/logos/migo.webp" },
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
