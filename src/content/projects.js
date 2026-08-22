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
      "Sistema de pedidos para una cafetería real: PWA con agente conversacional, panel de cocina en tiempo real y contabilidad integrada.",
    description: [
      "KAPHIY nació de un problema concreto de una cafetería: los pedidos se tomaban a mano, la cocina se enteraba tarde y la información no llegaba nunca al sistema contable. Construimos un ecosistema completo alrededor de un backend en NestJS y PostgreSQL. El comensal pide desde una PWA conversando con un agente basado en la API de Gemini, que interpreta lenguaje natural, resuelve dudas del menú y arma el pedido sin fricción. La cocina lo recibe al instante en un panel en tiempo real vía WebSocket, con estados que el comensal ve reflejados desde su móvil. Los flujos administrativos —confirmaciones, avisos, sincronización— se orquestan con n8n, y cada venta se integra con el ERP contable del cliente para que no haya doble captura de datos.",
      "El proyecto está desplegado en producción y sostenido por 165 pruebas automatizadas y un pipeline de CI/CD en GitHub Actions, de modo que cada cambio se valida antes de llegar al negocio que depende de él a diario.",
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
      "Facturación electrónica con normativa SRI y motor contable completo para una junta comunitaria de agua potable.",
    description: [
      "Proyecto de vinculación con la sociedad (Proyecto DIVISO, UTA) para digitalizar la gestión de la junta administradora de agua potable de Miñarica San Vicente Yaculoma y Bellavista El Rosario, que hasta entonces llevaba su facturación y su contabilidad de forma manual. El sistema resuelve dos mundos a la vez: la facturación electrónica conforme a la normativa del SRI —emisión, autorización, secuenciales, liquidaciones de compra— y un motor contable de verdad, con plan de cuentas, asientos manuales y automáticos, libro diario, períodos contables y cierre formal.",
      "La parte interesante del diseño está en los controles internos. Los asientos siguen un ciclo de aprobación (borrador → aprobado → cerrado) y cada factura emitida genera su asiento automáticamente dentro de una transacción de Prisma, de modo que factura, asiento y registro de auditoría se guardan juntos o no se guarda nada. El cierre de período valida que todas las facturas estén autorizadas, todos los asientos aprobados y que débitos y créditos cuadren antes de bloquear el período y congelar el libro diario. Sobre eso corre un control de acceso por roles —contador, tesorero, operador y administrador— implementado con JWT y guards de NestJS, y una bitácora de auditoría que guarda quién hizo qué, sobre qué entidad, con qué valores antes y después.",
      "Es el proyecto que más me enseñó sobre traducir reglas de un dominio ajeno al mío —la contabilidad— a validaciones que el código pueda garantizar.",
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
      "Arquitectura de microservicios con API Gateway, gRPC para llamadas síncronas y NATS para eventos.",
    description: [
      "Sistema para controlar el consumo de combustible de una flota: quién conduce, qué vehículo, qué ruta y cuánto se carga. Se diseñó como un conjunto de microservicios independientes —autenticación, conductores, vehículos, rutas y combustible—, cada uno con su propia base de datos y su propio contenedor, coordinados detrás de un API Gateway que es el único punto de entrada público.",
      "La comunicación entre servicios usa dos caminos según la necesidad: gRPC cuando un servicio necesita una respuesta inmediata de otro (validar que un conductor existe antes de registrar una carga) y eventos asíncronos por NATS cuando basta con notificar que algo ocurrió, sin bloquear al emisor. Fue el proyecto donde entendí en la práctica los costes reales de lo distribuido: consistencia entre bases de datos separadas, manejo de fallos parciales y por qué cada llamada de red es una decisión de diseño, no un detalle.",
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
      "Marketplace con gestión de publicaciones y reportes, contenerizado y desplegado en Azure con CI/CD automatizado.",
    description: [
      "Marketplace donde los usuarios publican productos y servicios, gestionan sus anuncios y pueden reportar publicaciones sospechosas o inapropiadas, con un flujo de moderación detrás. El backend en NestJS con Prisma y PostgreSQL sirve a un frontend en React + Vite.",
      "El foco del proyecto estuvo tanto en la aplicación como en cómo llega a producción: contenerización con Dockerfiles multi-stage para que las imágenes finales lleven solo lo necesario, despliegue del API en Azure App Service y del frontend en Azure Static Web Apps, y un pipeline de GitHub Actions que construye, prueba y despliega en cada push. Fue mi primer contacto serio con la idea de que el despliegue es parte del desarrollo, no un paso posterior.",
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
      "Reserva de inmuebles con app web y móvil, roles diferenciados, pagos con Stripe y notificaciones push.",
    description: [
      "Plataforma de reserva de inmuebles con dos perfiles bien distintos: el propietario que publica y administra sus propiedades y el huésped que busca, reserva y paga. Una única API REST en Node.js y Express con MongoDB alimenta tanto la aplicación web en React como la app móvil en React Native con Expo, lo que obligó a diseñar los endpoints pensando en dos clientes con necesidades de datos diferentes.",
      "Incluye validación de disponibilidad para evitar reservas solapadas, pagos integrados con Stripe, autenticación y gestión de sesiones con Clerk, y notificaciones push para avisar de nuevas reservas y cambios de estado.",
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
