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

/**
 * Ancho del cajón móvil, en px. Debe coincidir con `--drawer-w` en
 * `src/styles/tokens.css` — mismo trato que `--dur-shell` / `SHELL_MS`.
 *
 * Hace falta en JS porque el cajón se arrastra: el gesto necesita saber
 * dónde está el tope y a partir de qué punto soltar cierra en vez de abrir,
 * y eso no se puede leer de una custom property sin medir en cada gesto.
 */
export const DRAWER_WIDTH = 280;
