/**
 * Trayectoria fuera del trabajo: competencias, congresos y comunidad. Lo que
 * no se traduce; el nombre, quién lo organizó y la nota van en `copy.js`
 * (`activities[id]`) y se cruzan por `id`.
 *
 * El orden es el de la página, de más reciente a más antigua.
 *
 *   year     Sólo el año: de algunos no consta el día exacto.
 *   kind     "competition" | "congress" | "community": el icono y el rótulo.
 *   project  Si salió un proyecto, su caso de estudio.
 *   url      Una página pública del evento, si la hay.
 *
 * Sólo lo que está comprobado con su certificado o con los correos del
 * evento. Codificadas Season II no entra: se inscribió pero no compitió.
 */
export const activities = [
  { id: "grokbot", year: 2026, kind: "community" },
  { id: "hackathon", year: 2026, kind: "competition", project: "helpdesk" },
  { id: "congresoUta", year: 2026, kind: "congress" },
  { id: "codificadas", year: 2025, kind: "competition", url: "https://tcscodificadas.com/" },
  { id: "csei", year: 2024, kind: "congress" },
  { id: "hatunsoft", year: 2023, kind: "competition" },
];

export default activities;
