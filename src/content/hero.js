/**
 * Las cuatro capas de la pila 3D de la portada: lo que no se traduce. El
 * nombre de cada capa está en `copy.js` (`hero.layers[id]`).
 *
 *   skill  el grupo de `skills.js` al que lleva la capa al pulsarla: la pila
 *          es también un índice del stack.
 *   tech   lo que se lee bajo el nombre. Nombres propios.
 *
 * El orden es el de la pila, de arriba abajo. La capa "api" es la propia y va
 * en el color de acento.
 */
export const heroLayers = [
  { id: "client", skill: "frontend", tech: "Next.js · Flutter" },
  { id: "api", skill: "backend", tech: "Spring Boot · NestJS" },
  { id: "data", skill: "data", tech: "PostgreSQL · MongoDB" },
  { id: "infra", skill: "devops", tech: "Docker · Azure" },
];

export default heroLayers;
