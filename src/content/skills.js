/**
 * Stack técnico, agrupado como en el CV. Los iconos viven en
 * /public/assets/images/skills/ (locales, sin CDN).
 *
 * Cada grupo es una tarjeta de la rejilla bento:
 *   layer    color semántico (tokens `--tech-*`): core | data | cloud.
 *            Sin capa, cae al acento.
 *   span     2 = tarjeta doble. El orden está pensado para 2+1 / 1+1+1 a tres
 *            columnas sin huecos.
 *   primary  las tecnologías con icono: lo que más uso del grupo.
 *   tools    el resto, como etiquetas. Nombres propios: no se traducen.
 *
 * El título del grupo y la frase de evidencia ("proof") son traducibles y
 * viven en `copy.js`, en `skills[id]`.
 */
const icon = (file) => `/assets/images/skills/${file}.svg`;

export const skillGroups = [
  {
    id: "backend",
    layer: "core",
    span: 2,
    primary: [
      { name: "Java", icon: icon("java") },
      { name: "Spring Boot", icon: icon("spring") },
    ],
    tools: ["Spring MVC", "JPA/Hibernate", "REST", "Swagger/OpenAPI", "JWT"],
  },
  {
    id: "data",
    layer: "data",
    primary: [
      { name: "PostgreSQL", icon: icon("postgresql") },
      { name: "MySQL", icon: icon("mysql") },
      { name: "MongoDB", icon: icon("mongodb") },
    ],
    tools: ["SQL", "PL/SQL", "Prisma"],
  },
  {
    id: "devops",
    layer: "cloud",
    primary: [
      { name: "Docker", icon: icon("docker") },
      { name: "GitHub Actions", icon: icon("github-actions") },
    ],
    tools: ["Mockito", "Docker Compose", "Git", "Azure", "Vercel", "Jira"],
  },
  {
    id: "node",
    layer: "core",
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
