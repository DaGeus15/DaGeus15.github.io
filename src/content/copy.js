/**
 * TODO el texto traducible del sitio, en los dos idiomas.
 *
 * Aquí sólo vive lo que cambia de un idioma a otro. Lo estructural —rutas,
 * repos, stack, iconos, cifras, capturas, posiciones de los diagramas— está en
 * su archivo de `src/content/` y se une con esto en `src/lib/content.js`, por
 * clave.
 *
 * Fuente de los hechos: el CV (`public/Dayle-Garcia-Fernandez-CV-*.pdf`) y los
 * informes de cada proyecto. Las marcas `**negrita**` y `` `código` `` las
 * interpreta `lib/RichText.jsx`.
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
      home: "Inicio",
      downloadCv: "Descargar CV",
      cvShort: "CV",
      cvChoose: "Elige el idioma del CV",
      cvSpanish: "CV en español",
      cvEnglish: "CV en inglés",
      contactCta: "Contacto",
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
      architecture: "Arquitectura",
      sync: "síncrono",
      async: "asíncrono",
      backHome: "Volver",
      backHomeLong: "Volver al portafolio",
      theSystem: "El sistema",
      decisions: "Decisiones técnicas",
      features: "Qué hace",
      challenge: "Un reto concreto",
      gallery: "Capturas",
      myRole: "Mi parte",
      scope: "Alcance",
      stack: "Stack",
      year: "Año",
      context: "Contexto",
      team: "Equipo",
      teamOf: (n) => `${n} personas`,
      code: "Código",
      nextProject: "Siguiente proyecto",
      openShot: (caption) => `Ampliar captura: ${caption}`,
      closeShot: "Cerrar",
      prevShot: "Captura anterior",
      nextShot: "Captura siguiente",
      currentRole: "Actual",
      roleStack: "Stack del puesto",
      education: "Formación",
      coursework: "Asignaturas relevantes",
      certifications: "Certificaciones",
      languages: "Idiomas",
      emailMe: "Escríbeme",
      copyEmail: "Copiar correo",
      copied: "Copiado",
      orForm: "O déjame un mensaje aquí",
      formName: "Nombre",
      formEmail: "Correo electrónico",
      formMessage: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando…",
      sendError: "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme al correo.",
      successTitle: "Mensaje enviado",
      successBody: "Gracias. Te responderé lo antes posible.",
      footer: "Diseñado y construido por Daylé García con Next.js y OGL. Exportado en estático.",
    },

    nav: {
      projects: "Trabajo",
      experience: "Experiencia",
      stack: "Stack",
      about: "Sobre mí",
      contact: "Contacto",
    },

    /* Las cuatro capas de la pila 3D de la portada (estructura en
       `hero.js`). Van cortas: son etiquetas junto a cada losa. `goTo` es el
       nombre accesible del enlace de cada capa. */
    hero: {
      layers: { client: "Cliente", api: "API", data: "Datos", infra: "Infra" },
      goTo: (name) => `${name}: ver en el stack`,
    },

    sections: {
      projects: {
        title: "Trabajo seleccionado",
        intro:
          "Cinco sistemas, uno en producción. Cada uno tiene su caso de estudio con capturas, arquitectura y las decisiones que tomé.",
      },
      experience: { title: "Experiencia" },
      stack: {
        title: "Stack",
        intro: "Agrupado por capa, con dónde lo he usado de verdad.",
      },
      about: { title: "Sobre mí" },
      contact: {
        title: "¿Hablamos?",
        intro:
          "Si buscas a alguien para tu equipo o quieres hablar de un proyecto, escríbeme. Respondo en español o en inglés.",
      },
    },

    profile: {
      /* Título de rol, no de grado: va en inglés también aquí porque en español
         "Ingeniera de Software" se lee como el título universitario. */
      role: "Software Engineer",
      pitch:
        "Construyo software de punta a punta: microservicios en Java y Spring Boot, APIs REST y pruebas que sostienen producción.",
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
        subtitle: "Pedidos por chat con IA para una cafetería, en producción",
        summary:
          "Sistema de pedidos en producción en Praliné Coffee House: el comensal pide por chat a un agente de IA, la cocina lo recibe al instante y cada venta llega sola al ERP contable.",
        client: "Praliné Coffee House, Baños de Agua Santa",
        description: [
          "El comensal escanea el QR de su mesa y pide desde una PWA conversando con un agente basado en Gemini, que interpreta lenguaje natural y arma el pedido. La cocina lo recibe al instante en un panel en tiempo real por WebSocket, y cada venta se registra en el ERP contable del cliente para no teclear nada dos veces.",
          "Está en producción, sostenido por 165 pruebas automatizadas y un pipeline de CI/CD en GitHub Actions que valida cada cambio antes de llegar a un negocio que depende de él a diario. Eso marcó las decisiones técnicas: contratos claros entre módulos, pruebas antes de fusionar y despliegues repetibles.",
        ],
        features: [
          "El comensal escanea el QR de su mesa y pide por chat, escribiendo o por voz.",
          "Un agente con Gemini 2.0 Flash, orquestado con n8n, interpreta el pedido y lo arma contra el menú real.",
          "La cocina ve cada pedido al instante en un panel (KDS) conectado por Socket.IO, con su estado.",
          "Cada venta se registra en el ERP contable del cliente (Contífico) sin volver a teclearla.",
          "PWA instalable con Serwist y panel de cocina accesible (WCAG 2.1 AA), en TypeScript estricto sin errores.",
          "**165 pruebas**: 92 en el backend (Jest y Supertest), 28 en la PWA (Vitest y MSW) y 45 en el panel (Vitest, Playwright y axe).",
          "11 versiones publicadas con SemVer, de la v0.1.0 a la v1.1.0, desplegadas en Vercel y Neon.",
        ],
        challenge: {
          title: "Pedidos que llegaban con cinco horas de desfase",
          body: "Las horas de los pedidos aparecían desplazadas cinco horas en el panel de cocina: las columnas eran `TIMESTAMP` sin zona horaria y el servidor no estaba en la hora de Ecuador. Se migraron a `TIMESTAMPTZ` con un script versionado (`002_fix_timestamps_tz.sql`): la base guarda el instante absoluto y cada pantalla lo muestra en su hora local.",
        },
        role: "Backend: modelado de datos con Prisma, la API y la lógica de pedidos, el canal de tiempo real y la integración con el agente conversacional. En un equipo de cuatro (ARKASYS), durante 14 semanas.",
        metrics: {
          tests: "pruebas automatizadas",
          releases: "versiones publicadas con SemVer",
          integrations: "integraciones: IA, tiempo real y ERP",
          a11y: "accesibilidad del panel de cocina",
        },
        nodes: {
          pwa: "PWA cliente",
          agent: "Agente IA",
          kitchen: "Panel de cocina",
          erp: "ERP contable",
        },
        shots: {
          "pwa-chat": "La PWA del comensal: el menú de Praliné y la entrada al chat con el agente.",
          "kitchen-display": "El panel de cocina (KDS): pedidos por mesa, en tiempo real.",
          tests: "La suite de pruebas del panel de cocina, en verde.",
        },
      },
      gasoline: {
        title: "Gasoline System",
        subtitle: "Control de combustible de una flota, en microservicios",
        summary:
          "Microservicios tras un API Gateway, con gRPC para las llamadas síncronas y eventos NATS para lo asíncrono; cada servicio con su base de datos y su contenedor.",
        client: "Proyecto académico · Aplicaciones Distribuidas, UTA",
        description: [
          "Control del consumo de combustible de una flota, diseñado como microservicios independientes (autenticación, conductores, vehículos, rutas y combustible), cada uno con su base de datos y su contenedor, detrás de un único API Gateway.",
          "La comunicación va por dos caminos según lo que se necesita: gRPC cuando un servicio necesita la respuesta de otro al momento, y eventos por NATS cuando basta con avisar sin bloquear al emisor. Fue donde entendí en la práctica lo que cuesta distribuir: consistencia entre bases separadas y fallos parciales.",
        ],
        features: [
          "Cinco microservicios (autenticación, conductores, vehículos, rutas y combustible) detrás de un API Gateway en NestJS.",
          "Contratos gRPC definidos con Protocol Buffers para las llamadas síncronas.",
          "Eventos NATS para avisar al resto de servicios sin bloquear al que publica.",
          "Cada servicio en capas: controladores gRPC, aplicación, dominio, infraestructura y persistencia.",
          "Roles de administrador, operador y supervisor, con JWT.",
          "Maquinaria ligera y pesada con reglas distintas; los repostajes en MongoDB y el resto en PostgreSQL.",
          "Panel en Next.js que marca los consumos anómalos como posible robo.",
          "Todo el sistema se levanta con Docker Compose.",
        ],
        challenge: {
          title: "Cada dato en la base que le corresponde",
          body: "Conductores, vehículos y rutas son datos relacionales con integridad referencial; los repostajes son muchos, crecen sin parar y cambian de forma según el tipo de maquinaria. Por eso cada servicio tiene su base: PostgreSQL para lo relacional y MongoDB para el combustible. El precio es que ninguna consulta cruza bases: lo que un servicio necesita de otro lo pide por gRPC o lo recibe en un evento NATS.",
        },
        role: "Microservicios, contratos gRPC y publicación y consumo de eventos NATS, en un equipo de cuatro.",
        metrics: {
          services: "microservicios independientes",
          protocols: "síncrono y asíncrono",
          roles: "roles con JWT",
        },
        nodes: {
          client: "Cliente web",
          auth: "Autenticación",
          drivers: "Conductores",
          vehicles: "Vehículos",
          routes: "Rutas",
          fuel: "Combustible",
        },
        shots: {
          routes: "Gestión de rutas: origen, destino, distancia y estado de cada viaje.",
          vehicles: "La flota, con el tipo de maquinaria y el estado de cada vehículo.",
          fuel: "Registro de combustible, con los consumos anómalos marcados.",
          login: "Acceso con JWT: cada rol ve sólo lo suyo.",
        },
      },
      contable: {
        title: "Módulo contable · Junta de Agua de Miñarica",
        subtitle: "Contabilidad por partida doble para una junta comunitaria de agua",
        summary:
          "El módulo contable del sistema de la Junta de Agua de Miñarica: asientos, periodos, plan de cuentas, cuentas por cobrar y los seis reportes contables en PDF.",
        client: "Junta de Agua de Miñarica · vinculación DIVISO, UTA",
        description: [
          "Proyecto de vinculación (DIVISO, UTA) para digitalizar una junta comunitaria de agua potable que llevaba sus cuentas a mano. El sistema lo construyó un equipo; mi parte fue el módulo contable: la partida doble que recibe lo que factura el resto del sistema y lo convierte en libros y estados financieros.",
          "Lo importante está en las reglas que el código garantiza: un asiento sólo se guarda si el debe y el haber cuadran, un periodo cerrado ya no admite cambios, sólo se borran asientos pendientes de un periodo abierto y cada cuenta nueva tiene que colgar de una cuenta padre que exista. Es el proyecto que más me enseñó a traducir las reglas de un dominio ajeno, la contabilidad, a validaciones.",
        ],
        features: [
          "Asientos de ingreso, egreso y diario: filtrar, aprobar, editar y eliminar (sólo los pendientes de un periodo abierto).",
          "El detalle de cada asiento suma el debe y el haber y muestra el descuadre, si lo hay.",
          "Un asiento manual no se guarda si el debe y el haber no cuadran.",
          "Periodos abiertos o cerrados: un periodo cerrado ya no se puede modificar.",
          "**Seis reportes oficiales en PDF**: Libro Diario, Libro Mayor, Balance de Comprobación, Balance General, Estado de Resultados y Cartera de Clientes, además del comprobante de cada asiento según su tipo.",
          "Plan de cuentas jerárquico que detecta la cuenta padre a partir del código.",
          "Cuentas por cobrar con registro de abonos e historial de pagos.",
        ],
        challenge: {
          title: "Un plan de cuentas sin cuentas huérfanas",
          body: "En contabilidad el código de una cuenta ya dice dónde va: `100.1.1` cuelga de `100.1`, que cuelga de `100`. En vez de pedir que se elija la cuenta padre en una lista, el formulario la deduce del código mientras se escribe. Si la padre no existe, avisa y bloquea el guardado: el plan nunca tiene cuentas sueltas que después descuadren el Libro Mayor.",
        },
        role: "El módulo contable: backend en NestJS y Prisma y sus pantallas en React. Asientos, periodos, plan de cuentas, cuentas por cobrar y reportes.",
        scope:
          "El sistema completo, hecho en equipo, incluye además la facturación electrónica conforme al SRI, clientes, sucursales y lecturas de medidores, y se entregó con capacitación al personal. Esas partes no son mías: aquí sólo aparece el módulo contable.",
        metrics: {
          reports: "reportes contables oficiales en PDF",
          balance: { value: "debe = haber", label: "validado antes de guardar cada asiento" },
          entryTypes: "tipos de asiento: ingreso, egreso y diario",
        },
        nodes: {
          web: "Panel web",
          billing: "Facturación",
          entries: "Asientos",
          periods: "Periodos",
          reports: "Reportes",
        },
        shots: {
          "journal-entries": "Asientos contables: filtros por periodo, tipo y estado, y aprobación.",
          "entry-detail": "Detalle de un asiento, con el total del debe, el del haber y el descuadre.",
          "new-entry": "Asiento manual: no se guarda si el debe y el haber no cuadran.",
          "period-detail": "Detalle del periodo, con sus facturas, compras, asientos y reportes.",
          "general-journal": "Libro Diario del periodo.",
          "general-ledger": "Libro Mayor por cuenta, con saldos.",
          "trial-balance": "Balance de Comprobación: sumas y saldos cuadrados.",
          "income-statement": "Estado de Resultados: ingresos, gastos y utilidad.",
          "chart-of-accounts": "Plan de cuentas jerárquico.",
          "new-account": "Cuenta nueva: la cuenta padre se detecta a partir del código.",
          "receivable-detail": "Cuenta por cobrar de un cliente de prueba, con abonos e historial de pagos.",
        },
      },
      booking: {
        title: "Booking View",
        subtitle: "Reserva de inmuebles, web y móvil sobre una misma API",
        summary: "Una API REST que alimenta la app web y la móvil, con pagos en Stripe, sesiones con Clerk y notificaciones push.",
        client: "Proyecto académico, UTA",
        description: [
          "Reserva de inmuebles con dos perfiles principales: el propietario que publica y administra sus propiedades y el huésped que busca, reserva y paga. Una sola API REST en Node.js, Express y MongoDB alimenta la app web (React) y la móvil (React Native).",
          "Incluye validación de disponibilidad para evitar reservas solapadas, pagos con Stripe, sesiones con Clerk y notificaciones push para nuevas reservas y cambios de estado.",
        ],
        features: [
          "Cuatro perfiles (visitante, cliente, propietario y administrador), cada uno con sus permisos.",
          "Una sola API REST en Node.js, Express y MongoDB para la web (React) y la app móvil (React Native con Expo).",
          "La disponibilidad se valida antes de reservar: no puede haber dos reservas solapadas del mismo inmueble.",
          "Pagos con Stripe, en modo de pruebas, y sesiones con Clerk.",
          "Las imágenes de los inmuebles, en Cloudinary.",
          "Panel de administración con gráficas de reservas, y notificaciones push.",
        ],
        challenge: {
          title: "Dos reservas, la misma noche",
          body: "Lo que no puede pasar en una app de reservas es vender dos veces la misma noche. Antes de crear una reserva, la API comprueba que el rango de fechas no se cruce con ninguna reserva del inmueble; si se cruza, la rechaza. La regla vive en el servidor, no en la interfaz: la web y la móvil la cumplen igual porque comparten la misma API.",
        },
        role: "API REST y aplicación móvil en React Native, en un equipo de cuatro.",
        metrics: {
          clients: "clientes sobre una misma API: web y móvil",
          roles: "perfiles con permisos distintos",
        },
        shots: {
          home: "Portada web: búsqueda por destino y fechas.",
          property: "Ficha del inmueble, con galería y precio por noche.",
          "admin-dashboard": "Panel de administración: reservas en el tiempo y por establecimiento.",
          "mobile-booking": "App móvil: fechas y huéspedes antes de reservar.",
          "mobile-payment": "App móvil: pago confirmado con Stripe.",
        },
      },
      safetrade: {
        title: "SafeTrade",
        subtitle: "Marketplace con moderación, desplegado en Azure",
        summary:
          "Marketplace de productos y servicios con moderación de publicaciones, contenerizado con Docker y desplegado en Azure con CI/CD.",
        client: "Proyecto académico, UTA",
        description: [
          "Marketplace donde los usuarios publican productos y servicios y pueden reportar publicaciones, con un flujo de moderación detrás. Backend en NestJS, Prisma y PostgreSQL y frontend en React.",
          "El foco estuvo tanto en la aplicación como en cómo llega a producción: imágenes Docker multi-stage, despliegue en Azure y un pipeline de GitHub Actions que construye, prueba y despliega en cada push.",
        ],
        features: [
          "Los usuarios publican productos y servicios y pueden reportar publicaciones; detrás hay un flujo de moderación.",
          "Backend en NestJS, Prisma y PostgreSQL; frontend en React con Vite.",
          "En local, todo el sistema se levanta con Docker Compose.",
          "Dockerfiles multi-stage: la imagen final sólo lleva lo necesario para ejecutar.",
          "En Azure, el backend en App Service (Chile Central) y el frontend en una Static Web App.",
          "GitHub Actions construye, prueba y despliega en cada push.",
        ],
        challenge: {
          title: "Del contenedor a la nube sin sorpresas",
          body: "Dos detalles que sólo aparecen al desplegar. En una Static Web App, recargar una ruta interna del frontend (un producto, por ejemplo) da 404, porque ese archivo no existe: un `navigationFallback` en `staticwebapp.config.json` devuelve siempre la aplicación y el enrutado del cliente hace el resto. Y el cliente de Prisma se genera en los scripts de build y de arranque, para que la imagen del backend nunca arranque con un cliente desactualizado.",
        },
        role: "Backend y configuración de la contenerización, el despliegue en Azure y el pipeline de CI/CD.",
        metrics: {
          cloud: "App Service para el backend y Static Web Apps para el frontend",
          pipeline: "de cada push a producción con GitHub Actions",
        },
        shots: {
          home: "Portada: publicaciones de vendedores verificados.",
          catalog: "Catálogo con filtros por categoría y precio.",
          "mobile-product": "Ficha de producto en móvil.",
          "azure-resources": "Los recursos en Azure: App Service para el backend y Static Web App para el frontend.",
        },
      },
    },

    skills: {
      backend: {
        title: "Backend",
        proof: "Más de 10 módulos CRUD entregados en el API principal de Alquimiasoft, incluida la facturación.",
      },
      data: {
        title: "Bases de datos",
        proof: "Modelado relacional y reglas en los datos: asientos contables que sólo se guardan si el debe y el haber cuadran.",
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
        issuer: "FISEI, UTA · 2025",
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
      home: "Home",
      downloadCv: "Download CV",
      cvShort: "CV",
      cvChoose: "Choose the CV language",
      cvSpanish: "CV in Spanish",
      cvEnglish: "CV in English",
      contactCta: "Contact",
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
      architecture: "Architecture",
      sync: "sync",
      async: "async",
      backHome: "Back",
      backHomeLong: "Back to portfolio",
      theSystem: "The system",
      decisions: "Technical decisions",
      features: "What it does",
      challenge: "One concrete problem",
      gallery: "Screenshots",
      myRole: "My part",
      scope: "Scope",
      stack: "Stack",
      year: "Year",
      context: "Context",
      team: "Team",
      teamOf: (n) => `${n} people`,
      code: "Code",
      nextProject: "Next project",
      openShot: (caption) => `Enlarge screenshot: ${caption}`,
      closeShot: "Close",
      prevShot: "Previous screenshot",
      nextShot: "Next screenshot",
      currentRole: "Current",
      roleStack: "Stack used",
      education: "Education",
      coursework: "Relevant coursework",
      certifications: "Certifications",
      languages: "Languages",
      emailMe: "Email me",
      copyEmail: "Copy email",
      copied: "Copied",
      orForm: "Or leave me a message here",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      send: "Send message",
      sending: "Sending…",
      sendError: "The message couldn't be sent. Please try again or email me directly.",
      successTitle: "Message sent",
      successBody: "Thank you. I'll get back to you as soon as I can.",
      footer: "Designed and built by Daylé García with Next.js and OGL. Statically exported.",
    },

    nav: {
      projects: "Work",
      experience: "Experience",
      stack: "Stack",
      about: "About",
      contact: "Contact",
    },

    hero: {
      layers: { client: "Client", api: "API", data: "Data", infra: "Infra" },
      goTo: (name) => `${name}: see it in the stack`,
    },

    sections: {
      projects: {
        title: "Selected work",
        intro:
          "Five systems, one of them in production. Each has its own case study with screenshots, architecture and the decisions I made.",
      },
      experience: { title: "Experience" },
      stack: {
        title: "Stack",
        intro: "Grouped by layer, with where I've actually used it.",
      },
      about: { title: "About" },
      contact: {
        title: "Let's talk",
        intro:
          "If you're looking for someone for your team or want to talk about a project, get in touch. I reply in English or Spanish.",
      },
    },

    profile: {
      role: "Software Engineer",
      pitch:
        "I build software end to end: Java and Spring Boot microservices, REST APIs and tests that hold up in production.",
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
        subtitle: "AI chat ordering for a coffee shop, in production",
        summary:
          "Ordering system in production at Praliné Coffee House: customers order by chatting with an AI agent, the kitchen gets it instantly and every sale lands in the accounting ERP on its own.",
        client: "Praliné Coffee House, Baños de Agua Santa (Ecuador)",
        description: [
          "Customers scan the QR code on their table and order from a PWA by chatting with an agent built on Gemini, which interprets natural language and assembles the order. The kitchen receives it instantly on a real-time board over WebSocket, and every sale is recorded in the client's accounting ERP so nothing is keyed in twice.",
          "It runs in production, backed by 165 automated tests and a GitHub Actions CI/CD pipeline that validates every change before it reaches a business that depends on it daily. That shaped the technical decisions: clear contracts between modules, tests before merging and repeatable deployments.",
        ],
        features: [
          "Customers scan the QR code on their table and order by chat, typing or by voice.",
          "An agent on Gemini 2.0 Flash, orchestrated with n8n, interprets the order and builds it against the real menu.",
          "The kitchen sees each order instantly on a board (KDS) connected over Socket.IO, with its status.",
          "Every sale is recorded in the client's accounting ERP (Contífico) without being keyed in again.",
          "Installable PWA with Serwist and an accessible kitchen board (WCAG 2.1 AA), in strict TypeScript with zero errors.",
          "**165 tests**: 92 on the backend (Jest and Supertest), 28 on the PWA (Vitest and MSW) and 45 on the board (Vitest, Playwright and axe).",
          "11 releases with SemVer, from v0.1.0 to v1.1.0, deployed on Vercel and Neon.",
        ],
        challenge: {
          title: "Orders arriving five hours off",
          body: "Order times showed up five hours off on the kitchen board: the columns were `TIMESTAMP` without a time zone and the server wasn't on Ecuador time. They were migrated to `TIMESTAMPTZ` with a versioned script (`002_fix_timestamps_tz.sql`): the database stores the absolute instant and each screen shows it in its local time.",
        },
        role: "Backend: data modelling with Prisma, the API and ordering logic, the real-time channel and the integration with the conversational agent. In a team of four (ARKASYS), over 14 weeks.",
        metrics: {
          tests: "automated tests",
          releases: "releases with SemVer",
          integrations: "integrations: AI, real time and ERP",
          a11y: "kitchen board accessibility",
        },
        nodes: {
          pwa: "Customer PWA",
          agent: "AI agent",
          kitchen: "Kitchen board",
          erp: "Accounting ERP",
        },
        shots: {
          "pwa-chat": "The customer PWA: Praliné's menu and the way into the chat with the agent.",
          "kitchen-display": "The kitchen board (KDS): orders by table, in real time.",
          tests: "The kitchen board's test suite, all green.",
        },
      },
      gasoline: {
        title: "Gasoline System",
        subtitle: "Fleet fuel control, as microservices",
        summary:
          "Microservices behind an API Gateway, with gRPC for synchronous calls and NATS events for asynchronous ones; each service with its own database and container.",
        client: "University project · Distributed Applications, UTA",
        description: [
          "Fuel consumption control for a vehicle fleet, designed as independent microservices (authentication, drivers, vehicles, routes and fuel), each with its own database and container, behind a single API Gateway.",
          "Communication takes two paths depending on the need: gRPC when a service needs another's answer right away, and NATS events when it's enough to notify without blocking the sender. It's where I learned in practice what distribution costs: consistency across separate databases and partial failures.",
        ],
        features: [
          "Five microservices (authentication, drivers, vehicles, routes and fuel) behind an API Gateway in NestJS.",
          "gRPC contracts defined with Protocol Buffers for synchronous calls.",
          "NATS events to notify the other services without blocking the publisher.",
          "Each service in layers: gRPC controllers, application, domain, infrastructure and persistence.",
          "Admin, operator and supervisor roles, with JWT.",
          "Light and heavy machinery with different rules; refuelling records in MongoDB and the rest in PostgreSQL.",
          "A Next.js dashboard that flags anomalous consumption as possible theft.",
          "The whole system starts with Docker Compose.",
        ],
        challenge: {
          title: "Each piece of data in the database that fits it",
          body: "Drivers, vehicles and routes are relational data with referential integrity; refuelling records are numerous, grow constantly and change shape with the type of machinery. So each service has its own database: PostgreSQL for the relational data and MongoDB for fuel. The price is that no query crosses databases: whatever a service needs from another, it asks for over gRPC or receives in a NATS event.",
        },
        role: "Microservices, gRPC contracts, and publishing and consuming NATS events, in a team of four.",
        metrics: {
          services: "independent microservices",
          protocols: "sync and async",
          roles: "roles with JWT",
        },
        nodes: {
          client: "Web client",
          auth: "Auth",
          drivers: "Drivers",
          vehicles: "Vehicles",
          routes: "Routes",
          fuel: "Fuel",
        },
        shots: {
          routes: "Route management: origin, destination, distance and status of each trip.",
          vehicles: "The fleet, with each vehicle's machinery type and status.",
          fuel: "Fuel records, with anomalous consumption flagged.",
          login: "JWT sign-in: each role only sees its own screens.",
        },
      },
      contable: {
        title: "Accounting module · Miñarica Water Board",
        subtitle: "Double-entry accounting for a community water board",
        summary:
          "The accounting module of the Miñarica Water Board's system: journal entries, periods, chart of accounts, receivables and the six accounting reports in PDF.",
        client: "Miñarica Water Board · DIVISO outreach programme, UTA",
        description: [
          "A university outreach project (DIVISO, UTA) to digitise a community drinking-water board that kept its books by hand. The system was built by a team; my part was the accounting module: the double-entry engine that takes what the rest of the system invoices and turns it into books and financial statements.",
          "What matters is the rules the code guarantees: an entry is only saved if debits equal credits, a closed period no longer accepts changes, only pending entries in an open period can be deleted, and every new account has to hang from a parent account that exists. It's the project that taught me most about turning the rules of an unfamiliar domain, accounting, into validations.",
        ],
        features: [
          "Income, expense and general journal entries: filter, approve, edit and delete (only pending ones in an open period).",
          "Each entry's detail totals debits and credits and shows the imbalance, if any.",
          "A manual entry isn't saved unless debits equal credits.",
          "Open or closed periods: a closed period can no longer be modified.",
          "**Six official PDF reports**: General Journal, General Ledger, Trial Balance, Balance Sheet, Income Statement and Accounts Receivable, plus a voucher for each entry by type.",
          "Hierarchical chart of accounts that detects the parent account from the code.",
          "Accounts receivable with partial payments and payment history.",
        ],
        challenge: {
          title: "A chart of accounts with no orphans",
          body: "In accounting, an account's code already says where it belongs: `100.1.1` hangs from `100.1`, which hangs from `100`. Instead of asking the user to pick the parent from a list, the form works it out from the code as it's typed. If the parent doesn't exist, it warns and blocks saving: the chart never has loose accounts that later throw the General Ledger out of balance.",
        },
        role: "The accounting module: the NestJS and Prisma backend and its React screens. Journal entries, periods, chart of accounts, receivables and reports.",
        scope:
          "The full system, built by the team, also includes e-invoicing compliant with Ecuador's tax authority (SRI), customers, branches and meter readings, and was delivered with staff training. Those parts aren't mine: only the accounting module is shown here.",
        metrics: {
          reports: "official accounting reports in PDF",
          balance: { value: "debit = credit", label: "checked before each entry is saved" },
          entryTypes: "entry types: income, expense and general",
        },
        nodes: {
          web: "Web app",
          billing: "Invoicing",
          entries: "Entries",
          periods: "Periods",
          reports: "Reports",
        },
        shots: {
          "journal-entries": "Journal entries: filters by period, type and status, and approval.",
          "entry-detail": "An entry's detail, with total debits, total credits and the imbalance.",
          "new-entry": "Manual entry: it isn't saved unless debits equal credits.",
          "period-detail": "Period detail, with its invoices, purchases, entries and reports.",
          "general-journal": "The period's General Journal.",
          "general-ledger": "General Ledger by account, with balances.",
          "trial-balance": "Trial Balance: totals and balances that add up.",
          "income-statement": "Income Statement: revenue, expenses and profit.",
          "chart-of-accounts": "The hierarchical chart of accounts.",
          "new-account": "New account: the parent is detected from the code.",
          "receivable-detail": "A test customer's receivable, with partial payments and history.",
        },
      },
      booking: {
        title: "Booking View",
        subtitle: "Property booking, web and mobile on one API",
        summary: "One REST API feeding both the web and mobile apps, with Stripe payments, Clerk sessions and push notifications.",
        client: "University project, UTA",
        description: [
          "Property booking with two main profiles: the owner who lists and manages properties, and the guest who searches, books and pays. A single REST API on Node.js, Express and MongoDB feeds the web app (React) and the mobile one (React Native).",
          "It includes availability checks to prevent overlapping bookings, Stripe payments, sessions with Clerk and push notifications for new bookings and status changes.",
        ],
        features: [
          "Four profiles (visitor, customer, owner and admin), each with its own permissions.",
          "A single REST API on Node.js, Express and MongoDB for the web (React) and the mobile app (React Native with Expo).",
          "Availability is checked before booking: a property can never have two overlapping bookings.",
          "Stripe payments, in test mode, and sessions with Clerk.",
          "Property images on Cloudinary.",
          "An admin dashboard with booking charts, and push notifications.",
        ],
        challenge: {
          title: "Two bookings, the same night",
          body: "What must never happen in a booking app is selling the same night twice. Before creating a booking, the API checks that the date range doesn't overlap any existing booking for the property; if it does, it rejects it. The rule lives on the server, not in the UI: web and mobile follow it the same way because they share the same API.",
        },
        role: "The REST API and the React Native mobile app, in a team of four.",
        metrics: {
          clients: "clients on one API: web and mobile",
          roles: "profiles with different permissions",
        },
        shots: {
          home: "Web home: search by destination and dates.",
          property: "Property page, with gallery and nightly price.",
          "admin-dashboard": "Admin dashboard: bookings over time and by property.",
          "mobile-booking": "Mobile app: dates and guests before booking.",
          "mobile-payment": "Mobile app: payment confirmed with Stripe.",
        },
      },
      safetrade: {
        title: "SafeTrade",
        subtitle: "Marketplace with moderation, deployed to Azure",
        summary:
          "Marketplace for products and services with listing moderation, containerised with Docker and deployed to Azure with CI/CD.",
        client: "University project, UTA",
        description: [
          "A marketplace where users publish products and services and can report listings, with a moderation flow behind it. NestJS, Prisma and PostgreSQL on the backend and React on the frontend.",
          "The focus was as much on the app as on how it reaches production: multi-stage Docker images, deployment to Azure and a GitHub Actions pipeline that builds, tests and deploys on every push.",
        ],
        features: [
          "Users publish products and services and can report listings; a moderation flow sits behind it.",
          "NestJS, Prisma and PostgreSQL on the backend; React with Vite on the frontend.",
          "Locally, the whole system starts with Docker Compose.",
          "Multi-stage Dockerfiles: the final image only carries what it needs to run.",
          "On Azure, the backend on App Service (Chile Central) and the frontend on a Static Web App.",
          "GitHub Actions builds, tests and deploys on every push.",
        ],
        challenge: {
          title: "From container to cloud without surprises",
          body: "Two details that only show up when you deploy. On a Static Web App, reloading an internal frontend route (a product page, say) returns 404, because that file doesn't exist: a `navigationFallback` in `staticwebapp.config.json` always serves the app and client-side routing does the rest. And the Prisma client is generated in the build and start scripts, so the backend image never boots with a stale client.",
        },
        role: "Backend, plus the containerisation, the Azure deployment and the CI/CD pipeline.",
        metrics: {
          cloud: "App Service for the backend and Static Web Apps for the frontend",
          pipeline: "from every push to production with GitHub Actions",
        },
        shots: {
          home: "Home: listings from verified sellers.",
          catalog: "Catalogue with filters by category and price.",
          "mobile-product": "Product page on mobile.",
          "azure-resources": "The Azure resources: App Service for the backend and a Static Web App for the frontend.",
        },
      },
    },

    skills: {
      backend: {
        title: "Backend",
        proof: "10+ CRUD modules delivered in Alquimiasoft's main API service, including invoicing.",
      },
      data: {
        title: "Databases",
        proof: "Relational modelling and rules in the data: journal entries that are only saved if debits equal credits.",
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
        issuer: "FISEI, UTA · 2025",
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
