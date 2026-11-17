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

const primaryIcons = new Map(
  skillGroups.flatMap(({ primary }) => primary.map(({ name, icon }) => [name, icon])),
);

/* Los casos reutilizan el Stack. Las herramientas sin marca local se
   reconocen por el símbolo de su función (mensajería, biometría, etc.). */
const projectIconFiles = {
  Prisma: "prisma",
  "Socket.IO": "socket-io",
  "Gemini API": "gemini",
  n8n: "n8n",
  TypeScript: "typescript",
  Supabase: "supabase",
  grammY: "send",
  zod: "zod",
  Vite: "vite",
  "Tailwind CSS": "tailwind",
  Render: "render",
  Vercel: "vercel",
  "face-api": "biometrics",
  "TensorFlow.js (WASM)": "tensorflow",
  "Server-Sent Events": "events",
  Vitest: "vitest",
  gRPC: "rpc",
  "Protocol Buffers": "serialization",
  NATS: "nats",
  "Docker Compose": "docker",
  JWT: "jwt",
  Express: "express",
  "React Native": "react",
  Expo: "expo",
  Stripe: "stripe",
  Clerk: "clerk",
  Cloudinary: "cloudinary",
  "Azure App Service": "azure",
  "Azure Static Web Apps": "azure",
};

export function technologyIcon(name) {
  return primaryIcons.get(name) ?? (Object.hasOwn(projectIconFiles, name) ? icon(projectIconFiles[name]) : undefined);
}

export default skillGroups;
