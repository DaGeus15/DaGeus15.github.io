"use client";

import { useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";
import { HOVER_QUERY, MOBILE_BREAKPOINT } from "@/lib/breakpoints";

const POINTER_REST_MS = 1200;

/**
 * El tramo del contorno más cercano al puntero. El círculo se mueve con
 * transform y el filo de dentro se contra-desplaza para quedarse quieto.
 * La posición se copia del ratón para que el foco llegue con el gesto.
 * El barrido CSS recupera el filo al dejar el ratón en reposo.
 *
 * El rectángulo se mide al entrar y al cambiar el layout, no en cada
 * movimiento. No se pulsa: ni estado de React ni cursor de mano.
 */
export default function PortraitFocus() {
  const spotRef = useRef(null);
  const innerRef = useRef(null);
  const position = useMotionValue({ x: 0, y: 0 });

  useEffect(() => {
    const spot = spotRef.current;
    const inner = innerRef.current;
    const portrait = spot?.closest(".hero__portrait");
    if (!spot || !inner || !portrait) return;

    const observer = new IntersectionObserver(([entry]) => {
      portrait.toggleAttribute("data-in-view", entry.isIntersecting);
    });
    observer.observe(portrait);
    if (!window.matchMedia(HOVER_QUERY).matches) return () => observer.disconnect();

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rect = null;
    let radius = 0;
    let idleTimer;

    const unsubscribe = position.on("change", ({ x, y }) => {
      spot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      inner.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
    });

    const release = () => {
      clearTimeout(idleTimer);
      delete portrait.dataset.on;
    };

    const onMove = ({ clientX, clientY, pointerType }) => {
      if (!rect || pointerType === "touch") return;
      position.set({ x: clientX - rect.left - radius, y: clientY - rect.top - radius });
      portrait.dataset.on = "";
      clearTimeout(idleTimer);
      if (!reduceQuery.matches) idleTimer = setTimeout(release, POINTER_REST_MS);
    };

    const onEnter = (e) => {
      if (window.innerWidth < MOBILE_BREAKPOINT || e.pointerType === "touch") return;
      rect = portrait.getBoundingClientRect();
      radius = spot.offsetWidth / 2;
      onMove(e);
    };
    const onLeave = () => {
      rect = null;
      release();
    };
    const remeasure = () => {
      if (!rect) return;
      rect = portrait.getBoundingClientRect();
      radius = spot.offsetWidth / 2;
    };

    portrait.addEventListener("pointerenter", onEnter);
    portrait.addEventListener("pointermove", onMove);
    portrait.addEventListener("pointerleave", onLeave);
    portrait.addEventListener("pointercancel", onLeave);
    window.addEventListener("resize", remeasure);
    window.addEventListener("scroll", remeasure, { passive: true });
    return () => {
      observer.disconnect();
      unsubscribe();
      portrait.removeEventListener("pointerenter", onEnter);
      portrait.removeEventListener("pointermove", onMove);
      portrait.removeEventListener("pointerleave", onLeave);
      portrait.removeEventListener("pointercancel", onLeave);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("scroll", remeasure);
      release();
    };
  }, [position]);

  return (
    <div className="hero__light" aria-hidden="true">
      <div className="hero__idle-rim">
        <div className="hero__spot">
          <div className="hero__spot-inner">
            <div className="hero__rim" />
          </div>
        </div>
      </div>
      <div className="hero__spot hero__spot--interactive" ref={spotRef}>
        <div className="hero__spot-inner" ref={innerRef}>
          <div className="hero__rim" />
        </div>
      </div>
    </div>
  );
}
