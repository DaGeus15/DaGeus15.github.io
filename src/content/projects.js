/**
 * Datos estructurales de los proyectos — lo que NO se traduce.
 *
 * El título, el subtítulo, el resumen, la descripción y el rol viven en
 * `copy.js` en los dos idiomas y se cruzan con esto por `id` (no por posición),
 * en `src/lib/useContent.js`.
 *
 * El orden importa: es el orden en que se muestran. Arriba lo que mejor
 * vende — producción y usuarios reales primero, después dominio complejo,
 * después arquitectura distribuida.
 *
 * Campos:
 *   id     Clave para cruzar con `copy.projects`
 *   lang   Lenguaje principal — pinta el punto de color
 *   tech   Stack. Los 4 primeros salen también en la tarjeta.
 *   repo   URL del repositorio, o null si no es público
 *   image  Captura en /public, o null para no mostrar nada
 */
export const projects = [
  {
    id: "kaphiy",
    lang: "TypeScript",
    tech: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Next.js",
      "Socket.IO",
      "Gemini API",
      "n8n",
      "Docker",
      "GitHub Actions",
    ],
    repo: "https://github.com/Arkasys-GDP/Kaphiy",
    image: null,
  },
  {
    id: "contable",
    lang: "TypeScript",
    tech: ["NestJS", "TypeScript", "Prisma", "MySQL", "JWT", "React", "Vite", "Tailwind CSS"],
    repo: null,
    image: null,
  },
  {
    id: "gasoline",
    lang: "TypeScript",
    tech: [
      "NestJS",
      "gRPC",
      "NATS",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "Next.js",
      "Docker Compose",
      "JWT",
    ],
    repo: "https://github.com/Application-Distributed-Gasoline-System",
    image: null,
  },
  {
    id: "safetrade",
    lang: "TypeScript",
    tech: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "React",
      "Vite",
      "Docker",
      "Azure App Service",
      "Azure Static Web Apps",
      "GitHub Actions",
    ],
    repo: "https://github.com/PabloAML1/proyecto_gpis",
    image: null,
  },
  {
    id: "booking",
    lang: "JavaScript",
    tech: ["Node.js", "Express", "MongoDB", "React", "React Native", "Expo", "Stripe", "Clerk"],
    repo: "https://github.com/DaGeus15/BookingView",
    image: null,
  },
];

/** Colores oficiales de GitHub Linguist para el punto de lenguaje. */
export const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  PHP: "#4f5d95",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  C: "#555555",
  "C++": "#f34b7d",
  Ruby: "#701516",
  Shell: "#89e051",
};

export const getLanguageColor = (lang) => languageColors[lang] || "#8b949e";

export default projects;
