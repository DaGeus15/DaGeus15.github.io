/**
 * Las cuatro capas de la pila 3D, en la sección Stack: lo que no se traduce.
 * El nombre de cada capa está en `copy.js` (`stackLayers.layers[id]`).
 *
 *   skill   el grupo principal de `skills.js`: el enlace de la etiqueta.
 *   groups  todos los grupos que representa la losa. Al leer una fila de
 *           cualquiera de ellos, la losa se levanta.
 *   tech    lo que se lee bajo el nombre. Nombres propios.
 *
 * El orden es el de la pila, de arriba abajo. La capa "api" es la propia y va
 * en el color de acento.
 */
export const stackLayers = [
  { id: "client", skill: "frontend", groups: ["frontend"], tech: "Next.js · Flutter" },
  { id: "api", skill: "backend", groups: ["backend", "node"], tech: "Spring Boot · NestJS" },
  { id: "data", skill: "data", groups: ["data"], tech: "PostgreSQL · MongoDB" },
  { id: "infra", skill: "devops", groups: ["devops"], tech: "Docker · Azure" },
];

export default stackLayers;
