/**
 * Punto de corte ÚNICO de ventana: 1024px. Por debajo, una sola columna y la
 * píldora de navegación abajo; por encima, la portada dividida y la píldora
 * arriba. Se replica a mano en los `@media` de `styles/` (no hay otra forma de
 * compartirlo con CSS). Lo que depende del ancho de una tarjeta, no de la
 * ventana, usa `@container`.
 */
export const MOBILE_BREAKPOINT = 1024;

/** Media query para "el dispositivo tiene puntero fino" (ratón, no dedo). */
export const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
