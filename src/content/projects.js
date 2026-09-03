/**
 * Proyectos destacados.
 *
 * El orden importa: es el orden en que se muestran. Arriba lo que mejor
 * vende — producción y usuarios reales primero, después dominio complejo,
 * después arquitectura distribuida.
 *
 * Campos:
 *   title        Nombre corto del proyecto
 *   subtitle     Qué es, en una línea
 *   short        Etiqueta para la navegación rápida
 *   summary      Descripción de la tarjeta (vista resumida)
 *   description  Array de párrafos para la vista detallada
 *   role         Mi aportación concreta al proyecto
 *   lang         Lenguaje principal — pinta el punto de color
 *   tech         Stack. Los 4 primeros salen también en la tarjeta.
 *   repo         URL del repositorio, o null si no es público
 *   image        Captura en /public, o null para mostrar un placeholder
 */
export const projects = [
  {
    title: "KAPHIY",
    subtitle: "Ecosistema de automatización de pedidos con IA conversacional",
    short: "KAPHIY",
    summary:
      "Pedidos para una cafetería real: PWA con agente conversacional, panel de cocina en tiempo real y contabilidad integrada.",
    description: [
      "Ecosistema completo para una cafetería real, sobre un backend en NestJS y PostgreSQL. El comensal pide desde una PWA conversando con un agente basado en la API de Gemini, que interpreta lenguaje natural y arma el pedido; la cocina lo recibe al instante en un panel en tiempo real por WebSocket, y cada venta se integra con el ERP contable del cliente para no duplicar datos.",
      "Está en producción, sostenido por 165 pruebas automatizadas y un pipeline de CI/CD en GitHub Actions que valida cada cambio antes de llegar al negocio que depende de él a diario.",
    ],
    role: "Desarrollo backend: modelado de datos con Prisma, API y lógica de pedidos, canal de tiempo real e integración con el agente conversacional.",
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
    title: "Sistema Integrado Administrativo Contable",
    subtitle: "Junta Administradora de Agua Potable de Miñarica",
    short: "Contable",
    summary:
      "Facturación electrónica (SRI) y motor contable completo para una junta comunitaria de agua potable.",
    description: [
      "Proyecto de vinculación (UTA) para digitalizar una junta de agua potable que llevaba su facturación y su contabilidad a mano. Resuelve dos mundos a la vez: facturación electrónica conforme al SRI —emisión, autorización, secuenciales— y un motor contable de verdad, con plan de cuentas, asientos, libro diario y cierre de períodos.",
      "Lo interesante está en los controles internos: cada factura genera su asiento dentro de una transacción de Prisma —o se guarda todo, o nada—, el cierre valida que débitos y créditos cuadren antes de bloquear el período, y todo corre bajo control de acceso por roles con JWT y una bitácora de auditoría. Es el proyecto que más me enseñó a traducir las reglas de un dominio ajeno al mío —la contabilidad— a validaciones que el código garantiza.",
    ],
    role: "Desarrollo del backend del módulo contable y de los mecanismos de control interno (roles, auditoría, cierre de períodos), además de la documentación técnica del sistema.",
    lang: "TypeScript",
    tech: ["NestJS", "TypeScript", "Prisma", "MySQL", "JWT", "React", "Vite", "Tailwind CSS"],
    repo: null,
    image: null,
  },
  {
    title: "Gasoline System",
    subtitle: "Sistema distribuido de control de consumo de combustible",
    short: "Gasoline",
    summary:
      "Microservicios con API Gateway, gRPC para llamadas síncronas y NATS para eventos.",
    description: [
      "Control de consumo de combustible de una flota, diseñado como microservicios independientes —autenticación, conductores, vehículos, rutas y combustible—, cada uno con su base de datos y su contenedor, detrás de un único API Gateway.",
      "La comunicación usa dos caminos según la necesidad: gRPC cuando un servicio necesita respuesta inmediata de otro, y eventos por NATS cuando basta con notificar sin bloquear al emisor. Fue donde entendí en la práctica los costes de lo distribuido: consistencia entre bases separadas y manejo de fallos parciales.",
    ],
    role: "Desarrollo de microservicios, definición de contratos gRPC y publicación/consumo de eventos NATS.",
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
    title: "SafeTrade",
    subtitle: "Plataforma de venta de productos y servicios",
    short: "SafeTrade",
    summary:
      "Marketplace con moderación de publicaciones, contenerizado y desplegado en Azure con CI/CD.",
    description: [
      "Marketplace donde los usuarios publican productos y servicios y pueden reportar publicaciones, con un flujo de moderación detrás. Backend en NestJS + Prisma + PostgreSQL y frontend en React + Vite.",
      "El foco estuvo tanto en la app como en cómo llega a producción: imágenes Docker multi-stage, despliegue en Azure App Service y Static Web Apps, y un pipeline de GitHub Actions que construye, prueba y despliega en cada push. Mi primer contacto serio con la idea de que el despliegue es parte del desarrollo, no un paso posterior.",
    ],
    role: "Backend y configuración de la contenerización y el pipeline de CI/CD.",
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
    title: "Booking View",
    subtitle: "Plataforma web y móvil de reserva de inmuebles",
    short: "Booking",
    summary:
      "Reserva de inmuebles con app web y móvil, pagos con Stripe y notificaciones push.",
    description: [
      "Reserva de inmuebles con dos perfiles distintos: el propietario que publica y administra sus propiedades y el huésped que busca, reserva y paga. Una única API REST en Node.js + Express + MongoDB alimenta tanto la app web (React) como la móvil (React Native con Expo).",
      "Incluye validación de disponibilidad para evitar reservas solapadas, pagos con Stripe, sesiones con Clerk y notificaciones push para nuevas reservas y cambios de estado.",
    ],
    role: "Desarrollo de la API REST y de la aplicación móvil en React Native.",
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
