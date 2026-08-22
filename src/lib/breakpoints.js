/**
 * Punto de corte ÚNICO para toda la app.
 * Debe coincidir con el valor usado en `src/styles/mobile.css`.
 * Antes había tres valores distintos (768 / 1023 / 1024) y eso rompía
 * el comportamiento entre 769px y 1023px.
 */
export const MOBILE_BREAKPOINT = 1024;

/** Media query para "es móvil o tablet". */
export const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

/** Media query para "el dispositivo tiene puntero fino" (ratón, no dedo). */
export const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
