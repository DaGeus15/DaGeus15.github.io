import { Renderer, Camera, Transform, Box, Program, Mesh, Vec3, Raycast } from "ogl";
import { VIEW, PX, SLAB, slabY, slabAnchor } from "./stackGeometry";
import { HOVER_QUERY } from "@/lib/breakpoints";

/**
 * Escena OGL de la pila de la portada. Se importa dinámicamente desde
 * `SystemStack.jsx`, así que OGL va en su propio fragmento y no pesa en la
 * carga inicial.
 *
 * Reglas de rendimiento (ver AGENTS.md, "3D"):
 *   · Pinta bajo demanda: sólo mientras algo se está moviendo hacia su
 *     objetivo (puntero, scroll, cambio de tema). En reposo, cero fotogramas.
 *   · Se para fuera de pantalla (IntersectionObserver).
 *   · DPR limitado: 2 con ratón, 1.5 en táctil.
 *   · Sin WebGL (o si falla algo), devuelve null y se queda el SVG.
 *
 * Devuelve `{ pick, setHover, dispose }`: `pick` dice qué losa hay bajo un
 * punto de la pantalla (un rayo contra las cajas), `setHover` levanta una
 * losa y enciende su filo. Quien decide el hover es `SystemStack.jsx`.
 *
 * Mate: sin luces especulares ni reflejos. Cada cara toma su color de los
 * tokens (`--stack-*`) según hacia dónde mira, igual que el SVG, y los filos
 * son una línea de 1px calculada con derivadas de pantalla.
 */

const vertex = /* glsl */ `#version 300 es
in vec3 position;
in vec3 normal;
in vec2 uv;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
out vec3 vNormal;
out vec2 vUv;
void main() {
  vNormal = mat3(modelMatrix) * normal;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragment = /* glsl */ `#version 300 es
precision highp float;
uniform vec3 uTop;
uniform vec3 uLeft;
uniform vec3 uRight;
uniform vec3 uEdge;
in vec3 vNormal;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec3 n = normalize(vNormal);
  // Con la cámara en (1, 1, 1): la cara +Y es la de arriba, la +Z la de la
  // izquierda y la +X la de la derecha. Al girar, los colores se mezclan.
  float wt = max(n.y, 0.0);
  float wl = max(n.z, 0.0);
  float wr = max(n.x, 0.0);
  float wb = max(-n.x, 0.0) + max(-n.z, 0.0) + max(-n.y, 0.0);
  vec3 color = (uTop * wt + uLeft * wl + uRight * (wr + wb)) / max(wt + wl + wr + wb, 1e-4);
  // Filo de ~1px en pantalla en el borde de cada cara.
  vec2 d = fwidth(vUv) * 1.25;
  vec2 inside = smoothstep(vec2(0.0), d, vUv) * smoothstep(vec2(0.0), d, 1.0 - vUv);
  fragColor = vec4(mix(uEdge, color, inside.x * inside.y), 1.0);
}`;

/** `#rrggbb` → [r, g, b] en 0..1 (sRGB, sin convertir: igual que el SVG). */
function rgb(hex) {
  const h = hex.trim().replace("#", "");
  const n = parseInt(h.length === 3 ? [...h].map((c) => c + c).join("") : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function readPalette() {
  const css = getComputedStyle(document.documentElement);
  const get = (name) => rgb(css.getPropertyValue(name) || "#808080");
  return {
    top: get("--stack-top"),
    topHover: get("--stack-top-hover"),
    left: get("--stack-left"),
    right: get("--stack-right"),
    edge: get("--stack-edge"),
    accentTop: get("--stack-accent-top"),
    accentEdge: get("--stack-accent-edge"),
  };
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
    // Un contexto perdido (p. ej. un lienzo reutilizado tras desmontar, que
    // libera el suyo) no compila shaders: mejor quedarse con el SVG.
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

  const scene = new Transform();
  const stack = new Transform();
  stack.setParent(scene);

  const geometry = new Box(gl, { width: SLAB.size, height: SLAB.thick, depth: SLAB.size });
  const palette = readPalette();
  const slabs = Array.from({ length: count }, (_, i) => {
    const accent = i === accentIndex;
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTop: { value: accent ? palette.accentTop : palette.top },
        uLeft: { value: palette.left },
        uRight: { value: palette.right },
        uEdge: { value: accent ? palette.accentEdge : palette.edge },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    mesh.position.y = slabY(i, count);
    mesh.setParent(stack);
    return { mesh, program, accent };
  });

  // Si algún programa no enlazó, OGL lo deja sin `uniformLocations` y el
  // primer render lanza. Sin escena, se queda el SVG.
  if (slabs.some(({ program }) => !program.uniformLocations)) return null;

  const raycast = new Raycast();
  const meshes = slabs.map((s) => s.mesh);
  let palette_ = palette;
  let hovered = -1;

  /* Estado: valor actual y objetivo. El bucle acerca uno al otro con un
     amortiguado exponencial (sin rebote) y se para cuando llegan. */
  const now = { rx: 0, ry: 0, gap: SLAB.gap };
  const goal = { rx: 0, ry: 0, gap: SLAB.gap };
  // Elevación de cada losa (la que está bajo el cursor sube).
  const lift = new Array(count).fill(0);
  const liftGoal = new Array(count).fill(0);
  const LIFT = reduced ? 0.12 : 0.3;
  const pointer = { x: 0, y: 0 };
  let scrollP = 0;
  let visible = true;
  let size = { w: 1, h: 1 };
  let raf = 0;
  let last = 0;
  let lost = false;

  const anchor = new Vec3();

  function place() {
    stack.rotation.x = now.rx;
    stack.rotation.y = now.ry;
    slabs.forEach(({ mesh }, i) => {
      mesh.position.y = slabY(i, count, now.gap) + lift[i];
    });
    scene.updateMatrixWorld();

    // Cada etiqueta se desplaza lo que se ha movido su esquina respecto a la
    // pose de reposo, que es donde la dejó el CSS.
    const scale = size.w / VIEW.w;
    labels.forEach((el, i) => {
      if (!el) return;
      const [x, y0, z] = slabAnchor(i, count, now.gap);
      const y = y0 + lift[i];
      const [rx0, ry0, rz0] = slabAnchor(i, count, SLAB.gap);
      camera.project(anchor.set(x, y, z).applyMatrix4(stack.worldMatrix));
      const sx = ((anchor.x + 1) / 2) * VIEW.w;
      const sy = ((1 - anchor.y) / 2) * VIEW.h;
      // Reposo: la misma esquina sin giro ni separación.
      camera.project(anchor.set(rx0, ry0, rz0));
      const bx = ((anchor.x + 1) / 2) * VIEW.w;
      const by = ((1 - anchor.y) / 2) * VIEW.h;
      el.style.transform = `translate(${((sx - bx) * scale).toFixed(2)}px, ${((sy - by) * scale).toFixed(2)}px)`;
    });

    if (!lost) renderer.render({ scene, camera });
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
    // La elevación, algo más rápida: es respuesta directa al cursor.
    const kl = 1 - Math.exp(-dt * 12);
    for (let i = 0; i < count; i++) {
      const delta = liftGoal[i] - lift[i];
      if (Math.abs(delta) > 1e-4) {
        lift[i] += delta * kl;
        moving = true;
      } else {
        lift[i] = liftGoal[i];
      }
    }
    place();
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
    place();
  };

  /** Colores de cada losa según el tema y el hover: la que está bajo el
      cursor aclara su cara superior y enciende el filo en latón. */
  const paint = () => {
    const p = palette_;
    slabs.forEach(({ program, accent }, i) => {
      const on = i === hovered;
      program.uniforms.uTop.value = accent ? p.accentTop : on ? p.topHover : p.top;
      program.uniforms.uLeft.value = p.left;
      program.uniforms.uRight.value = p.right;
      program.uniforms.uEdge.value = accent || on ? p.accentEdge : p.edge;
    });
  };

  const applyTheme = () => {
    palette_ = readPalette();
    paint();
    place();
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
    const [hit] = raycast.intersectBounds(meshes);
    return hit ? meshes.indexOf(hit) : -1;
  };

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
