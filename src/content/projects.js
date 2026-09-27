/**
 * Datos estructurales de los proyectos: lo que NO se traduce. El título, el
 * resumen, la descripción, el rol, las funcionalidades, el reto, las
 * etiquetas de las métricas, los pies de las capturas y los nombres de los
 * nodos del diagrama viven en `copy.js` y se cruzan por `id`.
 *
 * El orden es el de la página. Todos salen en "Trabajo seleccionado" y tienen
 * su página propia en `/[lang]/projects/[id]`.
 *
 * Campos:
 *   year     Como en el CV.
 *   status   "production" pinta "En producción".
 *   context  Contexto sin traducir (p. ej. el programa).
 *   team     Personas en el equipo (sale en la ficha del caso).
 *   metrics  Cifras de un vistazo: `value` aquí, la etiqueta en copy.js. La
 *            tarjeta de la portada usa las dos primeras.
 *   tech     Stack, como en el CV.
 *   repo     URL del repositorio, o null si el código es privado.
 *   tone     "dark" si las capturas son oscuras: la tarjeta invierte su
 *            superficie para que la ventana no flote sobre un blanco.
 *   cover    Captura principal (tarjeta y cabecera del caso). `inset` es la
 *            captura de móvil que se superpone en la tarjeta, si la hay.
 *   gallery  Todas las capturas del caso, en orden. El pie de cada una está
 *            en copy.js (`shots[id]`). Salen de los informes de cada
 *            proyecto con `npm run shots` (ver scripts/projects/).
 *   diagram  Arquitectura (ver `ArchitectureDiagram.jsx`):
 *              nodes: id, x/y (centro, en unidades del viewBox), accent
 *                     (resalta el nodo propio), label (nombre propio, sin
 *                     traducir) o, si falta, `copy.projects[id].nodes[nodeId]`;
 *                     tech (subtítulo en mono), w/h opcionales.
 *              edges: from, to, label (protocolo), async (línea discontinua).
 */

/** Una captura de `public/assets/projects/<proyecto>/<id>.webp`. `w`/`h` son
    los píxeles reales del archivo: reservan el hueco antes de que cargue. */
const shot = (project, id, w, h) => ({
  id,
  src: `/assets/projects/${project}/${id}.webp`,
  w,
  h,
  mobile: h > w * 1.4,
});

const kaphiy = {
  chat: shot("kaphiy", "pwa-chat", 647, 1400),
  kds: shot("kaphiy", "kitchen-display", 594, 841),
  tests: shot("kaphiy", "tests", 1115, 517),
};

const gasoline = {
  routes: shot("gasoline", "routes", 1126, 664),
  vehicles: shot("gasoline", "vehicles", 1126, 652),
  fuel: shot("gasoline", "fuel", 1129, 926),
  login: shot("gasoline", "login", 1126, 539),
};

const contable = {
  entries: shot("contable", "journal-entries", 940, 450),
  entry: shot("contable", "entry-detail", 790, 517),
  newEntry: shot("contable", "new-entry", 942, 797),
  period: shot("contable", "period-detail", 946, 490),
  journal: shot("contable", "general-journal", 942, 442),
  ledger: shot("contable", "general-ledger", 852, 426),
  trial: shot("contable", "trial-balance", 1097, 528),
  income: shot("contable", "income-statement", 907, 455),
  accounts: shot("contable", "chart-of-accounts", 937, 542),
  newAccount: shot("contable", "new-account", 652, 627),
  receivable: shot("contable", "receivable-detail", 617, 630),
};

const booking = {
  home: shot("booking", "home", 944, 472),
  property: shot("booking", "property", 944, 474),
  admin: shot("booking", "admin-dashboard", 944, 474),
  mobileBooking: shot("booking", "mobile-booking", 340, 755),
  mobilePayment: shot("booking", "mobile-payment", 341, 757),
};

const safetrade = {
  home: shot("safetrade", "home", 1600, 797),
  catalog: shot("safetrade", "catalog", 1600, 795),
  product: shot("safetrade", "mobile-product", 387, 861),
  azure: shot("safetrade", "azure-resources", 564, 235),
};

export const projects = [
  {
    id: "kaphiy",
    year: "2026",
    status: "production",
    team: 4,
    metrics: [
      { key: "tests", value: "165" },
      { key: "releases", value: "11" },
      { key: "integrations", value: "3" },
      { key: "a11y", value: "WCAG 2.1 AA" },
    ],
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
    tone: "dark",
    cover: kaphiy.kds,
    inset: kaphiy.chat,
    gallery: [kaphiy.chat, kaphiy.kds, kaphiy.tests],
    diagram: {
      width: 640,
      height: 250,
      nodes: [
        { id: "pwa", x: 82, y: 125, tech: "Next.js · PWA" },
        { id: "api", label: "API", x: 300, y: 125, accent: true, tech: "NestJS · Prisma" },
        { id: "agent", x: 300, y: 36, tech: "Gemini · n8n" },
        { id: "db", label: "PostgreSQL", x: 300, y: 214, tech: "Neon" },
        { id: "kitchen", x: 540, y: 68, tech: "Socket.IO" },
        { id: "erp", x: 540, y: 182, tech: "Contífico" },
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
    year: "2025 – 2026",
    team: 4,
    metrics: [
      { key: "services", value: "5" },
      { key: "protocols", value: "gRPC + NATS" },
      { key: "roles", value: "3" },
    ],
    tech: [
      "NestJS",
      "gRPC",
      "Protocol Buffers",
      "NATS",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "Docker Compose",
      "JWT",
      "Next.js",
    ],
    repo: "https://github.com/Application-Distributed-Gasoline-System",
    tone: "dark",
    cover: gasoline.routes,
    gallery: [gasoline.routes, gasoline.vehicles, gasoline.fuel, gasoline.login],
    diagram: {
      width: 640,
      height: 260,
      nodes: [
        { id: "client", x: 70, y: 130, tech: "Next.js" },
        { id: "gateway", label: "API Gateway", x: 238, y: 130, accent: true, tech: "NestJS · JWT" },
        { id: "auth", x: 424, y: 26, w: 120, h: 34 },
        { id: "drivers", x: 424, y: 78, w: 120, h: 34 },
        { id: "vehicles", x: 424, y: 130, w: 120, h: 34 },
        { id: "routes", x: 424, y: 182, w: 120, h: 34 },
        { id: "fuel", x: 424, y: 234, w: 120, h: 34 },
        { id: "bus", label: "NATS", x: 584, y: 130, w: 72, h: 242, tech: "events" },
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
    year: "2026",
    context: "DIVISO · UTA",
    /* Sin `value`: la cifra es una frase ("debe = haber") y se traduce. */
    metrics: [{ key: "reports", value: "6" }, { key: "balance" }, { key: "entryTypes", value: "3" }],
    tech: ["NestJS", "TypeScript", "Prisma", "MySQL", "JWT", "React", "Tailwind CSS"],
    repo: null,
    cover: contable.entries,
    gallery: [
      contable.entries,
      contable.entry,
      contable.newEntry,
      contable.period,
      contable.journal,
      contable.ledger,
      contable.trial,
      contable.income,
      contable.accounts,
      contable.newAccount,
      contable.receivable,
    ],
    /* Sólo el módulo contable, que es lo que hice. La facturación (del resto
       del equipo) aparece como la fuente de la que llegan los asientos. */
    diagram: {
      width: 640,
      height: 240,
      nodes: [
        { id: "web", x: 82, y: 120, tech: "React · Tailwind" },
        { id: "api", label: "API", x: 282, y: 120, accent: true, tech: "NestJS · JWT" },
        { id: "billing", x: 282, y: 30, tech: "SRI" },
        { id: "entries", x: 506, y: 44 },
        { id: "periods", x: 506, y: 120 },
        { id: "reports", x: 506, y: 196, tech: "PDF" },
        { id: "db", label: "MySQL", x: 282, y: 210, tech: "Prisma" },
      ],
      edges: [
        { from: "web", to: "api", label: "HTTPS" },
        { from: "billing", to: "api", async: true },
        { from: "api", to: "entries" },
        { from: "api", to: "periods" },
        { from: "api", to: "reports" },
        { from: "api", to: "db" },
      ],
    },
  },
  {
    id: "booking",
    year: "2025 – 2026",
    team: 4,
    metrics: [
      { key: "clients", value: "2" },
      { key: "roles", value: "4" },
    ],
    tech: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "React Native",
      "Expo",
      "Stripe",
      "Clerk",
      "Cloudinary",
    ],
    repo: "https://github.com/DaGeus15/BookingView",
    cover: booking.home,
    inset: booking.mobileBooking,
    gallery: [booking.home, booking.property, booking.admin, booking.mobileBooking, booking.mobilePayment],
  },
  {
    id: "safetrade",
    year: "2025 – 2026",
    metrics: [
      { key: "cloud", value: "Azure" },
      { key: "pipeline", value: "CI/CD" },
    ],
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
    cover: safetrade.home,
    inset: safetrade.product,
    gallery: [safetrade.home, safetrade.catalog, safetrade.product, safetrade.azure],
  },
];

export const projectIds = projects.map((p) => p.id);

export default projects;
