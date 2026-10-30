"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { HOVER_QUERY } from "@/lib/breakpoints";
import { spring } from "@/lib/motion";

/**
 * El tramo del contorno más cercano al puntero. El círculo se mueve con
 * transform y el filo de dentro se contra-desplaza para quedarse quieto.
 * Con ratón, un spring; con movimiento reducido, el mismo sitio al instante
 * (en el efecto, no en el render). Sin ratón no se monta: el recorrido lo
 * hace el CSS con el scroll.
 *
 * El rectángulo se mide al entrar y al cambiar el layout, no en cada
 * movimiento. No se pulsa: ni estado de React ni cursor de mano.
 */
export default function PortraitFocus() {
  const spotRef = useRef(null);
  const innerRef = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, spring.snappy);
  const sy = useSpring(py, spring.snappy);

  useEffect(() => {
    const spot = spotRef.current;
    const inner = innerRef.current;
    const portrait = spot?.closest(".hero__portrait");
    if (!spot || !inner || !portrait) return;
    if (!window.matchMedia(HOVER_QUERY).matches) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = reduceQuery.matches;
    let rect = null;

    const paint = () => {
      const x = sx.get();
      const y = sy.get();
      spot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      inner.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
    };
    const unX = sx.on("change", paint);
    const unY = sy.on("change", paint);

    const place = (clientX, clientY, immediate) => {
      if (!rect) return;
      const x = clientX - rect.left - spot.offsetWidth / 2;
      const y = clientY - rect.top - spot.offsetHeight / 2;
      if (immediate || reduce) {
        px.jump(x);
        py.jump(y);
        sx.jump(x);
        sy.jump(y);
      } else {
        px.set(x);
        py.set(y);
      }
    };

    const onEnter = (e) => {
      rect = portrait.getBoundingClientRect();
      portrait.dataset.on = "";
      place(e.clientX, e.clientY, true);
    };
    const onMove = (e) => {
      if (!portrait.hasAttribute("data-on")) return;
      place(e.clientX, e.clientY, false);
    };
    const onLeave = () => {
      delete portrait.dataset.on;
    };
    const onReduce = () => {
      reduce = reduceQuery.matches;
      if (reduce) {
        sx.jump(px.get());
        sy.jump(py.get());
      }
    };
    const remeasure = () => {
      if (portrait.hasAttribute("data-on")) rect = portrait.getBoundingClientRect();
    };

    portrait.addEventListener("pointerenter", onEnter);
    portrait.addEventListener("pointermove", onMove);
    portrait.addEventListener("pointerleave", onLeave);
    portrait.addEventListener("pointercancel", onLeave);
    reduceQuery.addEventListener("change", onReduce);
    window.addEventListener("resize", remeasure);
    window.addEventListener("scroll", remeasure, { passive: true });
    return () => {
      unX();
      unY();
      portrait.removeEventListener("pointerenter", onEnter);
      portrait.removeEventListener("pointermove", onMove);
      portrait.removeEventListener("pointerleave", onLeave);
      portrait.removeEventListener("pointercancel", onLeave);
      reduceQuery.removeEventListener("change", onReduce);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("scroll", remeasure);
      delete portrait.dataset.on;
    };
  }, [px, py, sx, sy]);

  return (
    <div className="hero__light">
      <div className="hero__spot" ref={spotRef}>
        <div className="hero__spot-inner" ref={innerRef}>
          <div className="hero__rim" />
        </div>
      </div>
    </div>
  );
}
