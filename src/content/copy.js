/**
 * TODO el texto traducible del sitio, en los dos idiomas.
 *
 * Aquí sólo vive lo que cambia de un idioma a otro. Lo estructural —rutas,
 * repos, stack, iconos, cifras, posiciones de los diagramas— está en su archivo
 * de `src/content/` y se une con esto en `src/lib/useContent.js`, por clave.
 *
 * Fuente de los hechos: el CV (`public/Dayle-Garcia-Fernandez-CV-*.pdf`).
 * Las marcas `**negrita**` las interpreta `lib/RichText.jsx`.
 */
export const copy = {
  /* ────────────────────────────── ESPAÑOL ────────────────────────────── */
  es: {
    meta: {
      title: "Daylé García Fernández · Software Engineer",
      description:
        "Software Engineer: microservicios en Java y Spring Boot, APIs REST, PostgreSQL y pruebas con Mockito. Sistemas completos en producción con NestJS y Next.js. Ciudadanía UE.",
    },

    ui: {
      skipToContent: "Saltar al contenido",
      mainNav: "Secciones",
      downloadCv: "Descargar CV",
      cvChoose: "Elige el idioma del CV",
      cvSpanish: "CV en español",
      cvEnglish: "CV en inglés",
      toLightMode: "Cambiar a modo claro",
      toDarkMode: "Cambiar a modo oscuro",
      themeFollows: (mode) => `Modo ${mode}, siguiendo al navegador`,
      themePinned: (mode) => `Modo ${mode} fijado. Vuelve a cambiarlo para seguir al navegador`,
      themeLight: "claro",
      themeDark: "oscuro",
      switchLang: "Read in English",
      inProduction: "En producción",
      privateCode: "Código privado",
      sourceCode: "Código",
      caseStudy: "Ver caso de estudio",
      otherProjects: "Otros proyectos",
      architecture: "Arquitectura",
      sync: "síncrono",
      async: "asíncrono",
      backHome: "Volver al portafolio",
      theSystem: "El sistema",
      decisions: "Decisiones técnicas",
      myRole: "Mi rol",
      stack: "Stack",
      nextProject: "Siguiente proyecto",
      currentRole: "Actual",
      roleStack: "Stack del puesto",
      education: "Formación",
      coursework: "Asignaturas relevantes",
      certifications: "Certificaciones",
      languages: "Idiomas",
      emailMe: "Escríbeme",
      copyEmail: "Copiar correo",
      copied: "Copiado",
      orForm: "O déjame un mensaje aquí:",
      formName: "Nombre",
      formEmail: "Correo electrónico",
      formMessage: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando…",
      sendError: "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme al correo.",
      successTitle: "Mensaje enviado",
      successBody: "Gracias. Te responderé lo antes posible.",
      footer: "Diseñado y construido por Daylé García con Next.js. Exportado en estático.",
    },

    nav: {
      projects: "Proyectos",
      experience: "Experiencia",
      stack: "Stack",
      about: "Sobre mí",
      contact: "Contacto",
    },

    sections: {
      projects: {
        title: "Proyectos",
        intro:
          "Tres sistemas que muestran cómo trabajo: uno en producción, uno distribuido y uno con reglas de negocio estrictas.",
      },
      experience: { title: "Experiencia" },
      stack: {
        title: "Stack",
        intro: "Agrupado por capa, con dónde lo he usado de verdad.",
      },
      about: { title: "Sobre mí" },
      contact: {
        title: "Contacto",
        intro:
          "Si buscas a alguien para tu equipo o quieres hablar de un proyecto, escríbeme.",
      },
    },

    profile: {
      /* Título de rol, no de grado: va en inglés también aquí porque en español
         "Ingeniera de Software" se lee como el título universitario. */
      role: "Software Engineer",
      pitch:
        "Construyo software de punta a punta: microservicios en Java y Spring Boot, APIs REST, datos en PostgreSQL y pruebas que mantienen la cobertura por encima del 95%.",
      location: "Ambato, Ecuador",
      citizenship: "Ciudadanía española (UE), sin necesidad de visado",
      summary: [
        "Desarrollo software con foco en Java y Spring Boot. En **Alquimiasoft** construyo microservicios (APIs REST, lógica de negocio y persistencia en PostgreSQL), los documento con Swagger/OpenAPI y los cubro con pruebas en Mockito, dentro de un equipo Scrum.",
        "Fuera del trabajo construyo sistemas completos con NestJS y Next.js; uno de ellos, **KAPHIY**, está en producción en una cafetería real. Lo que más me interesa es lo que pasa entre el código y producción: pruebas, contenedores, CI/CD y código que otros puedan mantener.",
      ],
    },

    experience: [
      {
        id: "alquimiasoft",
        role: "Desarrolladora Backend",
        location: "Ambato, Ecuador",
        date: "Feb 2026 – Actualidad",
        bullets: [
          "Desarrollo y mantenimiento de **microservicios en Java/Spring Boot**: APIs REST, lógica de negocio y persistencia en PostgreSQL.",
          "Entrega de **más de 10 módulos CRUD** en el API principal, incluido el de facturación y endpoints de utilidad para otros equipos.",
          "Extensión y soporte de aplicaciones **legacy en Spring MVC**, añadiendo funcionalidades y corrigiendo defectos en código heredado.",
          "Documentación de las APIs con Swagger/OpenAPI y pruebas unitarias en Mockito, manteniendo **más del 95% de cobertura**.",
          "Contenerización con Docker, Git/GitHub con ramas, PRs y code review, e interfaces en Flutter que consumen el backend, en un equipo Scrum sobre Jira.",
        ],
      },
    ],

    projects: {
      kaphiy: {
        title: "KAPHIY",
        subtitle: "Plataforma de automatización de pedidos con IA conversacional",
        summary:
          "Sistema de pedidos en producción para una cafetería: PWA con un agente de IA, panel de cocina en tiempo real e integración con el ERP contable del cliente.",
        description: [
          "El comensal pide desde una PWA conversando con un agente basado en la API de Gemini, que interpreta lenguaje natural y arma el pedido. La cocina lo recibe al instante en un panel en tiempo real por WebSocket, y cada venta se integra con el ERP contable del cliente para no duplicar datos.",
          "Está en producción, sostenido por 165 pruebas automatizadas y un pipeline de CI/CD en GitHub Actions que valida cada cambio antes de llegar a un negocio que depende de él a diario. Eso marcó las decisiones técnicas: contratos claros entre módulos, pruebas antes de fusionar y despliegues repetibles con Docker.",
        ],
        role: "Backend: modelado de datos con Prisma, API y lógica de pedidos, canal de tiempo real e integración con el agente conversacional.",
        metrics: { tests: "pruebas automatizadas", integrations: "integraciones: IA, tiempo real y ERP" },
        nodes: {
          pwa: "PWA cliente",
          agent: "Agente IA",
          kitchen: "Panel de cocina",
          erp: "ERP contable",
        },
      },
      gasoline: {
        title: "Gasoline System",
        subtitle: "Plataforma distribuida de control de combustible",
        summary:
          "Microservicios tras un API Gateway, con gRPC para las llamadas síncronas y eventos NATS para lo asíncrono; cada servicio en su propio contenedor.",
        description: [
          "Control del consumo de combustible de una flota, diseñado como microservicios independientes (autenticación, conductores, vehículos, rutas y combustible), cada uno con su base de datos y su contenedor, detrás de un único API Gateway.",
          "La comunicación va por dos caminos según lo que se necesita: gRPC cuando un servicio necesita la respuesta de otro al momento, y eventos por NATS cuando basta con avisar sin bloquear al emisor. Fue donde entendí en la práctica lo que cuesta distribuir: consistencia entre bases separadas y fallos parciales.",
        ],
        role: "Microservicios, contratos gRPC y publicación y consumo de eventos NATS.",
        metrics: { services: "microservicios independientes", protocols: "síncrono y asíncrono" },
        nodes: {
          client: "Cliente web",
          auth: "Autenticación",
          drivers: "Conductores",
          vehicles: "Vehículos",
          routes: "Rutas",
          fuel: "Combustible",
        },
      },
      contable: {
        title: "Sistema contable para la Junta de Agua de Miñarica",
        subtitle: "Facturación y contabilidad por partida doble",
        summary:
          "Backend de facturación electrónica conforme al SRI y contabilidad por partida doble para una junta comunitaria de agua potable.",
        description: [
          "Proyecto de vinculación (DIVISO, UTA) para digitalizar una junta de agua potable que llevaba su facturación y su contabilidad a mano. Resuelve dos mundos a la vez: facturación electrónica conforme al SRI y un motor contable de verdad, con plan de cuentas, asientos, libro diario y cierre de periodos.",
          "Lo interesante está en los controles internos: cada factura genera su asiento dentro de una transacción (o se guarda todo, o nada), el cierre valida que debe y haber cuadren antes de bloquear el periodo, y todo corre con control de acceso por roles y una bitácora de auditoría completa. Es el proyecto que más me enseñó a traducir las reglas de un dominio ajeno, la contabilidad, a validaciones que el código garantiza.",
        ],
        role: "Backend del módulo contable y de los controles internos (roles, auditoría, cierre de periodos), además de la documentación técnica.",
        metrics: {
          entries: { value: "debe = haber", label: "validado al cerrar cada periodo" },
          compliance: "facturación electrónica conforme",
        },
        nodes: {
          web: "Panel web",
          billing: "Facturación",
          ledger: "Partida doble",
          audit: "Auditoría",
        },
      },
      safetrade: {
        title: "SafeTrade",
        subtitle: "Marketplace de productos y servicios",
        summary:
          "Marketplace con moderación de publicaciones, contenerizado y desplegado en Azure con CI/CD.",
        description: [
          "Marketplace donde los usuarios publican productos y servicios y pueden reportar publicaciones, con un flujo de moderación detrás. Backend en NestJS + Prisma + PostgreSQL y frontend en React.",
          "El foco estuvo tanto en la aplicación como en cómo llega a producción: imágenes Docker multi-stage, despliegue en Azure App Service y un pipeline de GitHub Actions que construye, prueba y despliega en cada push.",
        ],
        role: "Backend y configuración de la contenerización y el pipeline de CI/CD.",
      },
      booking: {
        title: "Booking View",
        subtitle: "Reserva de inmuebles, web y móvil",
        summary: "Una API REST que alimenta la app web y la móvil, con pagos en Stripe y notificaciones push.",
        description: [
          "Reserva de inmuebles con dos perfiles: el propietario que publica y administra sus propiedades y el huésped que busca, reserva y paga. Una sola API REST en Node.js + Express + MongoDB alimenta la app web (React) y la móvil (React Native).",
          "Incluye validación de disponibilidad para evitar reservas solapadas, pagos con Stripe, sesiones con Clerk y notificaciones push para nuevas reservas y cambios de estado.",
        ],
        role: "API REST y aplicación móvil en React Native.",
      },
    },

    skills: {
      backend: {
        title: "Backend",
        proof: "Más de 10 módulos CRUD entregados en el API principal de Alquimiasoft, incluida la facturación.",
      },
      data: {
        title: "Bases de datos",
        proof: "Modelado relacional y transacciones: asientos contables que se guardan enteros o no se guardan.",
      },
      devops: {
        title: "Pruebas y DevOps",
        proof: "Más del 95% de cobertura con Mockito. Imágenes Docker y pipelines en GitHub Actions.",
      },
      node: {
        title: "Otro backend",
        proof: "Microservicios con gRPC y eventos NATS; tiempo real con Socket.IO.",
      },
      frontend: {
        title: "Frontend y móvil",
        proof: "Interfaces en Flutter que consumen el backend, y los frontends de mis proyectos.",
      },
    },

    education: {
      degree: "Ingeniería en Software",
      school: "Universidad Técnica de Ambato (UTA)",
      coursework:
        "Patrones de Diseño de Software, Aplicaciones Orientadas a Servicios, Bases de Datos, POO, Redes.",
    },

    certifications: [
      {
        title: "Cambridge B2 First (FCE), calificación B",
        issuer: "Cambridge Assessment English · 2021",
      },
      {
        title: "Diseño y Monitoreo de IoT para Sistemas de Energía con ESP32 (32 h)",
        issuer: "FISEI – UTA · 2025",
      },
      { title: "Soporte y Seguridad de Redes", issuer: "Cisco Networking Academy · 2024" },
      {
        title: "Business Intelligence: Power BI, análisis de datos y ETL",
        issuer: "Credly",
        url: "https://www.credly.com/users/dayle-garcia",
      },
    ],

    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "B2 · Cambridge B2 First" },
    ],
  },

  /* ────────────────────────────── ENGLISH ────────────────────────────── */
  en: {
    meta: {
      title: "Daylé García Fernández · Software Engineer",
      description:
        "Software Engineer: Java and Spring Boot microservices, REST APIs, PostgreSQL and Mockito testing. Complete systems in production with NestJS and Next.js. EU citizen.",
    },

    ui: {
      skipToContent: "Skip to content",
      mainNav: "Sections",
      downloadCv: "Download CV",
      cvChoose: "Choose the CV language",
      cvSpanish: "CV in Spanish",
      cvEnglish: "CV in English",
      toLightMode: "Switch to light mode",
      toDarkMode: "Switch to dark mode",
      themeFollows: (mode) => `${mode} mode, following your browser`,
      themePinned: (mode) => `${mode} mode pinned. Switch again to follow your browser`,
      themeLight: "Light",
      themeDark: "Dark",
      switchLang: "Leer en español",
      inProduction: "In production",
      privateCode: "Private code",
      sourceCode: "Code",
      caseStudy: "Read case study",
      otherProjects: "Other projects",
      architecture: "Architecture",
      sync: "sync",
      async: "async",
      backHome: "Back to portfolio",
      theSystem: "The system",
      decisions: "Technical decisions",
      myRole: "My role",
      stack: "Stack",
      nextProject: "Next project",
      currentRole: "Current",
      roleStack: "Stack used",
      education: "Education",
      coursework: "Relevant coursework",
      certifications: "Certifications",
      languages: "Languages",
      emailMe: "Email me",
      copyEmail: "Copy email",
      copied: "Copied",
      orForm: "Or leave me a message here:",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      send: "Send message",
      sending: "Sending…",
      sendError: "The message couldn't be sent. Please try again or email me directly.",
      successTitle: "Message sent",
      successBody: "Thank you. I'll get back to you as soon as I can.",
      footer: "Designed and built by Daylé García with Next.js. Statically exported.",
    },

    nav: {
      projects: "Projects",
      experience: "Experience",
      stack: "Stack",
      about: "About",
      contact: "Contact",
    },

    sections: {
      projects: {
        title: "Projects",
        intro:
          "Three systems that show how I work: one in production, one distributed, and one with strict business rules.",
      },
      experience: { title: "Experience" },
      stack: {
        title: "Stack",
        intro: "Grouped by layer, with where I've actually used it.",
      },
      about: { title: "About" },
      contact: {
        title: "Contact",
        intro: "If you're looking for someone for your team or want to talk about a project, get in touch.",
      },
    },

    profile: {
      role: "Software Engineer",
      pitch:
        "I build software end to end: Java and Spring Boot microservices, REST APIs, PostgreSQL data and tests that keep coverage above 95%.",
      location: "Ambato, Ecuador",
      citizenship: "Spanish (EU) citizen, no visa sponsorship required",
      summary: [
        "Software engineer focused on Java and Spring Boot. At **Alquimiasoft** I build microservices (REST APIs, business logic and PostgreSQL persistence), document them with Swagger/OpenAPI and cover them with Mockito tests, as part of a Scrum team.",
        "Outside work I build complete systems with NestJS and Next.js; one of them, **KAPHIY**, runs in production at a real coffee shop. What interests me most is what happens between the code and production: tests, containers, CI/CD and code other people can maintain.",
      ],
    },

    experience: [
      {
        id: "alquimiasoft",
        role: "Backend Software Developer",
        location: "Ambato, Ecuador",
        date: "Feb 2026 – Present",
        bullets: [
          "Build and maintain **Java/Spring Boot microservices**: REST APIs, business logic and PostgreSQL persistence.",
          "Delivered **10+ CRUD modules** in the main API service, including the invoicing module and shared utility endpoints for other teams.",
          "Extend and support **legacy Spring MVC** applications, adding features and fixing defects in inherited code.",
          "Document APIs with Swagger/OpenAPI and cover features with Mockito unit tests, consistently keeping **95%+ code coverage**.",
          "Containerize services with Docker, work in Git/GitHub with branches, PRs and code review, and build Flutter UIs consuming the backend, in a Scrum team on Jira.",
        ],
      },
    ],

    projects: {
      kaphiy: {
        title: "KAPHIY",
        subtitle: "Order automation platform with conversational AI",
        summary:
          "Production ordering system for a coffee shop: a customer PWA with an AI agent, a real-time kitchen board and integration with the client's accounting ERP.",
        description: [
          "Customers order from a PWA by chatting with an agent built on the Gemini API, which interprets natural language and assembles the order. The kitchen receives it instantly on a real-time board over WebSocket, and every sale is pushed into the client's accounting ERP so nothing is keyed in twice.",
          "It runs in production, backed by 165 automated tests and a GitHub Actions CI/CD pipeline that validates every change before it reaches a business that depends on it daily. That shaped the technical decisions: clear contracts between modules, tests before merging and repeatable Docker deployments.",
        ],
        role: "Backend: data modelling with Prisma, the API and ordering logic, the real-time channel and the integration with the conversational agent.",
        metrics: { tests: "automated tests", integrations: "integrations: AI, real time and ERP" },
        nodes: {
          pwa: "Customer PWA",
          agent: "AI agent",
          kitchen: "Kitchen board",
          erp: "Accounting ERP",
        },
      },
      gasoline: {
        title: "Gasoline System",
        subtitle: "Distributed fuel-control platform",
        summary:
          "Microservices behind an API Gateway, with gRPC for synchronous calls and NATS events for asynchronous ones; each service in its own container.",
        description: [
          "Fuel consumption control for a vehicle fleet, designed as independent microservices (authentication, drivers, vehicles, routes and fuel), each with its own database and container, behind a single API Gateway.",
          "Communication takes two paths depending on the need: gRPC when a service needs another's answer right away, and NATS events when it's enough to notify without blocking the sender. It's where I learned in practice what distribution costs: consistency across separate databases and partial failures.",
        ],
        role: "Microservices, gRPC contracts, and publishing and consuming NATS events.",
        metrics: { services: "independent microservices", protocols: "sync and async" },
        nodes: {
          client: "Web client",
          auth: "Auth",
          drivers: "Drivers",
          vehicles: "Vehicles",
          routes: "Routes",
          fuel: "Fuel",
        },
      },
      contable: {
        title: "Accounting System for the Miñarica Water Board",
        subtitle: "Billing and double-entry accounting",
        summary:
          "Backend for SRI-compliant e-invoicing and double-entry accounting for a community drinking-water board.",
        description: [
          "A university outreach project (DIVISO, UTA) to digitise a drinking-water board that did its billing and bookkeeping by hand. It solves two worlds at once: e-invoicing compliant with Ecuador's tax authority (SRI) and a genuine accounting engine, with a chart of accounts, journal entries, a general ledger and period closing.",
          "The interesting part is the internal controls: every invoice creates its journal entry inside a transaction (everything is saved or nothing is), closing a period checks that debits equal credits before locking it, and everything runs under role-based access control with a full audit log. It's the project that taught me most about turning the rules of an unfamiliar domain, accounting, into validations the code guarantees.",
        ],
        role: "Backend for the accounting module and the internal controls (roles, auditing, period closing), plus the technical documentation.",
        metrics: {
          entries: { value: "debit = credit", label: "checked before each period closes" },
          compliance: "compliant e-invoicing",
        },
        nodes: {
          web: "Web app",
          billing: "Invoicing",
          ledger: "Double entry",
          audit: "Audit log",
        },
      },
      safetrade: {
        title: "SafeTrade",
        subtitle: "Marketplace for products and services",
        summary: "Marketplace with listing moderation, containerised and deployed to Azure with CI/CD.",
        description: [
          "A marketplace where users publish products and services and can report listings, with a moderation flow behind it. NestJS + Prisma + PostgreSQL on the backend and React on the frontend.",
          "The focus was as much on the app as on how it reaches production: multi-stage Docker images, deployment to Azure App Service and a GitHub Actions pipeline that builds, tests and deploys on every push.",
        ],
        role: "Backend, plus the containerisation and CI/CD pipeline.",
      },
      booking: {
        title: "Booking View",
        subtitle: "Property booking, web and mobile",
        summary: "One REST API feeding both the web and mobile apps, with Stripe payments and push notifications.",
        description: [
          "Property booking with two profiles: the owner who lists and manages properties, and the guest who searches, books and pays. A single REST API on Node.js + Express + MongoDB feeds the web app (React) and the mobile one (React Native).",
          "It includes availability checks to prevent overlapping bookings, Stripe payments, sessions with Clerk and push notifications for new bookings and status changes.",
        ],
        role: "REST API and the React Native mobile app.",
      },
    },

    skills: {
      backend: {
        title: "Backend",
        proof: "10+ CRUD modules delivered in Alquimiasoft's main API service, including invoicing.",
      },
      data: {
        title: "Databases",
        proof: "Relational modelling and transactions: journal entries that are saved whole or not at all.",
      },
      devops: {
        title: "Testing & DevOps",
        proof: "95%+ coverage with Mockito. Docker images and GitHub Actions pipelines.",
      },
      node: {
        title: "Other backend",
        proof: "Microservices over gRPC and NATS events; real time with Socket.IO.",
      },
      frontend: {
        title: "Frontend & mobile",
        proof: "Flutter UIs consuming the backend, and the frontends of my own projects.",
      },
    },

    education: {
      degree: "Software Engineering",
      school: "Universidad Técnica de Ambato (UTA)",
      coursework:
        "Software Design Patterns, Service-Oriented Applications, Databases, OOP, Computer Networks.",
    },

    certifications: [
      {
        title: "Cambridge B2 First (FCE), Grade B",
        issuer: "Cambridge Assessment English · 2021",
      },
      {
        title: "IoT Design & Monitoring for Energy Systems with ESP32 (32 h)",
        issuer: "FISEI – UTA · 2025",
      },
      { title: "Network Support and Security", issuer: "Cisco Networking Academy · 2024" },
      {
        title: "Business Intelligence: Power BI, data analysis and ETL",
        issuer: "Credly",
        url: "https://www.credly.com/users/dayle-garcia",
      },
    ],

    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "B2 · Cambridge B2 First" },
    ],
  },
};

export default copy;
