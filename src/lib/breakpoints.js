/**
 * Punto de corte ÚNICO de ventana: 1024px. Por debajo, una sola columna y la
 * barra móvil; por encima, la columna fija a la izquierda. Se replica a mano
 * en los `@media` de `layout.css` (no hay otra forma de compartirlo con CSS).
 * Lo que depende del ancho de un panel, no de la ventana, usa `@container`.
 */
export const MOBILE_BREAKPOINT = 1024;

/** Media query para "el dispositivo tiene puntero fino" (ratón, no dedo). */
export const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
