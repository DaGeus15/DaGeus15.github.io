/**
 * Presets de animación compartidos.
 *
 * Todo el "feel" del sitio se ajusta desde aquí: si querés que las
 * transiciones sean más rápidas o más suaves, cambiá estos valores y se
 * aplica en todos lados.
 *
 * Filosofía: macOS usa springs cortos y firmes. Nada por encima de ~0.45s.
 */

/** Curva de salida principal — coincide con --ease-out en CSS. */
export const EASE_OUT = [0.23, 1, 0.32, 1];

/**
 * Springs reutilizables, descritos con DOS parámetros en vez de tres.
 *
 *   bounce          cuánto sobrepasa. 0 = llega y se queda, sin rebote.
 *                   ~0.2 = rebota un punto. Es 1 − ζ (razón de amortiguación).
 *   visualDuration  cuánto tarda en PARECER que llegó, en segundos. No es la
 *                   duración total: el grueso del recorrido pasa antes de ese
 *                   tiempo y el rebote, si lo hay, después.
 *
 * `stiffness`/`damping`/`mass` describen lo mismo, pero no se pueden discutir:
 * hay que resolver ζ = c / (2·√(k·m)) mentalmente para saber si algo rebota.
 * Con estos dos, el valor se lee.
 *
 * Regla para el rebote: sólo lo lleva lo que venía de un gesto con inercia.
 * El dock lo lleva porque el cursor lo atraviesa con velocidad; un panel que
 * simplemente apareció, no — ahí el sobrepaso se lee como goma.
 */
export const spring = {
  /** Interacciones directas: hover, tap, magnetic. Respuesta inmediata. */
  snappy: { type: "spring", bounce: 0, visualDuration: 0.25 },
  /** Cambios de layout: expandir/colapsar tarjetas. */
  layout: { type: "spring", bounce: 0, visualDuration: 0.35 },

  /* Los tres de abajo eran un único preset `soft` con ζ = 1.16, es decir
     SOBREamortiguado: se arrastraba hasta el destino. Servía a la vez al
     spotlight, al dock y a la inclinación del retrato, que piden cosas
     opuestas, así que se parte en tres. */

  /** Fondo que va por detrás del cursor a propósito (spotlight). */
  ambient: { type: "spring", bounce: 0, visualDuration: 0.5 },
  /** Magnificación del dock. Rápido y con un punto de sobrepaso, como macOS. */
  dock: { type: "spring", bounce: 0.18, visualDuration: 0.28 },
  /** Inclinación 3D del retrato: tiene que ir pegada al cursor. */
  tilt: { type: "spring", bounce: 0, visualDuration: 0.22 },
  /** Cajón móvil. Los valores que usa Apple para hojas y cajones. */
  drawer: { type: "spring", bounce: 0.2, visualDuration: 0.3 },
};

/**
 * Suavizado del progreso de scroll para la rueda de la vista resumida.
 *
 * Excepción consciente al vocabulario bounce/visualDuration del resto: esto
 * NO es un gesto con destino, es un seguidor continuo de un valor que cambia
 * con la rueda del ratón. Para eso la forma natural es rigidez/amortiguación
 * con un `restDelta` fino, que es como se afina un `useSpring` que persigue un
 * valor vivo sin rebotar ni quedarse corto. Amortiguado del todo (sin
 * sobrepaso): la rueda no debe rebotar al parar el scroll.
 */
export const scrollSpring = { stiffness: 140, damping: 32, mass: 0.35, restDelta: 0.0005 };

/**
 * Proyecta dónde acabaría algo soltado a `velocity` px/s.
 *
 * No es la fórmula de libro (v²/2a) sino un decaimiento exponencial, que es
 * la que usan de verdad los sistemas con inercia. Sirve para decidir por a
 * dónde VA un gesto en vez de por dónde se soltó: un toque corto y rápido
 * cierra el cajón aunque apenas se haya movido, que es lo que espera la mano.
 *
 * `deceleration` 0.998 es el tacto del scroll normal; más bajo, más seco.
 */
export const project = (velocity, deceleration = 0.998) =>
  (velocity / 1000) * (deceleration / (1 - deceleration));

/** Transiciones basadas en duración, para fades y filtros. */
export const tween = {
  fast: { duration: 0.2, ease: EASE_OUT },
  base: { duration: 0.32, ease: EASE_OUT },
  slow: { duration: 0.45, ease: EASE_OUT },
};

/**
 * Duración del morfeo del armazón al cambiar resumen ↔ detalle.
 * Debe coincidir con --dur-shell en src/styles/tokens.css.
 */
export const SHELL_MS = 440;

/**
 * Entrada/salida de las tarjetas de sección: fundido cruzado puro.
 *
 * Sin `scale`, sin `y`, sin `filter: blur`:
 *   - el armazón ya cambia de tamaño por CSS; escalar encima da la sensación
 *     de "estirado";
 *   - un desplazamiento vertical convierte el cambio de sección en un
 *     deslizamiento, y ahí la geometría no cambia: lo que toca es un
 *     desvanecido en el sitio, como en macOS;
 *   - animar `blur()` sobre algo que ya tiene `backdrop-filter` obliga a
 *     recomponer el fondo en cada fotograma.
 *
 * Tampoco lleva `delay`: al cambiar de sección no hay nada que esperar y el
 * retardo se veía como un hueco vacío. Al cambiar de modo, que el contenido
 * aparezca mientras el marco todavía se mueve se lee como un solo gesto.
 */
/** Entrada del contenido. */
export const cardEnter = { duration: 0.3, ease: EASE_OUT };

/** Salida algo más corta, para que el cruce no se vea translúcido de más. */
export const cardExit = { duration: 0.2, ease: EASE_OUT };

/* Las transiciones van dentro de cada variante: AnimatePresence usa una sola
   prop `transition` para entrada y salida, y aquí necesitan durar distinto. */
export const cardVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: cardEnter },
  exit: { opacity: 0, transition: cardExit },
};

/** Contenedor con hijos escalonados (skills, proyectos, certificaciones). */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.035, delayChildren: 0.04 },
  },
};

/** Item individual dentro de un `staggerContainer`. */
export const staggerItem = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring.snappy },
};

/** Revelado de texto carácter por carácter (usado por SplitText). */
export const charVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: spring.snappy },
};
