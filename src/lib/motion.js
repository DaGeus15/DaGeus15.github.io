/**
 * Presets de animación compartidos. Todo el "feel" del sitio se ajusta aquí.
 *
 * Los springs se describen con DOS parámetros en vez de tres:
 *   bounce          cuánto sobrepasa (0 = llega y se queda).
 *   visualDuration  cuánto tarda en PARECER que llegó, en segundos.
 * Con `stiffness`/`damping` hay que resolver ζ mentalmente para saber si algo
 * rebota; con estos dos, el valor se lee.
 *
 * Regla del rebote: sólo lo lleva lo que viene de un gesto con inercia. Aquí
 * no hay ninguno, así que nada rebota: el sobrepaso en un hover se lee como
 * goma, no como calidad.
 */

/** Curva de salida principal — coincide con --ease-out en CSS. */
export const EASE_OUT = [0.23, 1, 0.32, 1];

export const spring = {
  /** Interacciones directas: hover, pulsación. */
  snappy: { type: "spring", bounce: 0, visualDuration: 0.25 },
  /** Los dos bordes de la lente de la píldora: el de delante llega antes y el
      de detrás lo sigue, y la lente se estira como una gota. */
  lead: { type: "spring", bounce: 0, visualDuration: 0.2 },
  trail: { type: "spring", bounce: 0, visualDuration: 0.42 },
};

/** Transiciones por duración, para fundidos. */
export const tween = {
  fast: { duration: 0.2, ease: EASE_OUT },
  base: { duration: 0.32, ease: EASE_OUT },
};
