import { Renderer, Camera, Transform, Geometry, Program, Mesh, RenderTarget, Vec3, Raycast } from "ogl";
import { VIEW, PX, SLAB, CORE, slabY, slabAnchor, roundedOutline } from "./stackGeometry";
import { HOVER_QUERY } from "@/lib/breakpoints";

/**
 * Escena OGL de la pila de la portada. Se importa dinámicamente desde
 * `SystemStack.jsx`, así que OGL va en su propio fragmento y no pesa en la
 * carga inicial.
 *
 * Liquid Glass en dos pasadas (aproximación web; sin HDR ni materiales
 * físicos). La referencia es el material de Apple, no el vidrio de verdad:
 * piezas redondeadas, cuerpo esmerilado y luminoso, y un filo de luz que
 * entra por un lado.
 *   1. Los NÚCLEOS —una placa luminosa dentro de cada losa, la capa que
 *      contiene— se pintan en una textura fuera de pantalla.
 *   2. Cada losa muestrea esa textura DESENFOCADA y desplazada según su
 *      normal (esmerilado y refracción, como el `backdrop-filter` de la
 *      píldora), con dispersión sólo en el borde, y suma un cuerpo lechoso,
 *      un brillo interior junto al borde, el filo de luz direccional (claro
 *      hacia la luz, oscuro al otro lado) y un panel que barre la cara de
 *      arriba al girar.
 * El bisel no está en la malla: cerca del borde el shader inclina la normal
 * hacia fuera, con la distancia al contorno redondeado (una SDF).
 *
 * Reglas de rendimiento (ver AGENTS.md, "3D"):
 *   · Pinta bajo demanda: sólo mientras algo se está moviendo hacia su
 *     objetivo (puntero, scroll, tema, el pulso de llegada). En reposo, cero
 *     fotogramas.
 *   · Se para fuera de pantalla (IntersectionObserver).
 *   · DPR limitado: 2 con ratón, 1.5 en táctil.
 *   · Sin WebGL 2 (o si falla algo), devuelve null y se queda el SVG.
 *
 * Devuelve `{ pick, setHover, dispose }`: `pick` dice qué losa hay bajo un
 * punto de la pantalla (un rayo contra sus límites), `setHover` levanta una
 * losa, enciende su núcleo y su filo. Quien decide el hover es
 * `SystemStack.jsx`.
 */

const vertex = /* glsl */ `#version 300 es
in vec3 position;
in vec3 normal;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
out vec3 vLocal;
out vec3 vLocalN;
void main() {
  vLocal = position;
  vLocalN = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

/* Distancia con signo al contorno redondeado (negativa dentro), en el plano
   XZ. `uB` es el semilado menos el radio. */
const sdf = /* glsl */ `
uniform vec2 uB;
uniform float uR;
float sdRound(vec2 p) {
  vec2 q = abs(p) - uB;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uR;
}
vec2 sdGrad(vec2 p) {
  const float e = 0.01;
  return normalize(vec2(
    sdRound(p + vec2(e, 0.0)) - sdRound(p - vec2(e, 0.0)),
    sdRound(p + vec2(0.0, e)) - sdRound(p - vec2(0.0, e))
  ) + 1e-6);
}`;

/* Núcleo: degradado suave hacia el centro y un marco fino, más tenue en los
   cantos que arriba. */
const coreFragment = /* glsl */ `#version 300 es
precision highp float;
uniform vec3 uCore;
uniform vec3 uCoreEdge;
uniform float uGlow;
${sdf}
in vec3 vLocal;
in vec3 vLocalN;
out vec4 fragColor;
void main() {
  float cap = step(0.5, abs(normalize(vLocalN).y));
  float d = -sdRound(vLocal.xz);
  float center = 1.0 - smoothstep(0.0, uB.x + uR, length(vLocal.xz) * 0.9);
  vec3 c = uCore * (0.55 + 0.45 * center) * uGlow;
  float frame = 1.0 - smoothstep(0.0, 0.03, abs(d - 0.12));
  c = mix(c, uCoreEdge * min(uGlow, 1.4), frame * 0.7 * cap);
  fragColor = vec4(c * mix(0.55, 1.0, cap), 1.0);
}`;

const glassFragment = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D tCore;
uniform vec2 uRes;
uniform vec3 uView;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uHalfY;
uniform float uBevel;
uniform float uRefract;
uniform float uFrost;
uniform vec3 uTint;
uniform float uBody;
uniform vec3 uEnvBase;
uniform vec3 uEnvKey;
uniform vec3 uEnvWarm;
uniform vec3 uEdge;
uniform vec3 uRimLight;
uniform float uEdgeGlow;
uniform float uBack;
uniform float uSheen;
${sdf}
in vec3 vLocal;
in vec3 vLocalN;
out vec4 fragColor;

// Estudio: luz cenital, un panel delante a la izquierda y un filo cálido
// (latón) desde la derecha. Suave: el Liquid Glass casi no refleja el
// entorno, deja pasar la luz.
vec3 env(vec3 r) {
  float key = smoothstep(0.35, 0.95, r.y);
  float box = smoothstep(0.55, 0.92, dot(r, normalize(vec3(-0.35, 0.55, 1.0))));
  float rim = smoothstep(0.62, 0.98, dot(r, normalize(vec3(1.0, 0.15, -0.55))));
  return uEnvBase + uEnvKey * (key * 0.7 + box * 0.4) + uEnvWarm * rim * 0.8;
}

// Esmerilado: cinco muestras alrededor del punto (el desenfoque de lo que
// hay detrás, como el backdrop-filter de la píldora).
vec4 frosted(vec2 uv) {
  vec2 r = uFrost / uRes;
  return (texture(tCore, uv) * 2.0
    + texture(tCore, uv + vec2(r.x, r.y))
    + texture(tCore, uv + vec2(-r.x, r.y))
    + texture(tCore, uv + vec2(r.x, -r.y))
    + texture(tCore, uv + vec2(-r.x, -r.y))) / 6.0;
}

void main() {
  vec3 n = normalize(vLocalN);
  float cap = step(0.5, abs(n.y));
  vec2 g = sdGrad(vLocal.xz);
  // Distancia al borde de la cara: al contorno en las tapas; arriba o abajo
  // en los cantos. Cerca del borde la normal se inclina hacia fuera.
  float d = max(cap > 0.5 ? -sdRound(vLocal.xz) : uHalfY - abs(vLocal.y), 0.0);
  vec3 outward = cap > 0.5 ? vec3(g.x, 0.0, g.y) : vec3(0.0, sign(vLocal.y), 0.0);
  float t = 1.0 - clamp(d / uBevel, 0.0, 1.0);
  vec3 nb = normalize(n + outward * t * t * 1.8);

  vec3 N = normalize(mat3(modelMatrix) * nb);
  vec3 V = normalize(uView);
  float F = mix(0.06, 1.0, pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0));

  // Refracción esmerilada; la dispersión sólo en el bisel.
  vec2 suv = gl_FragCoord.xy / uRes;
  vec2 off = (mat3(viewMatrix) * N).xy * uRefract * (0.3 + t * 2.4);
  float disp = 1.0 + t * 0.14;
  vec4 cr = frosted(suv - off / disp);
  vec4 cg = frosted(suv - off);
  vec4 cb = frosted(suv - off * disp);
  vec3 refr = vec3(cr.r, cg.g, cb.b);
  float refrA = max(cr.a, max(cg.a, cb.a));

  vec3 R = reflect(-V, N);
  float spec = pow(max(dot(R, normalize(vec3(-0.2, 1.0, 0.35))), 0.0), 90.0);

  // Filo de luz direccional en el contorno de arriba: la luz entra por la
  // izquierda de la pantalla (−x en el mundo), así que ese lado brilla y el
  // contrario queda en sombra. Gira con la pila.
  vec3 gw = normalize(mat3(modelMatrix) * vec3(g.x, 0.0, g.y));
  float toLight = dot(gw.xz, normalize(vec2(-1.0, -0.3)));
  float facing = max(toLight, 0.0);
  float shade = max(-toLight, 0.0);
  float line = 1.0 - smoothstep(0.0, fwidth(d) * 1.6, d);
  float band = 1.0 - smoothstep(0.0, 0.07, d);
  float topCap = step(0.5, n.y);
  float rimLit = topCap * (line * (0.35 + 1.1 * facing * facing) + band * facing * 0.45);
  float rimDark = topCap * line * shade * 0.6 + (1.0 - cap) * line * 0.35;
  // Brillo interior: la luz que se cuela por el borde del cuerpo.
  float glow = exp(-d / 0.16) * (cap > 0.5 ? 0.3 : 0.18);

  // Panel de luz que barre la cara superior al girar.
  vec3 wp = (modelMatrix * vec4(vLocal, 1.0)).xyz;
  float along = dot(wp.xz, vec2(0.7071, -0.7071));
  float glare = exp(-pow((along - 0.5) / 0.5, 2.0)) * topCap * uSheen;

  vec3 col = refr * (1.0 - F) + uTint * (uBody + glow) + env(R) * F * 0.6 + uEnvKey * glare + vec3(spec) * 0.7;
  col = mix(col, uRimLight, clamp(rimLit, 0.0, 1.0));
  col = mix(col, uEdge, clamp(rimDark * uEdgeGlow, 0.0, 1.0));

  float alpha = uBody + glow + F * 0.5 + refrA * (1.0 - F) * 0.92 + glare + spec + rimLit + rimDark * uEdgeGlow;
  fragColor = vec4(col, clamp(alpha, 0.0, 1.0) * uBack);
}`;

/** `#rrggbb` → [r, g, b] en 0..1. */
function rgb(value) {
  const h = value.trim().replace("#", "");
  const n = parseInt(h.length === 3 ? [...h].map((c) => c + c).join("") : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function readPalette() {
  const css = getComputedStyle(document.documentElement);
  const raw = (name) => css.getPropertyValue(name).trim();
  const color = (name) => rgb(raw(name) || "#808080");
  const num = (name, fallback) => {
    const v = parseFloat(raw(name));
    return Number.isFinite(v) ? v : fallback;
  };
  return {
    core: color("--stack-core"),
    coreEdge: color("--stack-core-edge"),
    accentCore: color("--stack-core-accent"),
    accentCoreEdge: color("--stack-core-accent-edge"),
    tint: color("--stack-glass-tint"),
    body: num("--stack-glass-body", 0.08),
    sheen: num("--stack-glass-sheen", 0.3),
    envBase: color("--stack-env-base"),
    envKey: color("--stack-env-key"),
    envWarm: color("--stack-env-warm"),
    edge: color("--stack-glass-edge"),
    rimLight: color("--stack-rim-light"),
    accentEdge: color("--stack-accent-edge"),
  };
}

/** Rectángulo redondeado extruido (tapas en abanico y cantos con normales
    suaves en las esquinas), centrado en el origen. */
function roundedSlab(gl, half, radius, thick) {
  const outline = roundedOutline(half, radius);
  const y = thick / 2;
  const position = [];
  const normal = [];
  const push = (p, n) => {
    position.push(...p);
    normal.push(...n);
  };
  for (let i = 0; i < outline.length; i++) {
    const a = outline[i];
    const b = outline[(i + 1) % outline.length];
    // Tapas: el orden deja la normal hacia fuera (cara delantera).
    push([0, y, 0], [0, 1, 0]);
    push([b.x, y, b.z], [0, 1, 0]);
    push([a.x, y, a.z], [0, 1, 0]);
    push([0, -y, 0], [0, -1, 0]);
    push([a.x, -y, a.z], [0, -1, 0]);
    push([b.x, -y, b.z], [0, -1, 0]);
    // Canto: dos triángulos con la normal de cada punto del contorno.
    const na = [a.nx, 0, a.nz];
    const nb = [b.nx, 0, b.nz];
    push([a.x, -y, a.z], na);
    push([a.x, y, a.z], na);
    push([b.x, y, b.z], nb);
    push([a.x, -y, a.z], na);
    push([b.x, y, b.z], nb);
    push([b.x, -y, b.z], nb);
  }
  return new Geometry(gl, {
    position: { size: 3, data: new Float32Array(position) },
    normal: { size: 3, data: new Float32Array(normal) },
  });
}

export function mountStack({ wrap, canvas, labels, accentIndex, count }) {
  let renderer;
  try {
    const fine = window.matchMedia(HOVER_QUERY).matches;
    renderer = new Renderer({
      canvas,
      dpr: Math.min(window.devicePixelRatio || 1, fine ? 2 : 1.5),
      alpha: true,
      antialias: true,
    });
    // Un contexto perdido no compila shaders: mejor quedarse con el SVG.
    if (!renderer.isWebgl2 || renderer.gl.isContextLost()) return null;
  } catch {
    return null;
  }

  const { gl } = renderer;
  gl.clearColor(0, 0, 0, 0);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Ortográfica e isométrica: el origen del mundo cae en (cx, cy) del viewBox.
  const camera = new Camera(gl, {
    left: -VIEW.cx / PX,
    right: (VIEW.w - VIEW.cx) / PX,
    top: VIEW.cy / PX,
    bottom: -(VIEW.h - VIEW.cy) / PX,
    near: 0.1,
    far: 100,
  });
  camera.position.set(12, 12, 12);
  camera.lookAt([0, 0, 0]);
  camera.updateMatrixWorld();

  // Dos escenas con la misma pose: los núcleos (a la textura) y el cristal.
  const coreScene = new Transform();
  const coreStack = new Transform();
  coreStack.setParent(coreScene);
  const scene = new Transform();
  const stack = new Transform();
  stack.setParent(scene);

  const target = new RenderTarget(gl, { width: 2, height: 2 });
  const res = [1, 1];
  const slabHalf = SLAB.size / 2;
  const coreHalf = (SLAB.size * CORE.inset) / 2;
  const slabGeometry = roundedSlab(gl, slabHalf, SLAB.radius, SLAB.thick);
  const coreGeometry = roundedSlab(gl, coreHalf, CORE.radius, CORE.thick);
  let palette = readPalette();

  const slabs = Array.from({ length: count }, (_, i) => {
    const accent = i === accentIndex;
    const coreProgram = new Program(gl, {
      vertex,
      fragment: coreFragment,
      uniforms: {
        uCore: { value: palette.core },
        uCoreEdge: { value: palette.coreEdge },
        uGlow: { value: 1 },
        uB: { value: [coreHalf - CORE.radius, coreHalf - CORE.radius] },
        uR: { value: CORE.radius },
      },
    });
    const core = new Mesh(gl, { geometry: coreGeometry, program: coreProgram });
    core.setParent(coreStack);

    // Cada losa, en dos mallas: las caras de atrás (tenues, dan grosor) y las
    // de delante. Se pintan de abajo arriba, que es de atrás adelante.
    const glass = (back) => {
      const program = new Program(gl, {
        vertex,
        fragment: glassFragment,
        transparent: true,
        depthWrite: false,
        cullFace: back ? gl.FRONT : gl.BACK,
        uniforms: {
          tCore: { value: target.texture },
          uRes: { value: res },
          uView: { value: [1, 1, 1] },
          uB: { value: [slabHalf - SLAB.radius, slabHalf - SLAB.radius] },
          uR: { value: SLAB.radius },
          uHalfY: { value: SLAB.thick / 2 },
          uBevel: { value: 0.18 },
          uRefract: { value: 0.03 },
          uFrost: { value: 7 * renderer.dpr },
          uTint: { value: palette.tint },
          uBody: { value: palette.body },
          uEnvBase: { value: palette.envBase },
          uEnvKey: { value: palette.envKey },
          uEnvWarm: { value: palette.envWarm },
          uEdge: { value: palette.edge },
          uRimLight: { value: palette.rimLight },
          uEdgeGlow: { value: 0.6 },
          uBack: { value: back ? 0.3 : 1 },
          uSheen: { value: back ? 0 : palette.sheen },
        },
      });
      const mesh = new Mesh(gl, { geometry: slabGeometry, program, renderOrder: -2 * i + (back ? 0 : 1) });
      mesh.setParent(stack);
      return mesh;
    };
    return { core, back: glass(true), front: glass(false), accent };
  });

  // Si algún programa no enlazó, OGL lo deja sin `uniformLocations` y el
  // primer render lanza. Sin escena, se queda el SVG.
  const programs = slabs.flatMap((s) => [s.core.program, s.back.program, s.front.program]);
  if (programs.some((p) => !p.uniformLocations)) return null;

  const raycast = new Raycast();
  const fronts = slabs.map((s) => s.front);
  let hovered = -1;

  /* Estado: valor actual y objetivo. El bucle acerca uno al otro con un
     amortiguado exponencial (sin rebote) y se para cuando llegan. */
  const now = { rx: 0, ry: 0, gap: SLAB.gap };
  const goal = { rx: 0, ry: 0, gap: SLAB.gap };
  const lift = new Array(count).fill(0);
  const liftGoal = new Array(count).fill(0);
  const glow = new Array(count).fill(1);
  const LIFT = reduced ? 0.12 : 0.3;
  const pointer = { x: 0, y: 0 };
  let scrollP = 0;
  let visible = true;
  let size = { w: 1, h: 1 };
  let raf = 0;
  let last = 0;
  let lost = false;

  /* El pulso de llegada: una luz baja una vez por las capas, de Cliente a
     Infra, como una petición que atraviesa el sistema. Sólo es luz (nada se
     desplaza), así que con movimiento reducido ocurre igual, más corto. */
  const PULSE_MS = reduced ? 900 : 1600;
  let pulseStart = -1;

  const anchor = new Vec3();

  function place(time) {
    stack.rotation.x = coreStack.rotation.x = now.rx;
    stack.rotation.y = coreStack.rotation.y = now.ry;

    const top = slabY(0, count, now.gap) + 1;
    const bottom = slabY(count - 1, count, now.gap) - 1;
    const p = pulseStart < 0 ? -1 : Math.min((time - pulseStart) / PULSE_MS, 1);
    const pulseY = top + (bottom - top) * p;

    slabs.forEach((s, i) => {
      const y = slabY(i, count, now.gap) + lift[i];
      s.core.position.y = s.back.position.y = s.front.position.y = y;
      const wave = p >= 0 && p < 1 ? Math.exp(-(((y - pulseY) / 0.55) ** 2)) : 0;
      s.core.program.uniforms.uGlow.value = glow[i] + wave * 0.9;
    });
    scene.updateMatrixWorld();
    coreScene.updateMatrixWorld();

    // Cada etiqueta se desplaza lo que se ha movido su esquina respecto a la
    // pose de reposo, que es donde la dejó el CSS.
    const scale = size.w / VIEW.w;
    labels.forEach((el, i) => {
      if (!el) return;
      const [x, y0, z] = slabAnchor(i, count, now.gap);
      const [rx0, ry0, rz0] = slabAnchor(i, count, SLAB.gap);
      camera.project(anchor.set(x, y0 + lift[i], z).applyMatrix4(stack.worldMatrix));
      const sx = ((anchor.x + 1) / 2) * VIEW.w;
      const sy = ((1 - anchor.y) / 2) * VIEW.h;
      camera.project(anchor.set(rx0, ry0, rz0));
      const bx = ((anchor.x + 1) / 2) * VIEW.w;
      const by = ((1 - anchor.y) / 2) * VIEW.h;
      el.style.transform = `translate(${((sx - bx) * scale).toFixed(2)}px, ${((sy - by) * scale).toFixed(2)}px)`;
    });

    if (lost) return;
    renderer.render({ scene: coreScene, camera, target });
    renderer.render({ scene, camera });
  }

  function frame(t) {
    raf = 0;
    const dt = Math.min((t - last) / 1000, 0.05) || 1 / 60;
    last = t;
    const k = 1 - Math.exp(-dt * (reduced ? 4 : 7));
    let moving = false;
    for (const key of ["rx", "ry", "gap"]) {
      const delta = goal[key] - now[key];
      if (Math.abs(delta) > 1e-4) {
        now[key] += delta * k;
        moving = true;
      } else {
        now[key] = goal[key];
      }
    }
    // La elevación y el brillo, algo más rápidos: responden al cursor.
    const kl = 1 - Math.exp(-dt * 12);
    for (let i = 0; i < count; i++) {
      const glowGoal = i === hovered ? 1.35 : 1;
      for (const [arr, goalValue] of [
        [lift, liftGoal[i]],
        [glow, glowGoal],
      ]) {
        const delta = goalValue - arr[i];
        if (Math.abs(delta) > 1e-4) {
          arr[i] += delta * kl;
          moving = true;
        } else {
          arr[i] = goalValue;
        }
      }
    }
    if (pulseStart >= 0 && t - pulseStart < PULSE_MS) moving = true;
    place(t);
    if (moving && visible) raf = requestAnimationFrame(frame);
  }

  function kick() {
    if (raf || !visible || lost) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function updateGoal() {
    const amp = reduced ? 0.5 : 1;
    goal.ry = (pointer.x * 0.32 + scrollP * 0.45) * amp;
    goal.rx = pointer.y * 0.08 * amp;
    goal.gap = SLAB.gap + scrollP * 1.1 * amp;
    kick();
  }

  const onPointer = (e) => {
    if (e.pointerType !== "mouse") return;
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    updateGoal();
  };
  const onLeave = (e) => {
    if (e.relatedTarget) return;
    pointer.x = 0;
    pointer.y = 0;
    updateGoal();
  };
  // Separación ligada al recorrido: 0 con la portada entera a la vista, 1
  // cuando ya ha salido media pila por arriba.
  const onScroll = () => {
    const rect = wrap.getBoundingClientRect();
    scrollP = Math.min(Math.max(-rect.top / (rect.height * 0.9), 0), 1);
    updateGoal();
  };

  const resize = () => {
    const rect = wrap.getBoundingClientRect();
    size = { w: Math.max(rect.width, 1), h: Math.max(rect.height, 1) };
    renderer.setSize(size.w, size.h);
    // La textura de los núcleos, al tamaño real del lienzo: el cristal la
    // muestrea por píxel de pantalla.
    res[0] = gl.drawingBufferWidth;
    res[1] = gl.drawingBufferHeight;
    target.setSize(res[0], res[1]);
    place(performance.now());
  };

  /** Colores según el tema y el hover: la losa bajo el cursor enciende su
      filo en latón; la de la API lo lleva siempre. */
  const paint = () => {
    const p = palette;
    slabs.forEach((s, i) => {
      const on = s.accent || i === hovered;
      s.core.program.uniforms.uCore.value = s.accent ? p.accentCore : p.core;
      s.core.program.uniforms.uCoreEdge.value = s.accent ? p.accentCoreEdge : p.coreEdge;
      for (const mesh of [s.back, s.front]) {
        const u = mesh.program.uniforms;
        u.uTint.value = p.tint;
        u.uBody.value = p.body;
        u.uEnvBase.value = p.envBase;
        u.uEnvKey.value = p.envKey;
        u.uEnvWarm.value = p.envWarm;
        u.uEdge.value = p.edge;
        u.uRimLight.value = on ? p.accentEdge : p.rimLight;
        if (mesh === s.front) u.uSheen.value = p.sheen;
      }
    });
  };

  const applyTheme = () => {
    palette = readPalette();
    paint();
    place(performance.now());
  };

  const setHover = (index) => {
    hovered = index;
    liftGoal.fill(0);
    if (index >= 0) liftGoal[index] = LIFT;
    paint();
    kick();
  };

  const pick = (clientX, clientY) => {
    if (lost) return null;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    raycast.castMouse(camera, [x, y]);
    const [hit] = raycast.intersectBounds(fronts);
    return hit ? fronts.indexOf(hit) : -1;
  };

  paint();

  const ro = new ResizeObserver(resize);
  ro.observe(wrap);
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) kick();
  });
  io.observe(wrap);
  const mo = new MutationObserver(applyTheme);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("pointerout", onLeave);
  window.addEventListener("scroll", onScroll, { passive: true });

  resize();
  onScroll();
  wrap.dataset.ready = "true";
  // El pulso arranca cuando el lienzo ya terminó de aparecer sobre el SVG.
  const pulseTimer = setTimeout(() => {
    pulseStart = performance.now();
    kick();
  }, 450);

  // Si el navegador retira el contexto en marcha (demasiados lienzos, GPU
  // reiniciada), se para todo y vuelve el SVG, que sigue en el DOM.
  const onLost = (e) => {
    e.preventDefault();
    lost = true;
    cancelAnimationFrame(raf);
    raf = 0;
    delete wrap.dataset.ready;
    labels.forEach((el) => el && (el.style.transform = ""));
  };
  canvas.addEventListener("webglcontextlost", onLost);

  const dispose = () => {
    clearTimeout(pulseTimer);
    canvas.removeEventListener("webglcontextlost", onLost);
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    mo.disconnect();
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("pointerout", onLeave);
    window.removeEventListener("scroll", onScroll);
    labels.forEach((el) => el && (el.style.transform = ""));
    delete wrap.dataset.ready;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };

  return { pick, setHover, dispose };
}
