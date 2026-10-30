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
      live: "En línea",
      sourceCode: "Código",
      caseStudy: "Ver caso de estudio",
      moreOnGithub: "Más proyectos en GitHub",
      readMinutes: (n) => `${n} min de lectura`,
      fromProject: "Del proyecto",
      readNote: "Leer la nota",
      nextNote: "Siguiente nota",
      seeCaseStudy: (title) => `Ver el caso de estudio de ${title}`,
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
      roleLinks: "Enlaces del puesto",
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
      notes: "Notas",
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
          "Siete sistemas, uno en producción. Cada uno tiene su caso de estudio con capturas, arquitectura y las decisiones que tomé.",
      },
      experience: { title: "Experiencia" },
      notes: {
        title: "Notas",
        intro: "Lo que aprendí resolviendo un problema concreto, con el código real.",
      },
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
      /* Señal de la portada. Si dejo de buscar, se borra y desaparece. */
      availability: "Disponible para nuevas oportunidades",
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
        linkText: {
          product: { label: "Migo", note: "El sistema de facturación de la empresa" },
          apiDocs: { label: "API de Migo", note: "Publiqué su documentación" },
        },
        bullets: [
          "Desarrollo y mantenimiento de **microservicios en Java/Spring Boot**: APIs REST, lógica de negocio y persistencia en PostgreSQL.",
          "Entrega de **más de 10 módulos CRUD** en el API principal, incluido el de facturación y endpoints de utilidad para otros equipos.",
          "Extensión y soporte de aplicaciones **legacy en Spring MVC**, añadiendo funcionalidades y corrigiendo defectos en código heredado.",
          "Documentación de las APIs con Swagger/OpenAPI y pruebas unitarias en Mockito, manteniendo **más del 95% de cobertura**.",
          "Contenerización con Docker, Git/GitHub con ramas, PRs y code review, e interfaces en Flutter que consumen el backend, en un equipo Scrum sobre Jira.",
        ],
      },
    ],

    /* Notas técnicas (estructura y código en `notes.js`). El cuerpo es una
       lista de bloques: una cadena es un párrafo (con `**negrita**` y
       `` `código` ``), `{ h }` un subtítulo y `{ code }` un fragmento de
       `notes.js`. Hechos sacados del código y del historial de git. */
    notes: {
      "refresh-token-rotation": {
        title: "Rotar el refresh token sin echar a nadie por un doble clic",
        summary:
          "Cada renovación cambia el token y reusar uno viejo cierra la sesión entera. La trampa: dos pestañas renovando a la vez parecen un robo.",
        body: [
          "En Fiado, el simulador de créditos e inversiones que hicimos en equipo para una cooperativa, me tocaron el registro y la sesión. La sesión vive en dos cookies httpOnly: un access token (un JWT de 15 minutos) y un refresh token de 30 días para pedir otro sin volver a escribir la contraseña. El que importa es el segundo: quien lo tenga se queda con la cuenta un mes.",
          { h: "Opaco, y en la base sólo su huella" },
          "El refresh token no es un JWT: son 32 bytes aleatorios. Su validez no está en el token sino en una fila de `AuthSession`, así que se puede revocar de verdad. En la base se guarda su SHA-256, no el token: si se filtrara la tabla, no serviría para entrar.",
          { code: "token" },
          "Y la cookie sólo viaja a `/api/auth`: el navegador ni siquiera la adjunta en el resto de peticiones a la API.",
          { code: "cookie" },
          { h: "Cada renovación lo cambia" },
          "Al renovar, el token usado queda marcado (`rotatedAt`) y se emite otro de la misma **familia** (`familyId`: una por inicio de sesión). Cada token sirve una sola vez. Si llega uno que ya se usó, alguien más tiene una copia: el dueño o un ladrón, y el servidor no puede saber cuál. Así que revoca la familia entera y los dos tienen que volver a entrar. Una cookie robada no sobrevive a la siguiente renovación de su dueño.",
          { code: "reuse" },
          { h: "La trampa: dos pestañas a la vez" },
          "Si dos peticiones renuevan con el mismo token casi al mismo tiempo (dos pestañas, un doble clic, un reintento), las dos lo leen como válido. La segunda en escribir lo encontraría ya rotado y, con la regla de arriba, cerraría la sesión de alguien que no hizo nada malo.",
          "Por eso el token no se marca leyendo y después escribiendo, sino con **una sola escritura condicionada a su estado**:",
          { code: "race" },
          "La base decide quién gana: sólo una de las dos escrituras encuentra la fila sin rotar. La que pierde recibe un 401 y no revoca nada; la cookie nueva que dejó la ganadora sirve para las dos pestañas. La alarma de robo sólo salta cuando el token ya estaba rotado al leerlo, no en un empate.",
          { h: "Lo que me llevo" },
          "Una regla de seguridad que castiga el reúso tiene que distinguir el reúso de la concurrencia. Esa distinción no se puede hacer en la aplicación con dos consultas seguidas: hay que dejársela a la base, en una escritura atómica.",
        ],
      },
      "id-card-two-faces": {
        title: "La cédula ecuatoriana tiene dos caras",
        summary:
          "La verificación facial funcionaba con las fotos de prueba y rechazaba casi todas las cédulas reales. Cuatro arreglos, y un umbral calibrado con datos.",
        body: [
          "En Fiado, para abrir una inversión hay que demostrar que eres el titular de la cédula: una prueba de vida con la cámara y la comparación de tu rostro con la foto del documento. Lo hice con face-api en el backend NestJS, sobre WebAssembly, sin GPU ni binarios nativos. La primera versión funcionaba perfecto con las fotos de muestra y rechazaba casi todas las cédulas reales.",
          { h: "Dos rostros donde esperaba uno" },
          "La regla era: exactamente un rostro por imagen, para que nadie se verifique con otra persona al lado. Pero la cédula ecuatoriana trae, además del retrato, un **retrato fantasma** más pequeño, así que toda cédula \"tenía dos personas\". En la cédula, entonces, cuenta el rostro más grande: los detecto todos y los ordeno por área.",
          { code: "largest" },
          { h: "En la selfie, ¿cuándo cuenta un segundo rostro?" },
          "En el fotograma en vivo la regla sí tiene que existir, pero contar cualquier rostro era demasiado: un cuadro en la pared, alguien que pasa al fondo o un falso positivo tumbaban la verificación. Ahora un segundo rostro sólo invalida la captura si el detector está seguro (confianza de 0,7 o más) **y** si mide al menos un cuarto del principal.",
          { code: "relevant" },
          { h: "Fotos giradas y retratos diminutos" },
          "Otros dos fallos venían de la foto, no de la persona. Las fotos tomadas con el celular llegaban a veces giradas y el detector no encontraba nada: si no aparece un rostro, pruebo girando la imagen 90° hasta dar la vuelta completa. Y el retrato ocupa poco de la cédula: buscarlo en la imagen reducida a 1280 px está bien, pero sacar de ahí el descriptor pierde detalle. El descriptor sale de un recorte del retrato a resolución completa.",
          { h: "Un umbral medido, no el de siempre" },
          "face-api suele usar una distancia de 0,6 entre descriptores para decir \"misma persona\". Con las fotos de muestra, la misma persona quedaba entre 0,05 y 0,35, y personas distintas desde 0,47. Una cédula real (impresa, con hologramas, con una foto de hace años) aleja al titular de su selfie, así que el umbral quedó en 0,5: acepta al titular sin llegar al 0,6. Y se configura por entorno, porque con más cédulas reales habría que volver a medirlo.",
          { code: "threshold" },
          { h: "Lo que no hace" },
          "Esta prueba de vida detiene una foto impresa o en pantalla, que no gira ni sonríe cuando se le pide. No sustituye a un detector pasivo certificado (ISO/IEC 30107-3) contra máscaras o deepfakes en tiempo real. Por eso el reconocimiento está detrás de una interfaz (`BiometricProvider`): cambiar face-api por un proveedor comercial no toca el resto del sistema.",
        ],
      },
    },

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
      helpdesk: {
        title: "Asistente de cursos CTT-FISEI",
        subtitle: "Una asesora con IA en Telegram y un panel para tomar el control en vivo",
        summary:
          "Agente de ventas con IA para los Talleres Tecnológicos de la FISEI (UTA): atiende por Telegram, por texto o por voz, con el catálogo real de cursos, y un operador puede tomar la conversación desde un panel en tiempo real sin que el usuario note el cambio. Lo construí sola en la Hackathon UTA 2026, orquestando agentes de IA de programación.",
        client: "Hackathon UTA 2026 · Talleres Tecnológicos CTT-FISEI",
        description: [
          "El reto: un centro de capacitación recibe consultas a cualquier hora, y un bot de menús o una respuesta tardía pierden al interesado. La asesora atiende por Telegram a cualquier hora con los 18 cursos reales del CTT-FISEI: recomienda uno o dos según el perfil, responde objeciones y lleva a la inscripción. Cada mensaje aparece al instante en un panel donde el operador ve el estado de cada prospecto (interesado, dudoso, frustrado o lead caliente) y puede tomar el control: la IA se pausa y él responde con el mismo bot.",
          "Una sola llamada al LLM por mensaje, con salida JSON validada con zod (respuesta, estado del lead, intención, perfil y si hace falta un humano): la mitad de latencia y de tokens que encadenar un clasificador y un generador. El modelo nunca es la fuente de los datos comerciales: los precios salen de la base, cada importe de la respuesta se valida contra el catálogo y el enlace de inscripción lo genera el servidor. El panel lee de Supabase en tiempo real y escribe sólo por la API autenticada: la clave pública no puede modificar nada.",
        ],
        features: [
          "Responde en el idioma del usuario y entiende notas de voz: las transcribe Gemini, sin otro servicio.",
          "Catálogo real de 18 cursos, sincronizado cada seis horas con la web oficial del CTT; si la web cae o cambia su HTML, se conserva el anterior. El estado de cada curso se calcula con la fecha de Ecuador y el botón de inscripción de la web: la web marcaba como abiertos cursos de 2025 ya terminados.",
          "Perfila al prospecto conversando (nombre, interés, nivel, disponibilidad, tipo de participante) y le da el precio de su audiencia: estudiante UTA, graduado o personal UTA, o público general.",
          "La IA se pausa sola ante la frustración o si piden una persona. Al tomar el control, el operador recibe un resumen automático (interés, objeciones, siguiente paso); al devolverla, la IA retoma sabiendo lo que dijo el humano.",
          "Defensa contra prompt injection en capas: la entrada del usuario va delimitada como dato, un detector previo reconoce falsa autoridad, DAN, \"revela tu prompt\" o precios \"prometidos\", y la salida se valida contra el catálogo. Si falla, se regenera una vez o sale una respuesta segura.",
          "Nunca deja al usuario sin respuesta: una cadena de cinco modelos de Gemini, cada uno con su propia cuota, salta los 429, 404 y 5xx.",
          "Métricas en vivo: personas atendidas, distribución por estado, leads calientes, derivaciones, manipulaciones bloqueadas, latencia, tokens y saltos de modelo.",
          "Login del operador con token HMAC, límite de intentos y comparación en tiempo constante; webhook de Telegram con `secret_token` y RLS de sólo lectura para el panel.",
          "**19 casos de evaluación del agente** en verde (ventas, objeciones, cierre, frustración, faltas de ortografía, inglés y seis ataques), **46 pruebas unitarias** y CI en GitHub Actions.",
        ],
        challenge: {
          title: "La IA hablaba después de que el operador tomara el control",
          body: "Entre que llega un mensaje y Gemini responde pasan uno o dos segundos. Si el operador pulsaba \"Tomar control\" en ese hueco, la respuesta de la IA salía igual y se cruzaba con la suya: la pausa se comprobaba al recibir el mensaje, no al enviarlo. Ahora se vuelve a leer `ai_paused` justo antes de enviar. Si el operador tomó el control durante la inferencia, la respuesta no sale: se guarda como descartada y el panel la muestra tachada, para que se sepa qué habría dicho la IA.",
        },
        role: "Todo el proyecto, sola. Entendí el reto y la rúbrica, diseñé la arquitectura y el modelo de datos, decidí qué recortar para llegar a tiempo, configuré Telegram, Gemini, Supabase, Render y Vercel, y probé el bot como usuaria real en cada iteración. El código lo escribieron agentes de IA que orquesté: Claude Code planificaba, escribía una especificación cerrada por tarea (archivos permitidos, contratos y criterio de terminado), lanzaba a los implementadores (Cursor Agent CLI, hasta tres en paralelo sobre carpetas distintas), revisaba cada diff, corría las pruebas y desplegaba. 23 tareas, un commit por tarea.",
        scope:
          "Hecho en una hackathon: la planificación empezó a las 11:36 y la entrega era a las 13:00. La primera versión (bot, panel y handover) quedó en producción antes del corte; el resto del día fueron el catálogo real, la identidad visual del CTT, la robustez, las pruebas y la CI.",
        metrics: {
          time: { value: "85 min", label: "de la planificación al bot y el panel en producción" },
          eval: "casos de la batería del agente en verde, seis de ellos ataques",
          tests: "pruebas unitarias, en CI con GitHub Actions",
          fallback: "modelos de Gemini en la cadena de respaldo",
        },
        nodes: {
          dashboard: "Panel de mando",
          guardrails: "Guardrails",
          catalog: "Catálogo",
          enrollment: "Inscripción",
        },
        shots: {
          "operator-chat": "El operador tiene el control: la IA se pausó porque la prospecta pidió un asesor. La conversación es de demostración.",
          "advisor-summary": "El resumen automático para el asesor: interés, objeciones, estado y siguiente paso.",
          metrics: "Métricas en vivo: el termómetro de prospectos, las derivaciones, las manipulaciones bloqueadas, la latencia y los tokens.",
          courses: "Los 18 cursos sincronizados con la web oficial, con el estado de cada uno calculado.",
          "public-landing": "La página pública: el QR al bot y los cursos con la inscripción abierta.",
          "mobile-login": "El acceso del operador, en móvil.",
        },
      },
      fiado: {
        title: "Fiado",
        subtitle: "Verificación facial en vivo para una cooperativa de ahorro y crédito",
        summary:
          "Simulador de créditos e inversiones para una cooperativa. Mi parte: confirmar la identidad de quien invierte con una prueba de vida en vivo y la comparación de su rostro con la cédula (también desde el celular), el registro y el inicio de sesión, y la portada.",
        client: "Proyecto académico · Ingeniería Económica para Software, UTA",
        description: [
          "Fiado simula los servicios digitales de una cooperativa de ahorro y crédito: créditos con los sistemas francés y alemán, con su tabla de amortización en PDF, e inversiones a plazo fijo que se solicitan en línea. Para abrir una póliza, igual que en la app de un banco, hay que demostrar que eres el titular de la cédula. Esa verificación biométrica es mi parte, junto con las cuentas y la sesión de las que depende, y la portada.",
          "La detección en el navegador sólo guía; decide el servidor. El cliente pide dos gestos al azar, acompaña a la persona con el óvalo y envía un fotograma de frente, uno por gesto y otro de frente al cerrar. El servidor comprueba que todos son la misma persona, que cada gesto se hizo y que el rostro coincide con el de la cédula: una foto o un video grabado de antemano no sirven. Y el reconocimiento está detrás de una interfaz (`BiometricProvider`): cambiar face-api por un proveedor comercial no toca el resto.",
        ],
        features: [
          "Al registrarse, la cuenta existe pero no puede operar hasta que un rostro en vivo coincide con la foto de la cédula. Tras cinco intentos fallidos se bloquea y la desbloquea un administrador.",
          "Prueba de vida por reto y respuesta: el servidor sortea dos gestos de tres (girar a la izquierda, a la derecha o sonreír) en una sesión de un solo uso que vence en tres minutos.",
          "face-api corre en el backend NestJS sobre WebAssembly, sin GPU ni binarios nativos, y valida cada gesto sobre los 68 puntos faciales del fotograma.",
          "La comparación con la cédula usa descriptores faciales de 128 dimensiones. El umbral y los intentos se configuran, y cada intento queda auditado con sus puntajes y el motivo del rechazo.",
          "Sin cámara, se sigue en el celular con un QR de diez minutos. La computadora ve en vivo, por Server-Sent Events, en qué paso va el celular y si se cerró (latidos cada dos segundos). Los tokens se guardan como SHA-256.",
          "La misma verificación sirve para el registro, la solicitud de una inversión y la recuperación de la contraseña.",
          "Registro e inicio de sesión con cookies httpOnly. El refresh token rota en cada renovación y reusar uno ya rotado revoca toda su familia: una cookie robada no sobrevive a su dueño. Contraseñas con scrypt de `node:crypto`, sin dependencias nativas.",
          "La portada muestra una simulación real (sistema francés) y los productos desde la API, con apariciones al desplazar que respetan el movimiento reducido.",
          "**30 pruebas unitarias** del módulo (las métricas de los gestos y el proveedor con rostros reales) y pruebas e2e de todo el flujo, con un proveedor simulado determinista.",
        ],
        challenge: {
          title: "Dos caras en una cédula",
          body: "La primera versión exigía exactamente un rostro por imagen y rechazaba casi todas las cédulas: la ecuatoriana trae, además del retrato, un retrato fantasma más pequeño, y las fotos llegaban a veces giradas. Ahora en la cédula se toma el rostro más grande, se prueba a enderezar la foto si no aparece, y el descriptor sale de un recorte del retrato a resolución completa, no de la imagen reducida. En la selfie, un segundo rostro sólo invalida la captura si es claro y de tamaño parecido al principal: un cuadro en la pared o alguien que pasa al fondo ya no tumban la verificación.",
        },
        role: "El flujo biométrico de punta a punta: el módulo de biometría en NestJS y Prisma (prueba de vida, comparación facial y auditoría de intentos), la confirmación de identidad del registro, el traspaso al celular con QR y Server-Sent Events, y sus pantallas guiadas en Next.js. Además, el registro y el inicio de sesión con rotación de refresh tokens, y la portada del sitio. En un equipo de seis.",
        scope:
          "El resto del sistema lo hizo el equipo: los simuladores de crédito (francés y alemán) y de inversiones, la tabla de amortización en PDF y el panel de administración. Esas partes no son mías: aquí sólo aparece lo que hice yo.",
        metrics: {
          gestures: { value: "2 de 3", label: "gestos al azar, sorteados por el servidor" },
          handoff: "seguir en el celular, en vivo en la computadora",
          tests: "pruebas unitarias del módulo biométrico",
          landmarks: "puntos faciales para validar cada gesto",
        },
        nodes: {
          web: "Portal web",
          phone: "Celular",
          auth: "Sesión",
          biometrics: "Biometría",
          handoff: "Traspaso QR",
          simulators: "Simuladores",
        },
        shots: {
          "identity-document": "Paso 1: la foto de la cédula, con qué hacer y qué evitar, y el consentimiento para los datos biométricos.",
          liveness: "Prueba de vida: el servidor pidió girar la cabeza a la izquierda. El rostro va difuminado a propósito.",
          "liveness-focus": "La prueba de vida pide un gesto sorteado por el servidor dentro del óvalo guía.",
          "identity-confirmed": "Identidad confirmada: la cuenta ya puede operar.",
          "biometric-step": "La verificación dentro de la solicitud de una póliza: consejos antes de empezar y la opción de seguir en el celular.",
          "biometric-verified": "Verificación superada, con la concordancia con la cédula.",
          home: "La portada: una simulación real de crédito y el sello de identidad verificada.",
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
      live: "Live",
      sourceCode: "Code",
      caseStudy: "Read case study",
      moreOnGithub: "More projects on GitHub",
      readMinutes: (n) => `${n} min read`,
      fromProject: "From the project",
      readNote: "Read the note",
      nextNote: "Next note",
      seeCaseStudy: (title) => `See the ${title} case study`,
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
      roleLinks: "Role links",
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
      notes: "Notes",
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
          "Seven systems, one of them in production. Each has its own case study with screenshots, architecture and the decisions I made.",
      },
      experience: { title: "Experience" },
      notes: {
        title: "Notes",
        intro: "What I learned solving a specific problem, with the real code.",
      },
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
      availability: "Open to new opportunities",
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
        linkText: {
          product: { label: "Migo", note: "The company's invoicing system" },
          apiDocs: { label: "Migo API", note: "I published its documentation" },
        },
        bullets: [
          "Build and maintain **Java/Spring Boot microservices**: REST APIs, business logic and PostgreSQL persistence.",
          "Delivered **10+ CRUD modules** in the main API service, including the invoicing module and shared utility endpoints for other teams.",
          "Extend and support **legacy Spring MVC** applications, adding features and fixing defects in inherited code.",
          "Document APIs with Swagger/OpenAPI and cover features with Mockito unit tests, consistently keeping **95%+ code coverage**.",
          "Containerize services with Docker, work in Git/GitHub with branches, PRs and code review, and build Flutter UIs consuming the backend, in a Scrum team on Jira.",
        ],
      },
    ],

    notes: {
      "refresh-token-rotation": {
        title: "Rotating refresh tokens without logging anyone out on a double click",
        summary:
          "Every refresh swaps the token, and reusing an old one ends the whole session. The catch: two tabs refreshing at once look like theft.",
        body: [
          "In Fiado, the loan and investment simulator we built as a team for a credit union, I owned sign-up and sessions. A session lives in two httpOnly cookies: an access token (a 15-minute JWT) and a 30-day refresh token to get a new one without typing the password again. The second one is what matters: whoever holds it keeps the account for a month.",
          { h: "Opaque, and only its fingerprint in the database" },
          "The refresh token is not a JWT: it is 32 random bytes. Its validity lives in an `AuthSession` row, not in the token, so it can really be revoked. The database stores its SHA-256, not the token: a leaked table would not let anyone in.",
          { code: "token" },
          "And the cookie is only sent to `/api/auth`: the browser doesn't even attach it to the rest of the API.",
          { code: "cookie" },
          { h: "Every refresh replaces it" },
          "On refresh, the used token is marked (`rotatedAt`) and a new one is issued in the same **family** (`familyId`: one per sign-in). Each token works once. If one that was already used shows up, someone else has a copy: the owner or a thief, and the server can't tell which. So it revokes the whole family and both have to sign in again. A stolen cookie doesn't survive its owner's next refresh.",
          { code: "reuse" },
          { h: "The catch: two tabs at once" },
          "If two requests refresh with the same token at almost the same time (two tabs, a double click, a retry), both read it as valid. The second one to write would find it already rotated and, under the rule above, would end the session of someone who did nothing wrong.",
          "So the token isn't marked by reading and then writing, but with **a single write conditioned on its state**:",
          { code: "race" },
          "The database picks the winner: only one of the two writes finds the row unrotated. The loser gets a 401 and revokes nothing; the new cookie the winner set works for both tabs. The theft alarm only fires when the token was already rotated when read, not on a tie.",
          { h: "What I take from it" },
          "A security rule that punishes reuse has to tell reuse apart from concurrency. That can't be done in the application with two queries in a row: it has to be left to the database, in one atomic write.",
        ],
      },
      "id-card-two-faces": {
        title: "The Ecuadorian ID card has two faces",
        summary:
          "Face verification worked with the test photos and rejected almost every real ID card. Four fixes, and a threshold calibrated with data.",
        body: [
          "In Fiado, to open an investment you have to prove you are the holder of the ID card: a liveness check with the camera and a match of your face against the photo on the document. I built it with face-api on the NestJS backend, on WebAssembly, with no GPU or native binaries. The first version worked perfectly with the sample photos and rejected almost every real ID card.",
          { h: "Two faces where I expected one" },
          "The rule was: exactly one face per image, so nobody verifies with someone else next to them. But the Ecuadorian ID card carries, besides the portrait, a smaller **ghost portrait**, so every card \"had two people\". On the card, then, the largest face counts: I detect them all and sort them by area.",
          { code: "largest" },
          { h: "In the selfie, when does a second face count?" },
          "In the live frame the rule does have to exist, but counting any face was too much: a picture on the wall, someone walking by in the background or a false positive brought the verification down. Now a second face only invalidates the capture if the detector is confident (0.7 or more) **and** it is at least a quarter the size of the main one.",
          { code: "relevant" },
          { h: "Rotated photos and tiny portraits" },
          "Two more failures came from the photo, not the person. Photos taken with a phone sometimes arrived rotated and the detector found nothing: if no face shows up, I try rotating the image by 90° until it comes full circle. And the portrait takes up little of the card: searching for it in the image scaled down to 1280 px is fine, but taking the descriptor from there loses detail. The descriptor comes from a crop of the portrait at full resolution.",
          { h: "A measured threshold, not the usual one" },
          "face-api usually takes a distance of 0.6 between descriptors to mean \"same person\". With the sample photos, the same person landed between 0.05 and 0.35, and different people from 0.47. A real ID card (printed, with holograms, with a photo from years ago) pushes the holder away from their selfie, so the threshold ended up at 0.5: it accepts the holder without reaching 0.6. And it is set per environment, because with more real cards it would need measuring again.",
          { code: "threshold" },
          { h: "What it doesn't do" },
          "This liveness check stops a printed or on-screen photo, which doesn't turn or smile on request. It is not a replacement for a certified passive detector (ISO/IEC 30107-3) against masks or real-time deepfakes. That is why recognition sits behind an interface (`BiometricProvider`): swapping face-api for a commercial provider leaves the rest of the system untouched.",
        ],
      },
    },

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
      helpdesk: {
        title: "CTT-FISEI course assistant",
        subtitle: "An AI sales advisor on Telegram and a dashboard to take over live",
        summary:
          "AI sales agent for the FISEI Technology Workshops (UTA): it answers on Telegram, by text or voice, with the real course catalog, and an operator can take over the conversation from a real-time dashboard without the user noticing. I built it on my own at the UTA 2026 Hackathon, orchestrating AI coding agents.",
        client: "UTA 2026 Hackathon · CTT-FISEI Technology Workshops",
        description: [
          "The challenge: a training centre gets questions at all hours, and a menu bot or a late reply loses the prospect. The advisor answers on Telegram at any hour with the CTT-FISEI's 18 real courses: she recommends one or two based on the profile, handles objections and leads to enrollment. Every message shows up instantly in a dashboard where the operator sees each prospect's state (interested, hesitant, frustrated or hot lead) and can take over: the AI pauses and the operator replies through the same bot.",
          "A single LLM call per message, with JSON output validated with zod (reply, lead state, intent, profile and whether a human is needed): half the latency and tokens of chaining a classifier and a generator. The model is never the source of commercial data: prices come from the database, every amount in a reply is checked against the catalog and the enrollment link is built by the server. The dashboard reads from Supabase in real time and writes only through the authenticated API: the public key can't change anything.",
        ],
        features: [
          "Replies in the user's language and understands voice notes: Gemini transcribes them, with no other service.",
          "Real catalog of 18 courses, synced every six hours with the CTT's official website; if the site goes down or changes its HTML, the previous catalog is kept. Each course's status is computed from the date in Ecuador and the site's enrollment button: the site listed 2025 courses that had already ended as open.",
          "Profiles the prospect through conversation (name, interest, level, availability, participant type) and quotes the price for their audience: UTA student, UTA graduate or staff, or general public.",
          "The AI pauses on its own when the user is frustrated or asks for a person. On taking over, the operator gets an automatic summary (interest, objections, next step); on handing back, the AI picks up knowing what the human said.",
          "Layered defence against prompt injection: user input is delimited as data, a pre-check catches false authority, DAN, \"reveal your prompt\" or \"promised\" prices, and the output is checked against the catalog. If it fails, it regenerates once or sends a safe reply.",
          "Never leaves the user without an answer: a chain of five Gemini models, each with its own quota, skips 429s, 404s and 5xx errors.",
          "Live metrics: people served, distribution by state, hot leads, handovers, blocked manipulation attempts, latency, tokens and model fallbacks.",
          "Operator sign-in with an HMAC token, attempt limits and constant-time comparison; Telegram webhook with `secret_token` and read-only RLS for the dashboard.",
          "**19 agent evaluation cases** passing (sales, objections, closing, frustration, typos, English and six attacks), **46 unit tests** and CI on GitHub Actions.",
        ],
        challenge: {
          title: "The AI spoke after the operator had taken over",
          body: "A message takes a second or two between arriving and Gemini replying. If the operator clicked \"Take over\" in that gap, the AI's reply went out anyway and crossed with theirs: the pause was checked when the message arrived, not when the reply was sent. Now `ai_paused` is read again right before sending. If the operator took over during inference, the reply isn't sent: it's stored as discarded and the dashboard shows it struck through, so you can see what the AI would have said.",
        },
        role: "The whole project, on my own. I worked out the challenge and the rubric, designed the architecture and the data model, decided what to cut to make the deadline, set up Telegram, Gemini, Supabase, Render and Vercel, and tested the bot as a real user on every iteration. The code was written by AI agents I orchestrated: Claude Code planned, wrote a tight spec per task (allowed files, contracts and definition of done), launched the implementers (Cursor Agent CLI, up to three in parallel on separate folders), reviewed every diff, ran the tests and deployed. 23 tasks, one commit per task.",
        scope:
          "Built at a hackathon: planning started at 11:36 and the deadline was 13:00. The first version (bot, dashboard and handover) was in production before the cutoff; the rest of the day went into the real catalog, the CTT's visual identity, robustness, tests and CI.",
        metrics: {
          time: { value: "85 min", label: "from planning to the bot and dashboard in production" },
          eval: "agent test cases passing, six of them attacks",
          tests: "unit tests, in CI on GitHub Actions",
          fallback: "Gemini models in the fallback chain",
        },
        nodes: {
          dashboard: "Control panel",
          guardrails: "Guardrails",
          catalog: "Catalog",
          enrollment: "Enrollment",
        },
        shots: {
          "operator-chat": "The operator has taken over: the AI paused because the prospect asked for an advisor. The conversation is a demo.",
          "advisor-summary": "The automatic summary for the advisor: interest, objections, state and next step.",
          metrics: "Live metrics: the prospect thermometer, handovers, blocked manipulation attempts, latency and tokens.",
          courses: "The 18 courses synced with the official website, each with its computed status.",
          "public-landing": "The public page: the QR code to the bot and the courses open for enrollment.",
          "mobile-login": "Operator sign-in, on mobile.",
        },
      },
      fiado: {
        title: "Fiado",
        subtitle: "Live face verification for a credit union",
        summary:
          "A loan and investment simulator for a credit union. My part: confirming who is investing with a live liveness check and a match of their face against their ID card (from a phone too), sign-up and sign-in, and the landing page.",
        client: "Academic project · Engineering Economics for Software, UTA",
        description: [
          "Fiado simulates the digital services of a credit union: loans with the French and German amortization systems, with the schedule as a PDF, and fixed-term investments you apply for online. To open one, just like in a banking app, you have to prove you are the holder of the ID card. That biometric verification is my part, along with the accounts and sessions it depends on, and the landing page.",
          "Detection in the browser only guides; the server decides. The client asks for two random gestures, guides the person with the oval and sends a frontal frame, one per gesture and a closing frontal one. The server checks that they are all the same person, that each gesture was made and that the face matches the one on the ID: a photo or a pre-recorded video won't pass. And recognition sits behind an interface (`BiometricProvider`): swapping face-api for a commercial provider leaves the rest untouched.",
        ],
        features: [
          "After signing up, the account exists but can't operate until a live face matches the ID card photo. After five failed attempts it locks, and an administrator unlocks it.",
          "Challenge-response liveness: the server draws two of three gestures (turn left, turn right or smile) in a single-use session that expires in three minutes.",
          "face-api runs in the NestJS backend on WebAssembly, with no GPU or native binaries, and checks each gesture on the frame's 68 facial landmarks.",
          "The ID match uses 128-dimension face descriptors. The threshold and attempts are configurable, and every attempt is audited with its scores and the reason for a rejection.",
          "Without a camera, you continue on your phone through a ten-minute QR code. The computer sees live, over Server-Sent Events, which step the phone is on and whether it was closed (a heartbeat every two seconds). Tokens are stored as SHA-256.",
          "The same verification covers sign-up, investment applications and password recovery.",
          "Sign-up and sign-in with httpOnly cookies. The refresh token rotates on every renewal, and reusing an already-rotated one revokes its whole family: a stolen cookie doesn't outlive its owner. Passwords use scrypt from `node:crypto`, with no native dependencies.",
          "The landing page shows a real simulation (French system) and the products from the API, with scroll reveals that respect reduced motion.",
          "**30 unit tests** for the module (the gesture metrics and the provider with real faces) and e2e tests for the whole flow, with a deterministic simulated provider.",
        ],
        challenge: {
          title: "Two faces on one ID card",
          body: "The first version required exactly one face per image and rejected almost every ID card: the Ecuadorian one carries a smaller ghost portrait next to the main one, and photos sometimes arrived rotated. Now the largest face on the card is used, the photo is straightened if no face shows up, and the descriptor comes from a full-resolution crop of the portrait, not the downscaled image. On the selfie, a second face only invalidates the capture if it is clear and close in size to the main one: a picture on the wall or someone walking behind no longer breaks the verification.",
        },
        role: "The biometric flow end to end: the biometrics module in NestJS and Prisma (liveness, face matching and attempt auditing), sign-up identity confirmation, the handoff to the phone with a QR code and Server-Sent Events, and their guided screens in Next.js. Also sign-up and sign-in with refresh-token rotation, and the site's landing page. In a team of six.",
        scope:
          "The rest of the system was built by the team: the loan (French and German) and investment simulators, the PDF amortization schedule and the admin panel. Those parts aren't mine: only what I built is shown here.",
        metrics: {
          gestures: { value: "2 of 3", label: "random gestures, drawn by the server" },
          handoff: "continue on the phone, live on the computer",
          tests: "unit tests for the biometrics module",
          landmarks: "facial landmarks to check each gesture",
        },
        nodes: {
          web: "Web portal",
          phone: "Phone",
          auth: "Session",
          biometrics: "Biometrics",
          handoff: "QR handoff",
          simulators: "Simulators",
        },
        shots: {
          "identity-document": "Step 1: the ID card photo, with what to do and avoid, and consent for the biometric data.",
          liveness: "Liveness check: the server asked to turn the head left. The face is blurred on purpose.",
          "liveness-focus": "The liveness check asks for a gesture drawn by the server, inside the guide oval.",
          "identity-confirmed": "Identity confirmed: the account can now operate.",
          "biometric-step": "Verification inside an investment application: tips before starting and the option to continue on a phone.",
          "biometric-verified": "Verification passed, with the match against the ID card.",
          home: "The landing page: a real loan simulation and the verified-identity badge.",
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
