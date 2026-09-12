"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { scrollSpring } from "@/lib/motion";
import useMediaQuery from "@/lib/useMediaQuery";
import { HOVER_QUERY } from "@/lib/breakpoints";

/** 0 = el borde superior de la tarjeta toca el fondo del contenedor (entrando)
 *  1 = su borde inferior toca el techo (saliendo). 0.5 = centrada. */
const NEUTRO = 0.5;

/**
 * Envuelve una tarjeta de la vista resumida y la hace girar como en una rueda
 * a medida que entra y sale por los bordes del área de scroll.
 *
 * El mecanismo de la "rueda" NO es el desenfoque —eso es sólo el remate—, sino
 * la perspectiva: cada tarjeta se inclina en X (convexa, vista desde fuera),
 * encoge y se atenúa cuanto más lejos está del centro. Todo eso son
 * `transform` + `opacity`, que van al compositor y se sostienen a 60fps.
 *
 * El progreso se calcula midiendo rectángulos EN VIVO, no con `useScroll`.
 * `useScroll` mide el contenedor y el objetivo una vez al montar: si en ese
 * momento la geometría todavía no está asentada —la foto y los iconos aún no
 * han cargado y cambian la altura de las tarjetas— la medida queda mal y el
 * progreso se atasca en 0, que es el estado de "entrando": todas las tarjetas
 * aparecían atenuadas, borrosas e inclinadas hasta que se hacía scroll. Un
 * `getBoundingClientRect()` no puede quedar obsoleto, y con un ResizeObserver
 * se recalcula solo cuando algo cambia de tamaño.
 *
 * Además arranca en NEUTRO, así que si algo fallara el peor caso es "sin
 * efecto", nunca "todo borroso".
 */
export default function WheelItem({ children, containerRef }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery(HOVER_QUERY);

  const progress = useMotionValue(NEUTRO);
  const p = useSpring(progress, scrollSpring);

  useEffect(() => {
    const el = ref.current;
    const container = containerRef?.current;
    if (!el || !container) return;

    let primera = true;

    const medir = () => {
      const c = container.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const recorrido = c.height + r.height;
      if (recorrido <= 0) return;
      const avance = (c.bottom - r.top) / recorrido;
      const v = avance < 0 ? 0 : avance > 1 ? 1 : avance;
      progress.set(v);
      // La primera medida es la buena de salida: sin salto animado desde
      // NEUTRO hasta donde de verdad está la tarjeta.
      if (primera) {
        primera = false;
        p.jump(v);
      }
    };

    medir();

    container.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    // Coge el cambio de altura cuando cargan la foto y los iconos.
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    ro.observe(container);

    return () => {
      container.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
      ro.disconnect();
    };
  }, [containerRef, progress, p]);

  /* Con `prefers-reduced-motion` la rueda NO se apaga del todo: se queda en un
     desvanecido suave. Lo que marea de este efecto es la inclinación 3D y el
     cambio de escala —el desplazamiento vestibular—, no que algo se atenúe;
     la propia guía de movimiento reducido pide sustituir el desplazamiento
     por fundidos, no eliminar toda respuesta. Así quien lo tenga activado
     sigue viendo dónde está en la pila.

     Los tres arrancan en el mismo sitio en NEUTRO (0 / 1 / 1) valga lo que
     valga `reduce`, así que el HTML del servidor y el del cliente coinciden y
     la hidratación no se descuadra. */
  const inclinacion = reduce ? [0, 0, 0] : [-11, 0, 11];
  const escala = reduce ? [1, 1, 1] : [0.93, 1, 0.93];
  const desvanecido = reduce ? [0.55, 1, 1, 0.55] : [0.42, 1, 1, 0.42];

  const rotateX = useTransform(p, [0, 0.5, 1], inclinacion);
  const scale = useTransform(p, [0, 0.5, 1], escala);
  const opacity = useTransform(p, [0, 0.16, 0.84, 1], desvanecido);

  /* El desenfoque NO va en el `style` de React. Framer no resuelve un
     `useMotionTemplate` al renderizar en el servidor, así que la propiedad
     `filter` salía en el cliente y no en el servidor: esa diferencia es la que
     rompía la hidratación. Se aplica a mano después de hidratar, que además
     lo deja fuera del árbol de React y no puede volver a descuadrarlo.

     La rampa equivale a la de antes ([0,.2,.8,1] -> [3,0,0,3]): sin desenfoque
     mientras la tarjeta está en el centro, y hasta 3px pegada a los bordes. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce || !finePointer) {
      el.style.filter = "";
      return;
    }
    const pintar = (v) => {
      const d = Math.abs(v - 0.5);
      const px = d <= 0.3 ? 0 : ((d - 0.3) / 0.2) * 3;
      el.style.filter = px > 0.01 ? `blur(${px.toFixed(2)}px)` : "";
    };
    pintar(p.get());
    return p.on("change", pintar);
  }, [p, reduce, finePointer]);

  /* El árbol renderizado es SIEMPRE el mismo, pase lo que pase con
     reduced-motion o con el tipo de puntero. Antes esto devolvía un `<div>`
     pelado cuando `reduce` era cierto: como `useReducedMotion()` vale distinto
     en el servidor que en el cliente, la hidratación no cuadraba y React
     avisaba de que no iba a corregir los atributos —dejaba pegados los del
     servidor—. Con el progreso arrancando en 0 (el código anterior) esos
     atributos eran los del estado "entrando": todas las tarjetas atenuadas,
     borrosas e inclinadas hasta que algo forzase a reescribir el estilo.

     Ahora reduced-motion se respeta por otra vía: el efecto no se suscribe, el
     progreso se queda en NEUTRO y eso ya es rotateX 0 / escala 1 / opacidad 1
     / blur 0, es decir, exactamente "sin rueda". */
  return (
    <motion.div
      ref={ref}
      className="wheel-item"
      style={{
        rotateX,
        scale,
        opacity,
        transformPerspective: 1100,
        transformOrigin: "center center",
        /* Sólo `transform`. `will-change: opacity` convierte el elemento en
           "backdrop root": el `backdrop-filter` de la tarjeta de dentro deja
           de ver el fondo de la página y sólo muestrea lo que hay dentro de
           este envoltorio, o sea nada. Con él puesto, el cristal de TODAS las
           tarjetas del resumen no desenfocaba: se veían las estrellas y las
           órbitas nítidas a través. Una opacidad < 1 o un `filter` hacen lo
           mismo, pero sólo en los bordes, donde la tarjeta ya está saliendo. */
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
