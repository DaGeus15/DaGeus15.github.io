/**
 * Notas técnicas: lo que aprendí resolviendo algo concreto en un proyecto,
 * con el código real. Aquí va lo que no se traduce (fecha, proyecto, los
 * fragmentos de código); el texto vive en `copy.js`, en `notes[id]`, y se
 * cruza por `id` en `lib/content.js`.
 *
 * Las mismas reglas que los proyectos: sólo código que escribí yo (comprobado en
 * el historial de git del repositorio) y sólo hechos que están en él. Los
 * fragmentos se recortan y pierden los comentarios (estaban en español y la
 * nota sale en dos idiomas) y alguna conversión de tipos que sólo hace ruido,
 * pero la lógica no se reescribe: lo que se lee es lo que corre.
 *
 *   date     día de publicación de la nota (AAAA-MM-DD).
 *   project  id del proyecto del que sale; la nota enlaza a su caso.
 *   code     fragmentos que el texto cita con `{ code: "<clave>" }`; `file` es
 *            la ruta dentro del repositorio.
 */
export const notes = [
  {
    id: "refresh-token-rotation",
    date: "2026-10-21",
    project: "fiado",
    tags: ["NestJS", "Prisma", "PostgreSQL"],
    code: {
      token: {
        file: "backend/src/common/tokens.ts",
        source: `export const newRefreshToken = () => randomBytes(32).toString('base64url');

export const hashRefreshToken = (token: string) =>
  createHash('sha256').update(token).digest('hex');`,
      },
      cookie: {
        file: "backend/src/modules/auth/cookies.ts",
        source: `const REFRESH_PATH = '/api/auth';

response.cookie(REFRESH_COOKIE, tokens.refreshToken, {
  ...base(),
  path: REFRESH_PATH,
  maxAge: refreshTtlSeconds() * 1000,
});`,
      },
      reuse: {
        file: "backend/src/modules/auth/auth.service.ts",
        source: `if (session.rotatedAt || session.revokedAt) {
  await this.revokeFamily(session.familyId);
  throw new UnauthorizedException(
    'Sesión revocada: ese token de renovación ya había sido usado',
  );
}`,
      },
      race: {
        file: "backend/src/modules/auth/auth.service.ts",
        source: `const { count } = await this.prisma.authSession.updateMany({
  where: { id: session.id, rotatedAt: null, revokedAt: null },
  data: { rotatedAt: new Date() },
});
if (count === 0) throw new UnauthorizedException(INVALID_SESSION);

return this.issueSession(session.user, session.familyId, context);`,
      },
    },
  },
  {
    id: "id-card-two-faces",
    date: "2026-10-21",
    project: "fiado",
    tags: ["NestJS", "face-api", "WebAssembly"],
    code: {
      largest: {
        file: "backend/src/modules/biometrics/face-api.provider.ts",
        source: `const faces = await faceapi
  .detectAllFaces(tensor, new faceapi.SsdMobilenetv1Options({
    minConfidence: MIN_DETECTION_CONFIDENCE,
  }))
  .withFaceLandmarks()
  .withFaceDescriptors();

return faces.sort((a, b) => b.detection.box.area - a.detection.box.area);`,
      },
      relevant: {
        file: "backend/src/modules/biometrics/face-api.provider.ts",
        source: `const EXTRA_FACE_CONFIDENCE = 0.7;
const EXTRA_FACE_AREA_RATIO = 0.25;

export function relevantFaces<
  T extends { detection: { score: number; box: { area: number } } },
>(faces: T[]): T[] {
  const [main, ...rest] = faces;
  if (!main) return faces;
  return [
    main,
    ...rest.filter(
      (face) =>
        face.detection.score >= EXTRA_FACE_CONFIDENCE &&
        face.detection.box.area >=
          main.detection.box.area * EXTRA_FACE_AREA_RATIO,
    ),
  ];
}`,
      },
      threshold: {
        file: "backend/src/modules/biometrics/face-api.provider.ts",
        source: `const distanceAtThreshold = () => {
  const raw = Number(process.env.FACE_MATCH_DISTANCE);
  return raw > 0 && raw < 1 ? raw : 0.5;
};`,
      },
    },
  },
];

export const noteIds = notes.map((n) => n.id);

export default notes;
