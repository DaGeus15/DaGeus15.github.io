"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";

/**
 * Campo de estrellas del fondo, en tres partes con costes muy distintos:
 *
 *   1. Polvo (dos planos, lejano y cercano): muchos puntos en UN SVG por
 *      plano, pintado una vez. Con el scroll cada plano sube a su velocidad
 *      (paralaje), sólo con `transform`.
 *   2. Estrellas que titilan: pocas, cada una un `span` propio con una
 *      animación CSS de opacidad. Opacidad sobre una capa propia la anima el
 *      compositor, y el daño es el puntito, no el cielo. Si titilaran dentro
 *      del SVG, cada destello repintaría el SVG entero.
 *   3. Estrellas fugaces: tres trazos con ciclos largos y desfasados. Casi
 *      todo el ciclo están a opacidad 0; cruzan en un segundo y desaparecen.
 *
 * Las posiciones salen de un generador con semilla fija: el servidor y el
 * cliente calculan exactamente las mismas, así que el HTML hidrata igual.
 *
 * Con movimiento reducido no hay paralaje ni fugaces (desplazan cosas por la
 * pantalla); el titileo se queda, porque sólo cambia el brillo.
 */

/** mulberry32: pseudoaleatorio determinista y barato. */
function semilla(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generar(seed, n, rMin, rMax) {
  const rand = semilla(seed);
  return Array.from({ length: n }, () => ({
    x: (rand() * 100).toFixed(2),
    y: (rand() * 100).toFixed(2),
    r: (rMin + rand() * (rMax - rMin)).toFixed(2),
    o: (0.35 + rand() * 0.65).toFixed(2),
  }));
}

const FAR = generar(7, 110, 0.5, 1.1);
const NEAR = generar(23, 45, 0.9, 1.7);
const TWINKLE = generar(91, 14, 0, 0).map((s, i) => ({
  ...s,
  delay: `${((i * 0.73) % 5).toFixed(2)}s`,
  dur: `${(2.6 + ((i * 1.37) % 2.8)).toFixed(2)}s`,
}));

export default function Starfield({ progress }) {
  const reduce = useReducedMotion();
  const k = reduce ? 0 : 1;

  const farY = useTransform(progress, [0, 1], ["0vh", `${-5 * k}vh`]);
  const nearY = useTransform(progress, [0, 1], ["0vh", `${-14 * k}vh`]);

  return (
    <div className="stars">
      <motion.div className="stars__plane" style={{ y: farY }}>
        <svg className="stars__svg">
          {FAR.map((s, i) => (
            <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} opacity={s.o} />
          ))}
        </svg>
      </motion.div>

      <motion.div className="stars__plane stars__plane--near" style={{ y: nearY }}>
        <svg className="stars__svg">
          {NEAR.map((s, i) => (
            <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} opacity={s.o} />
          ))}
        </svg>
        {TWINKLE.map((s, i) => (
          <span
            key={i}
            className="stars__twinkle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}
          />
        ))}
      </motion.div>

      <span className="stars__shooting stars__shooting--1" />
      <span className="stars__shooting stars__shooting--2" />
      <span className="stars__shooting stars__shooting--3" />
    </div>
  );
}
