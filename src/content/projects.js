/**
 * Datos estructurales de los proyectos: lo que NO se traduce. El título, el
 * resumen, la descripción, el rol, las etiquetas de las métricas y los nombres
 * de los nodos del diagrama viven en `copy.js` y se cruzan por `id`.
 *
 * El orden es el de la página. Los `featured` salen grandes, con diagrama; el
 * resto va en la lista de "otros proyectos". Todos tienen su página propia en
 * `/[lang]/projects/[id]`.
 *
 * Campos:
 *   year     Como en el CV.
 *   status   "production" pinta el distintivo "En producción".
 *   context  Distintivo de contexto sin traducir (p. ej. el programa).
 *   metrics  Cifras de un vistazo: `value` aquí, la etiqueta en copy.js.
 *   tech     Stack, como en el CV.
 *   repo     URL del repositorio, o null si el código es privado (lo dice
 *            la tarjeta: "Código privado").
 *   diagram  Arquitectura (ver `ArchitectureDiagram.jsx`):
 *              nodes: id, x/y (centro, en unidades del viewBox), layer,
 *                     label (nombre propio, sin traducir) o, si falta, el
 *                     texto de `copy.projects[id].nodes[nodeId]`;
 *                     tech (subtítulo en mono), w/h opcionales.
 *              edges: from, to, label (protocolo), async (línea discontinua).
 */
export const projects = [
  {
    id: "kaphiy",
    featured: true,
    year: "2026",
    status: "production",
    metrics: [
      { key: "tests", value: "165" },
      { key: "integrations", value: "3" },
    ],
    tech: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Next.js",
      "Socket.IO",
      "Gemini API",
      "Docker",
      "GitHub Actions",
    ],
    repo: "https://github.com/Arkasys-GDP/Kaphiy",
    diagram: {
      width: 640,
      height: 250,
      nodes: [
        { id: "pwa", x: 82, y: 125, tech: "Next.js" },
        { id: "api", label: "API", x: 300, y: 125, layer: "core", tech: "NestJS · Prisma" },
        { id: "agent", x: 300, y: 36, tech: "Gemini API" },
        { id: "db", label: "PostgreSQL", x: 300, y: 214, layer: "data" },
        { id: "kitchen", x: 540, y: 68, tech: "Socket.IO" },
        { id: "erp", x: 540, y: 182, layer: "cloud", tech: "REST" },
      ],
      edges: [
        { from: "pwa", to: "api", label: "HTTPS" },
        { from: "api", to: "agent" },
        { from: "api", to: "db" },
        { from: "api", to: "kitchen", label: "WebSocket" },
        { from: "api", to: "erp", label: "REST", async: true },
      ],
    },
  },
  {
    id: "gasoline",
    featured: true,
    year: "2025 – 2026",
    metrics: [
      { key: "services", value: "5" },
      { key: "protocols", value: "gRPC + NATS" },
    ],
    tech: [
      "NestJS",
      "gRPC",
      "NATS",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "Docker Compose",
      "JWT",
    ],
    repo: "https://github.com/Application-Distributed-Gasoline-System",
    diagram: {
      width: 640,
      height: 260,
      nodes: [
        { id: "client", x: 70, y: 130, tech: "Next.js" },
        { id: "gateway", label: "API Gateway", x: 238, y: 130, layer: "core", tech: "NestJS · JWT" },
        { id: "auth", x: 424, y: 26, w: 120, h: 34 },
        { id: "drivers", x: 424, y: 78, w: 120, h: 34 },
        { id: "vehicles", x: 424, y: 130, w: 120, h: 34 },
        { id: "routes", x: 424, y: 182, w: 120, h: 34 },
        { id: "fuel", x: 424, y: 234, w: 120, h: 34 },
        { id: "bus", label: "NATS", x: 584, y: 130, w: 72, h: 242, layer: "cloud", tech: "events" },
      ],
      edges: [
        { from: "client", to: "gateway", label: "HTTP" },
        { from: "gateway", to: "auth", label: "gRPC" },
        { from: "gateway", to: "drivers" },
        { from: "gateway", to: "vehicles" },
        { from: "gateway", to: "routes" },
        { from: "gateway", to: "fuel" },
        { from: "auth", to: "bus", async: true },
        { from: "drivers", to: "bus", async: true },
        { from: "vehicles", to: "bus", async: true },
        { from: "routes", to: "bus", async: true },
        { from: "fuel", to: "bus", async: true },
      ],
    },
  },
  {
    id: "contable",
    featured: true,
    year: "2026",
    context: "DIVISO · UTA",
    /* Sin `value`: la cifra es una frase ("debe = haber") y se traduce. */
    metrics: [{ key: "entries" }, { key: "compliance", value: "SRI" }],
    tech: ["NestJS", "TypeScript", "Prisma", "MySQL", "JWT", "React", "Tailwind CSS"],
    repo: null,
    diagram: {
      width: 640,
      height: 240,
      nodes: [
        { id: "web", x: 82, y: 110, tech: "React · Tailwind" },
        { id: "api", label: "API", x: 282, y: 110, layer: "core", tech: "NestJS · JWT" },
        { id: "billing", x: 506, y: 34, tech: "SRI" },
        { id: "ledger", x: 506, y: 110 },
        { id: "audit", x: 506, y: 186 },
        { id: "db", label: "MySQL", x: 282, y: 206, layer: "data", tech: "Prisma" },
      ],
      edges: [
        { from: "web", to: "api", label: "HTTPS" },
        { from: "api", to: "billing" },
        { from: "api", to: "ledger" },
        { from: "api", to: "audit", async: true },
        { from: "api", to: "db" },
      ],
    },
  },
  {
    id: "safetrade",
    tech: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "React",
      "Docker",
      "Azure App Service",
      "GitHub Actions",
    ],
    repo: "https://github.com/PabloAML1/proyecto_gpis",
  },
  {
    id: "booking",
    tech: ["Node.js", "Express", "MongoDB", "React", "React Native", "Stripe", "Clerk"],
    repo: "https://github.com/DaGeus15/BookingView",
  },
];

export const projectIds = projects.map((p) => p.id);

export default projects;
