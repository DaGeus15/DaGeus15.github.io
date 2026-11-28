/**
 * Datos estructurales de los proyectos: lo que NO se traduce. El título, el
 * resumen, la descripción, el rol, las funcionalidades, el reto, las
 * etiquetas de las métricas, los pies de las capturas y los nombres de los
 * nodos del diagrama viven en `copy.js` y se cruzan por `id`.
 *
 * El orden es el de la página: primero los destacados. Todos tienen su
 * página propia en `/[lang]/projects/[id]`.
 *
 * Campos:
 *   year     Como en el CV.
 *   status   "production" pinta "En producción".
 *   featured Uno de los más importantes: tarjeta grande en el inicio y
 *            en Proyectos, y los mismos que el README de GitHub y LinkedIn.
 *            El resto va en Proyectos como lista compacta (título, resumen,
 *            stack y enlaces).
 *   context  Contexto sin traducir (p. ej. el programa).
 *   team     Personas en el equipo (sale en la ficha del caso).
 *   metrics  Cifras de un vistazo: `value` aquí, la etiqueta en copy.js. La
 *            tarjeta de la portada usa las dos primeras.
 *   tech     Stack, como en el CV.
 *   repo     URL del repositorio, o null si el código es privado.
 *   live     URL de la aplicación publicada, si la hay (sale en la ficha).
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

/* Fiado: lo que hice (el flujo biométrico, la sesión y la portada). La cámara
   de la prueba de vida va difuminada (es un compañero) con el óvalo guía
   redibujado. */
const fiado = {
  home: shot("fiado", "home", 944, 447),
  liveness: shot("fiado", "liveness", 866, 758),
  /* Sólo el recuadro de la cámara, para superponerlo en la tarjeta. */
  focus: shot("fiado", "liveness-focus", 413, 400),
  document: shot("fiado", "identity-document", 866, 646),
  confirmed: shot("fiado", "identity-confirmed", 865, 508),
  step: shot("fiado", "biometric-step", 787, 800),
  verified: shot("fiado", "biometric-verified", 865, 613),
};

/* Helpdesk: el panel en producción. La conversación de las capturas es de
   demostración ("María · demo") y su correo va difuminado. */
const helpdesk = {
  chat: shot("helpdesk", "operator-chat", 1372, 890),
  summary: shot("helpdesk", "advisor-summary", 1372, 890),
  metrics: shot("helpdesk", "metrics", 1372, 890),
  courses: shot("helpdesk", "courses", 1372, 890),
  landing: shot("helpdesk", "public-landing", 1372, 890),
  login: shot("helpdesk", "mobile-login", 647, 1400),
};

/* MiniWasp: producción, con una sala de demostración y personas ficticias. */
const miniwasp = {
  home: shot("miniwasp", "home", 1600, 1000),
  room: shot("miniwasp", "public-room", 1600, 1000),
  whisper: shot("miniwasp", "whisper", 1600, 1000),
  blocked: shot("miniwasp", "blocked-message", 1600, 1000),
  mobileHome: shot("miniwasp", "mobile-home", 647, 1400),
  mobileRoom: shot("miniwasp", "mobile-room", 647, 1400),
};

/* FuelOps: la demo publicada (antes Gasoline System), con datos sintéticos. */
const fuelops = {
  dashboard: shot("fuelops", "dashboard", 1425, 1540),
  routes: shot("fuelops", "routes", 1440, 1000),
  drivers: shot("fuelops", "drivers", 1440, 1000),
  vehicles: shot("fuelops", "vehicles", 1440, 1000),
  landing: shot("fuelops", "landing", 1440, 900),
  mobile: shot("fuelops", "mobile-dashboard", 375, 812),
};

/* SecureTex: producción, con un currículum de ejemplo y usuarios sintéticos. */
const securetex = {
  editor: shot("securetex", "editor", 1600, 1000),
  collaboration: shot("securetex", "collaboration", 1600, 1000),
  compiling: shot("securetex", "compiling", 1600, 1000),
  pdf: shot("securetex", "signed-pdf", 1600, 1000),
  dark: shot("securetex", "editor-dark", 1600, 1000),
  mobile: shot("securetex", "mobile-editor", 647, 1400),
};

/* ALPR Ecuador: la demo publicada, con placas ficticias. */
const placas = {
  landing: shot("placas", "landing", 1600, 1000),
  verdict: shot("placas", "verdict", 1600, 1000),
  binary: shot("placas", "binary", 1600, 1000),
  edges: shot("placas", "edges", 1600, 1000),
  mobile: shot("placas", "mobile-detection", 647, 1400),
  mobileVerdict: shot("placas", "mobile-verdict", 647, 1400),
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
    id: "miniwasp",
    featured: true,
    year: "2026",
    context: "Seguridad de Software · UTA",
    /* Sin `value` en la cobertura: el decimal se escribe distinto en cada idioma. */
    metrics: [{ key: "tests", value: "709" }, { key: "coverage" }, { key: "e2e", value: "14/14" }, { key: "threats", value: "39" }],
    tech: [
      "Node.js",
      "WebSocket (ws)",
      "WebRTC",
      "TensorFlow.js (WASM)",
      "nsfwjs",
      "AES-256-GCM",
      "Amazon S3",
      "Docker",
      "Railway",
      "node:test",
      "Playwright",
      "OWASP ZAP",
    ],
    repo: "https://github.com/DaGeus15/miniwasp",
    live: "https://miniwasp.dayle.dev",
    tone: "dark",
    cover: miniwasp.room,
    inset: miniwasp.mobileRoom,
    gallery: [miniwasp.home, miniwasp.room, miniwasp.whisper, miniwasp.blocked, miniwasp.mobileHome, miniwasp.mobileRoom],
    /* Un solo proceso, cuatro fronteras de confianza: los navegadores y el
       bucket no son de confianza; la llamada no pasa por el servidor. */
    diagram: {
      width: 640,
      height: 250,
      nodes: [
        { id: "browserA", x: 82, y: 52, tech: "HTML · JS" },
        { id: "browserB", x: 82, y: 198, tech: "HTML · JS" },
        { id: "server", label: "Node.js", x: 300, y: 125, h: 210, accent: true, tech: "http · ws" },
        { id: "moderation", x: 530, y: 52, tech: "nsfwjs · workers" },
        { id: "bucket", label: "Bucket S3", x: 530, y: 198, tech: "AES-256-GCM" },
      ],
      edges: [
        { from: "browserA", to: "server", label: "HTTPS · WSS" },
        { from: "browserB", to: "server", label: "HTTPS · WSS" },
        { from: "browserA", to: "browserB", label: "WebRTC · DTLS-SRTP", async: true },
        { from: "server", to: "moderation" },
        { from: "server", to: "bucket" },
      ],
    },
  },
  {
    id: "securetex",
    featured: true,
    year: "2026",
    team: 5,
    metrics: [
      { key: "abuse", value: "82" },
      { key: "tests", value: "142" },
      { key: "axe", value: "0" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Yjs",
      "CodeMirror",
      "WebSocket",
      "TeX Live",
      "gVisor",
      "Docker",
      "GitHub Actions",
      "Playwright",
    ],
    repo: "https://github.com/SecurTex-Devs/securetex",
    live: "https://securetex.dayle.dev",
    cover: securetex.editor,
    inset: securetex.mobile,
    gallery: [securetex.editor, securetex.collaboration, securetex.compiling, securetex.pdf, securetex.dark, securetex.mobile],
    /* La API es la caja alta: el navegador llega por el BFF (REST) y por
       WebSocket (la colaboración). El compilador sólo recibe trabajos por el
       buzón, sin red. */
    diagram: {
      width: 640,
      height: 260,
      nodes: [
        { id: "client", x: 82, y: 60, tech: "CodeMirror · Yjs" },
        { id: "web", label: "Next.js", x: 82, y: 205, tech: "BFF" },
        { id: "api", label: "API", x: 300, y: 135, h: 236, accent: true, tech: "NestJS · Fastify" },
        { id: "db", label: "PostgreSQL", x: 530, y: 40, tech: "cifrado · RLS" },
        { id: "jobs", x: 530, y: 135, tech: "tmpfs" },
        { id: "compiler", x: 530, y: 230, tech: "gVisor · sin red" },
      ],
      edges: [
        { from: "client", to: "web", label: "HTTPS" },
        { from: "client", to: "api", label: "WebSocket" },
        { from: "web", to: "api", label: "REST" },
        { from: "api", to: "db" },
        { from: "api", to: "jobs" },
        { from: "jobs", to: "compiler", label: "SSH", async: true },
      ],
    },
  },
  {
    id: "kaphiy",
    featured: true,
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
    id: "fuelops",
    featured: true,
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
      "JWT",
      "Prometheus",
      "Grafana",
      "Docker Compose",
      "Next.js",
    ],
    repo: "https://github.com/Application-Distributed-Gasoline-System",
    live: "https://fuelops.dayle.dev",
    tone: "dark",
    cover: fuelops.dashboard,
    inset: fuelops.mobile,
    gallery: [fuelops.dashboard, fuelops.routes, fuelops.drivers, fuelops.vehicles, fuelops.landing, fuelops.mobile],
    diagram: {
      width: 640,
      height: 260,
      nodes: [
        { id: "client", x: 70, y: 130, tech: "Next.js" },
        { id: "gateway", label: "API Gateway", x: 238, y: 130, accent: true, tech: "NestJS · JWT" },
        { id: "auth", x: 424, y: 26, w: 120, h: 34, accent: true },
        { id: "drivers", x: 424, y: 78, w: 120, h: 34 },
        { id: "vehicles", x: 424, y: 130, w: 120, h: 34 },
        { id: "routes", x: 424, y: 182, w: 120, h: 34, accent: true },
        { id: "fuel", x: 424, y: 234, w: 120, h: 34, accent: true },
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
    id: "fiado",
    featured: true,
    year: "2026",
    team: 6,
    /* Sin `value`: "2 de 3" se traduce. */
    metrics: [{ key: "gestures" }, { key: "handoff", value: "QR + SSE" }, { key: "tests", value: "30" }, { key: "landmarks", value: "68" }],
    tech: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "face-api",
      "TensorFlow.js (WASM)",
      "Server-Sent Events",
      "Vitest",
      "Vercel",
      "Render",
    ],
    repo: "https://github.com/seby10/simulador-financiero",
    live: "https://fiado-zeta.vercel.app/",
    cover: fiado.step,
    inset: fiado.focus,
    gallery: [fiado.document, fiado.liveness, fiado.confirmed, fiado.step, fiado.verified, fiado.home],
    /* Mis nodos (sesión, biometría y traspaso al celular) en latón; los
       simuladores, del resto del equipo, como contexto. */
    diagram: {
      width: 640,
      height: 250,
      nodes: [
        { id: "web", x: 82, y: 70, tech: "Next.js · face-api.js" },
        { id: "phone", x: 82, y: 180, tech: "Next.js · QR" },
        { id: "api", label: "API", x: 300, y: 125, tech: "NestJS · Prisma" },
        { id: "auth", x: 300, y: 32, accent: true, tech: "cookies · scrypt" },
        { id: "biometrics", x: 530, y: 40, accent: true, tech: "face-api · WASM" },
        { id: "handoff", x: 530, y: 125, accent: true, tech: "SSE · 10 min" },
        { id: "simulators", x: 530, y: 210, tech: "PDF" },
        { id: "db", label: "PostgreSQL", x: 300, y: 222, tech: "Neon" },
      ],
      edges: [
        { from: "web", to: "api", label: "HTTPS" },
        { from: "phone", to: "api", label: "HTTPS" },
        { from: "api", to: "auth" },
        { from: "api", to: "biometrics" },
        { from: "api", to: "handoff" },
        { from: "api", to: "simulators" },
        { from: "api", to: "db" },
      ],
    },
  },
  {
    id: "helpdesk",
    year: "2026",
    context: "Hackathon · UTA",
    /* Sin `value` en la primera: "85 min" se traduce. */
    metrics: [{ key: "time" }, { key: "eval", value: "19/19" }, { key: "tests", value: "46" }, { key: "fallback", value: "5" }],
    tech: [
      "NestJS",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Gemini API",
      "grammY",
      "zod",
      "React",
      "Vite",
      "Tailwind CSS",
      "GitHub Actions",
      "Render",
      "Vercel",
    ],
    repo: "https://github.com/DaGeus15/helpdesk_agent_uta",
    live: "https://helpdesk.dayle.dev/",
    cover: helpdesk.chat,
    inset: helpdesk.login,
    gallery: [helpdesk.chat, helpdesk.summary, helpdesk.metrics, helpdesk.courses, helpdesk.landing, helpdesk.login],
    /* La API es una caja alta: cada conexión entra recta. El panel lee de
       Supabase en tiempo real y escribe por la API, que es la decisión que
       el diagrama tiene que enseñar. */
    diagram: {
      width: 640,
      height: 260,
      nodes: [
        { id: "telegram", label: "Telegram", x: 82, y: 40, tech: "grammY" },
        { id: "dashboard", x: 82, y: 135, tech: "React · Vercel" },
        { id: "db", label: "Supabase", x: 82, y: 230, tech: "Postgres · RLS" },
        { id: "api", label: "API", x: 300, y: 135, h: 236, accent: true, tech: "NestJS · Render" },
        { id: "llm", label: "Gemini", x: 530, y: 40, tech: "JSON · zod" },
        { id: "guardrails", x: 530, y: 103, tech: "pre · post" },
        { id: "catalog", x: 530, y: 167, tech: "scraping · 6 h" },
        { id: "enrollment", x: 530, y: 230, tech: "Google Form" },
      ],
      edges: [
        { from: "telegram", to: "api", label: "webhook" },
        { from: "dashboard", to: "api", label: "REST" },
        { from: "api", to: "db" },
        { from: "db", to: "dashboard", label: "Realtime", async: true },
        { from: "api", to: "llm" },
        { from: "api", to: "guardrails" },
        { from: "api", to: "catalog" },
        { from: "api", to: "enrollment" },
      ],
    },
  },
  {
    id: "placas",
    year: "2026",
    team: 2,
    metrics: [
      { key: "knn", value: "91,25 %" },
      { key: "latency", value: "1,8 s" },
      { key: "tests", value: "10" },
    ],
    tech: ["Python", "FastAPI", "OpenCV", "NumPy", "YOLOv8", "ONNX", "SQLite", "Next.js", "Docker", "Render", "Cloudflare Pages"],
    repo: null,
    live: "https://placas.dayle.dev",
    cover: placas.landing,
    inset: placas.mobile,
    gallery: [placas.landing, placas.verdict, placas.binary, placas.edges, placas.mobile, placas.mobileVerdict],
    /* La API es una caja alta: cada etapa del pipeline sale de ella. Lo mío
       del proyecto original es la base (la interfaz y la API). */
    diagram: {
      width: 640,
      height: 260,
      nodes: [
        { id: "web", x: 82, y: 135, accent: true, tech: "Next.js · Pages" },
        { id: "api", label: "API", x: 300, y: 135, h: 236, accent: true, tech: "FastAPI · Render" },
        { id: "detector", x: 530, y: 40, tech: "YOLO · ONNX" },
        { id: "ocr", x: 530, y: 103, tech: "KNN · NumPy" },
        { id: "fuzzy", x: 530, y: 167, tech: "Mamdani" },
        { id: "db", label: "SQLite", x: 530, y: 230 },
      ],
      edges: [
        { from: "web", to: "api", label: "HTTPS" },
        { from: "api", to: "detector" },
        { from: "api", to: "ocr" },
        { from: "api", to: "fuzzy" },
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
