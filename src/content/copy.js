/**
 * TODO el texto traducible del sitio, en los dos idiomas.
 *
 * Aquí sólo vive lo que cambia de un idioma a otro. Lo que no se traduce
 * —rutas de imagen, URLs de repositorio, stack tecnológico, iconos, colores de
 * lenguaje, porcentajes de las barras de idioma— sigue en su archivo de
 * `src/content/` y se une con esto en `src/lib/useContent.js`. Así un dato
 * estructural no puede quedar desincronizado entre `es` y `en`.
 *
 * Los proyectos se cruzan por `id`, no por posición.
 * Las marcas `**negrita**` las interpreta `lib/RichText.jsx`.
 */
export const copy = {
  /* ────────────────────────────── ESPAÑOL ────────────────────────────── */
  es: {
    ui: {
      downloadCv: "Descargar CV",
      cvChoose: "Elegí el idioma del CV",
      cvSpanish: "CV en español",
      cvEnglish: "CV en inglés",
      residence: "Residencia:",
      nationality: (value) => `(Nacionalidad: ${value})`,
      hardwareSetup: "Mi Setup de Hardware",
      hobbies: "Hobbies e Intereses",
      techStack: "Tecnologías y Herramientas",
      languagesTitle: "Dominio de Idiomas",
      certifications: "Certificaciones y Cursos",
      projectsIntro: "Fichas técnicas: arquitectura, stack y mi aportación en cada proyecto.",
      systemDescription: "Descripción del Sistema",
      techSheet: "Ficha Técnica",
      mainLanguage: "Lenguaje principal",
      myRole: "Mi rol",
      repository: "Repositorio",
      goToProject: "Ir a un proyecto",
      contactIntro:
        "¿Tienes un proyecto en mente o simplemente quieres saludar? ¡No dudes en escribirme!",
      formName: "Tu nombre",
      formNamePlaceholder: "Tu Nombre",
      formEmail: "Tu correo electrónico",
      formEmailPlaceholder: "Tu Correo Electrónico",
      formMessage: "Tu mensaje",
      formMessagePlaceholder: "¿Cómo puedo ayudarte?",
      send: "Enviar Mensaje",
      sending: "Enviando…",
      sendError: "Hubo un error al enviar el mensaje. Inténtalo de nuevo.",
      successTitle: "¡Mensaje enviado con éxito!",
      successBody: "Te responderé lo más pronto posible.",
      findMeAt: "También puedes encontrarme en:",
      mainNav: "Navegación principal",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      detailedView: "Vista Detallada",
      summaryView: "Vista Resumida",
      seeDetailed: "Ver vista detallada",
      backToSummary: "Volver a vista resumida",
      prevSection: "Sección anterior",
      nextSection: "Sección siguiente",
      sectionNav: "Navegación entre secciones",
      lightMode: "Modo Claro",
      darkMode: "Modo Oscuro",
      toLightMode: "Cambiar a modo claro",
      toDarkMode: "Cambiar a modo oscuro",
      themeFollows: (mode) => `Modo ${mode}, siguiendo al navegador`,
      themePinned: (mode) => `Modo ${mode} fijado — volvé a cambiarlo para seguir al navegador`,
      themeLight: "claro",
      themeDark: "oscuro",
      switchToEnglish: "Switch to English",
      switchToSpanish: "Cambiar a español",
      langFollows: "Idioma siguiendo al navegador",
    },

    nav: {
      about: "Sobre Mí",
      experience: "Experiencia",
      projects: "Proyectos",
      contact: "Contacto",
    },

    sections: {
      about: { title: "Sobre Mí", expand: "Ver más intereses y setup" },
      experience: {
        title: "Experiencia y Habilidades",
        expand: "Ver todas las responsabilidades y tecnologías",
      },
      projects: { title: "Proyectos Destacados", expand: "Ver fichas técnicas completas" },
      contact: { title: "Contacto" },
    },

    profile: {
      role: "Software Engineer",
      location: "Ambato, Ecuador",
      nationality: "Cubana/Española",
      bioShort: [
        "Desarrolladora de software centrada en el backend. Construyo APIs y servicios con **Spring Boot**, **NestJS** y Node.js, modelo bases de datos relacionales y despliego con **Docker**.",
        "También trabajo el lado full-stack y la infraestructura cloud. Me mueve la arquitectura limpia y las buenas prácticas: pruebas, contenedores y código que otros puedan mantener.",
      ],
      bioExtra: [
        "Mantengo mi propia infraestructura en Oracle Cloud, donde despliego y administro mis proyectos de forma autónoma.",
      ],
    },

    experience: [
      {
        role: "Desarrolladora Junior",
        date: "Febrero 2026 - Presente",
        description:
          "Servicios backend con **Spring Boot**, modelado y optimización de bases de datos en **PostgreSQL**, y contenedorización y despliegue con **Docker**.",
      },
    ],

    projects: {
      kaphiy: {
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
      },
      contable: {
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
      },
      gasoline: {
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
      },
      safetrade: {
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
      },
      booking: {
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
      },
    },

    setup: [
      {
        title: "Estación de trabajo",
        specs: [
          ["Equipo", "Acer Nitro 5"],
          ["Procesador", "Intel Core i5"],
          ["Gráficos", "NVIDIA GeForce RTX 3050 Ti"],
          ["Memoria", "16 GB DDR4"],
          ["Almacenamiento", "512 GB SSD NVMe"],
        ],
      },
      {
        title: "Entorno de desarrollo",
        specs: [
          ["Sistemas", "Dual boot: Windows 11 y Ubuntu para desarrollo."],
          [
            "Contenedores",
            "Docker y Docker Compose para reproducir en local los entornos de despliegue.",
          ],
        ],
      },
    ],

    hobbies: [
      {
        title: "Open source",
        detail: "Pequeñas librerías y scripts de automatización en Python y Node.js.",
      },
      { title: "Idiomas", detail: "Inglés de nivel B2 y primeros pasos con el **francés**." },
      { title: "Lógica y estrategia", detail: "Ajedrez y videojuegos de estrategia en tiempo real." },
    ],

    languages: [
      { key: "es", name: "Español", label: "Nativo / Lengua Materna" },
      { key: "en", name: "Inglés", label: "B2 First (Cambridge), Grade B" },
      { key: "fr", name: "Francés", label: "En Aprendizaje (Iniciado)" },
    ],

    certifications: [
      {
        title: "B2 First (FCE) — Grade B",
        issuer: "Cambridge Assessment English · 2021",
        detail: "Certificación oficial de inglés de nivel B2, con validez permanente.",
      },
      {
        title: "Diseño y Monitoreo IoT para Sistemas Energéticos con ESP32",
        issuer: "Centro de Transferencia y Desarrollo de Tecnologías, FISEI – UTA · diciembre 2025",
        detail:
          "32 horas de formación en instrumentación, adquisición de datos y monitoreo con microcontroladores ESP32.",
      },
      {
        title: "Data Fundamentals",
        issuer: "IBM SkillsBuild · julio 2025",
        detail: "Fundamentos de análisis de datos, conceptos de ETL y visualización.",
      },
      {
        title: "Network Support and Security",
        issuer: "Cisco Networking Academy · diciembre 2024",
        detail: "Soporte de redes, diagnóstico de conectividad y principios de seguridad.",
      },
      {
        title: "Introduction to Internet of Things",
        issuer: "Cisco Networking Academy · junio 2024",
        detail: "Arquitecturas IoT, sensores y comunicación entre dispositivos conectados.",
      },
      {
        title: "Business Intelligence con Power BI",
        issuer: "Formación complementaria",
        detail:
          "Modelado de datos, informes y cuadros de mando. Insignias verificables en credly.com/users/dayle-garcia.",
      },
    ],
  },

  /* ────────────────────────────── ENGLISH ────────────────────────────── */
  en: {
    ui: {
      downloadCv: "Download CV",
      cvChoose: "Choose the CV language",
      cvSpanish: "CV in Spanish",
      cvEnglish: "CV in English",
      residence: "Based in:",
      nationality: (value) => `(Nationality: ${value})`,
      hardwareSetup: "My Hardware Setup",
      hobbies: "Hobbies & Interests",
      techStack: "Technologies & Tools",
      languagesTitle: "Languages",
      certifications: "Certifications & Courses",
      projectsIntro:
        "Technical breakdowns: architecture, stack and my contribution to each project.",
      systemDescription: "System Overview",
      techSheet: "Tech Sheet",
      mainLanguage: "Main language",
      myRole: "My role",
      repository: "Repository",
      goToProject: "Jump to a project",
      contactIntro:
        "Got a project in mind, or just want to say hello? Don't hesitate to write to me!",
      formName: "Your name",
      formNamePlaceholder: "Your Name",
      formEmail: "Your email address",
      formEmailPlaceholder: "Your Email Address",
      formMessage: "Your message",
      formMessagePlaceholder: "How can I help you?",
      send: "Send Message",
      sending: "Sending…",
      sendError: "Something went wrong sending your message. Please try again.",
      successTitle: "Message sent successfully!",
      successBody: "I'll get back to you as soon as I can.",
      findMeAt: "You can also find me on:",
      mainNav: "Main navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      detailedView: "Detailed View",
      summaryView: "Summary View",
      seeDetailed: "Switch to detailed view",
      backToSummary: "Back to summary view",
      prevSection: "Previous section",
      nextSection: "Next section",
      sectionNav: "Section navigation",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      toLightMode: "Switch to light mode",
      toDarkMode: "Switch to dark mode",
      themeFollows: (mode) => `${mode} mode, following your browser`,
      themePinned: (mode) => `${mode} mode pinned — switch again to follow your browser`,
      themeLight: "Light",
      themeDark: "Dark",
      switchToEnglish: "Switch to English",
      switchToSpanish: "Cambiar a español",
      langFollows: "Language following your browser",
    },

    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
    },

    sections: {
      about: { title: "About Me", expand: "See more interests and setup" },
      experience: {
        title: "Experience & Skills",
        expand: "See all responsibilities and technologies",
      },
      projects: { title: "Featured Projects", expand: "See full technical breakdowns" },
      contact: { title: "Contact" },
    },

    profile: {
      role: "Software Engineer",
      location: "Ambato, Ecuador",
      nationality: "Cuban/Spanish",
      bioShort: [
        "Backend-focused software developer. I build APIs and services with **Spring Boot**, **NestJS** and Node.js, model relational databases and deploy with **Docker**.",
        "I also work across the full stack and on cloud infrastructure. I care about clean architecture and good practice: tests, containers and code other people can maintain.",
      ],
      bioExtra: [
        "I run my own infrastructure on Oracle Cloud, where I deploy and manage my projects myself.",
      ],
    },

    experience: [
      {
        role: "Junior Developer",
        date: "February 2026 - Present",
        description:
          "Backend services with **Spring Boot**, database modelling and optimisation in **PostgreSQL**, and containerisation and deployment with **Docker**.",
      },
    ],

    projects: {
      kaphiy: {
        title: "KAPHIY",
        subtitle: "Order automation ecosystem with a conversational agent",
        short: "KAPHIY",
        summary:
          "Ordering for a real coffee shop: PWA with a conversational agent, live kitchen board and integrated accounting.",
        description: [
          "A complete ecosystem for a real coffee shop, built on a NestJS and PostgreSQL backend. Diners order from a PWA by chatting with an agent powered by the Gemini API, which interprets natural language and assembles the order; the kitchen receives it instantly on a live board over WebSocket, and every sale is pushed into the client's accounting ERP so nothing is keyed in twice.",
          "It runs in production, backed by 165 automated tests and a GitHub Actions CI/CD pipeline that validates every change before it reaches the business that depends on it daily.",
        ],
        role: "Backend development: data modelling with Prisma, the API and ordering logic, the real-time channel, and the integration with the conversational agent.",
      },
      contable: {
        title: "Integrated Administrative Accounting System",
        subtitle: "Miñarica Drinking Water Board",
        short: "Accounting",
        summary:
          "Electronic invoicing (Ecuadorian tax authority) and a full accounting engine for a community water board.",
        description: [
          "A university outreach project (UTA) to digitise a drinking water board that was doing its invoicing and bookkeeping by hand. It solves two worlds at once: electronic invoicing compliant with the Ecuadorian tax authority —issuing, authorisation, sequence numbers— and a genuine accounting engine, with a chart of accounts, journal entries, a general ledger and period closing.",
          "The interesting part is the internal controls: every invoice generates its journal entry inside a Prisma transaction —either everything is saved or nothing is—, closing a period validates that debits and credits balance before locking it, and the whole thing runs under role-based access control with JWT and an audit trail. It's the project that taught me the most about translating the rules of a domain outside my own —accounting— into validations the code can guarantee.",
        ],
        role: "Backend development of the accounting module and the internal control mechanisms (roles, auditing, period closing), plus the system's technical documentation.",
      },
      gasoline: {
        title: "Gasoline System",
        subtitle: "Distributed fuel consumption control system",
        short: "Gasoline",
        summary: "Microservices with an API Gateway, gRPC for synchronous calls and NATS for events.",
        description: [
          "Fuel consumption control for a vehicle fleet, designed as independent microservices —authentication, drivers, vehicles, routes and fuel—, each with its own database and container, behind a single API Gateway.",
          "Communication takes two paths depending on the need: gRPC when one service needs an immediate answer from another, and NATS events when it's enough to notify without blocking the sender. This is where I understood in practice what distribution really costs: consistency across separate databases and handling partial failures.",
        ],
        role: "Microservice development, defining the gRPC contracts, and publishing/consuming NATS events.",
      },
      safetrade: {
        title: "SafeTrade",
        subtitle: "Marketplace for products and services",
        short: "SafeTrade",
        summary: "Marketplace with listing moderation, containerised and deployed to Azure with CI/CD.",
        description: [
          "A marketplace where users publish products and services and can report listings, with a moderation flow behind it. NestJS + Prisma + PostgreSQL on the backend and React + Vite on the frontend.",
          "The focus was as much on the app as on how it reaches production: multi-stage Docker images, deployment to Azure App Service and Static Web Apps, and a GitHub Actions pipeline that builds, tests and deploys on every push. My first serious encounter with the idea that deployment is part of development, not a step that comes after it.",
        ],
        role: "Backend, plus setting up the containerisation and the CI/CD pipeline.",
      },
      booking: {
        title: "Booking View",
        subtitle: "Web and mobile property booking platform",
        short: "Booking",
        summary: "Property booking with web and mobile apps, Stripe payments and push notifications.",
        description: [
          "Property booking with two distinct profiles: the owner who lists and manages their properties, and the guest who searches, books and pays. A single REST API on Node.js + Express + MongoDB feeds both the web app (React) and the mobile one (React Native with Expo).",
          "It includes availability validation to prevent overlapping bookings, Stripe payments, sessions with Clerk, and push notifications for new bookings and status changes.",
        ],
        role: "Development of the REST API and the React Native mobile app.",
      },
    },

    setup: [
      {
        title: "Workstation",
        specs: [
          ["Machine", "Acer Nitro 5"],
          ["Processor", "Intel Core i5"],
          ["Graphics", "NVIDIA GeForce RTX 3050 Ti"],
          ["Memory", "16 GB DDR4"],
          ["Storage", "512 GB NVMe SSD"],
        ],
      },
      {
        title: "Development environment",
        specs: [
          ["Systems", "Dual boot: Windows 11 and Ubuntu for development."],
          ["Containers", "Docker and Docker Compose to reproduce deployment environments locally."],
        ],
      },
    ],

    hobbies: [
      {
        title: "Open source",
        detail: "Small libraries and automation scripts in Python and Node.js.",
      },
      { title: "Languages", detail: "English at B2 level and first steps with **French**." },
      { title: "Logic and strategy", detail: "Chess and real-time strategy games." },
    ],

    languages: [
      { key: "es", name: "Spanish", label: "Native" },
      { key: "en", name: "English", label: "B2 First (Cambridge), Grade B" },
      { key: "fr", name: "French", label: "Currently learning (beginner)" },
    ],

    certifications: [
      {
        title: "B2 First (FCE) — Grade B",
        issuer: "Cambridge Assessment English · 2021",
        detail: "Official B2-level English certification, valid for life.",
      },
      {
        title: "IoT Design and Monitoring for Energy Systems with ESP32",
        issuer: "Technology Transfer and Development Centre, FISEI – UTA · December 2025",
        detail:
          "32 hours of training in instrumentation, data acquisition and monitoring with ESP32 microcontrollers.",
      },
      {
        title: "Data Fundamentals",
        issuer: "IBM SkillsBuild · July 2025",
        detail: "Data analysis fundamentals, ETL concepts and visualisation.",
      },
      {
        title: "Network Support and Security",
        issuer: "Cisco Networking Academy · December 2024",
        detail: "Network support, connectivity troubleshooting and security principles.",
      },
      {
        title: "Introduction to Internet of Things",
        issuer: "Cisco Networking Academy · June 2024",
        detail: "IoT architectures, sensors and communication between connected devices.",
      },
      {
        title: "Business Intelligence with Power BI",
        issuer: "Additional training",
        detail:
          "Data modelling, reports and dashboards. Verifiable badges at credly.com/users/dayle-garcia.",
      },
    ],
  },
};

export default copy;
