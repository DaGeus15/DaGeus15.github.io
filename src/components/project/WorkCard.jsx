"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Frame from "./Frame";
import { spring } from "@/lib/motion";

/**
 * Tarjeta de proyecto de la portada: título, una línea, dos cifras y sus
 * capturas en marco. Nada más: el stack, la arquitectura y el detalle están
 * en el caso de estudio, a un clic. Así la portada no repite lo mismo cinco
 * veces.
 *
 * Toda la tarjeta lleva al caso con el enlace estirado (el `<a>` es el
 * título). Con ratón, el escenario de las capturas se inclina hacia el
 * cursor (unos grados, con perspectiva) y el teléfono superpuesto se desplaza
 * un poco más que la ventana: parallax de dos planos. Sólo transform, por
 * motion values; el rectángulo se mide al entrar, no en cada movimiento.
 */
export default function WorkCard({ project, href, size, labels }) {
  const rect = useRef(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, spring.tilt);
  const rotateY = useSpring(tiltY, spring.tilt);
  const insetX = useTransform(rotateY, (v) => v * 2.2);
  const insetY = useTransform(rotateX, (v) => v * -2.2);

  const { cover, inset, metrics = [] } = project;
  const layout = cover.mobile ? "phones" : "window";

  return (
    <article
      className="work-card"
      data-size={size}
      data-tone={project.tone}
      data-layout={layout}
      onPointerEnter={(e) => {
        rect.current = e.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        rect.current ??= e.currentTarget.getBoundingClientRect();
        const { left, top, width, height } = rect.current;
        const nx = ((e.clientX - left) / width) * 2 - 1;
        const ny = ((e.clientY - top) / height) * 2 - 1;
        tiltY.set(nx * 4);
        tiltX.set(ny * -3);
      }}
      onPointerLeave={() => {
        rect.current = null;
        tiltX.set(0);
        tiltY.set(0);
      }}
      onWheel={() => {
        rect.current = null;
      }}
    >
      <div className="work-card__body">
        <p className="work-card__meta mono">
          <span>{project.year}</span>
          {project.status === "production" && <span className="work-card__live">{labels.inProduction}</span>}
          {project.context && <span>{project.context}</span>}
        </p>
        <h3 className="work-card__title">
          <Link href={href} className="stretched-link">
            {project.title}
          </Link>
        </h3>
        <p className="work-card__line">{project.subtitle}</p>

        {metrics.length > 0 && (
          <dl className="work-card__metrics">
            {metrics.slice(0, 2).map((m) => (
              <div className="work-card__metric" key={m.key}>
                <dt>{m.label}</dt>
                <dd className="mono">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <span className="work-card__cta" aria-hidden="true">
          {labels.caseStudy}
          <FiArrowRight />
        </span>
      </div>

      <div className="work-card__media" aria-hidden="true">
        <motion.div className="work-card__stage" style={{ rotateX, rotateY }}>
          <Frame shot={cover} className="work-card__cover" />
          {inset && (
            <motion.span className="work-card__inset" style={{ x: insetX, y: insetY }}>
              <Frame shot={inset} />
            </motion.span>
          )}
        </motion.div>
      </div>
    </article>
  );
}
