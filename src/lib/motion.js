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

/** Springs reutilizables. */
export const spring = {
  /** Interacciones directas: hover, tap, magnetic. Respuesta inmediata. */
  snappy: { type: "spring", stiffness: 400, damping: 30, mass: 0.6 },
  /** Cambios de layout: expandir/colapsar tarjetas. */
  layout: { type: "spring", stiffness: 300, damping: 32, mass: 0.9 },
  /** Movimiento ambiental suave: spotlight, dock. */
  soft: { type: "spring", stiffness: 150, damping: 20, mass: 0.5 },
};

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
