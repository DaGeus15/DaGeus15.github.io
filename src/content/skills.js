/**
 * Stack técnico, agrupado como en el CV. Los iconos viven en
 * /public/assets/images/skills/ (locales, sin CDN).
 *
 * Cada grupo es una fila de la banda del stack:
 *   primary  las tecnologías con icono: lo que más uso del grupo. El icono se
 *            pinta como máscara en el color del texto (monocromo).
 *   tools    el resto, en texto. Nombres propios: no se traducen.
 *
 * El título del grupo y la frase de evidencia ("proof") son traducibles y
 * viven en `copy.js`, en `skills[id]`.
 */
const icon = (file) => `/assets/images/skills/${file}.svg`;

export const skillGroups = [
  {
    id: "backend",
    primary: [
      { name: "Java", icon: icon("java") },
      { name: "Spring Boot", icon: icon("spring") },
    ],
    tools: ["Spring MVC", "JPA/Hibernate", "REST", "Swagger/OpenAPI", "JWT"],
  },
  {
    id: "data",
    primary: [
      { name: "PostgreSQL", icon: icon("postgresql") },
      { name: "MySQL", icon: icon("mysql") },
      { name: "MongoDB", icon: icon("mongodb") },
    ],
    tools: ["SQL", "PL/SQL", "Prisma"],
  },
  {
    id: "devops",
    primary: [
      { name: "Docker", icon: icon("docker") },
      { name: "GitHub Actions", icon: icon("github-actions") },
    ],
    tools: ["Mockito", "Docker Compose", "Git", "Azure", "Vercel", "Jira"],
  },
  {
    id: "node",
    primary: [
      { name: "NestJS", icon: icon("nestjs") },
      { name: "Node.js", icon: icon("nodejs") },
    ],
    tools: ["Prisma", "gRPC", "NATS", "Socket.IO"],
  },
  {
    id: "frontend",
    primary: [
      { name: "Flutter", icon: icon("flutter") },
      { name: "React", icon: icon("react") },
      { name: "Next.js", icon: icon("nextjs") },
    ],
    tools: ["React Native", "TypeScript", "Tailwind CSS"],
  },
];

export default skillGroups;
