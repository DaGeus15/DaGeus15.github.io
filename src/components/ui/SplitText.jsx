"use client";

import { motion } from "framer-motion";
import { charVariants } from "@/lib/motion";

/**
 * Revela un texto carácter por carácter.
 *
 * Reemplaza la versión anterior basada en GSAP + ScrollTrigger + el plugin
 * SplitText (~150 KB) por framer-motion, que ya se usa en todo el sitio.
 * Además, aquella versión recibía props (`animationFrom`, `animationTo`,
 * `easing`) que no existían en su API y se ignoraban en silencio.
 *
 * Accesibilidad: el contenedor lleva el texto completo como aria-label y los
 * caracteres se ocultan a los lectores de pantalla.
 */
export default function SplitText({
  text,
  className = "",
  as = "p",
  delay = 0,
  stagger = 0.03,
}) {
  // `motion[tag]` está memoizado por framer-motion. Usar `motion.create(tag)`
  // aquí devolvería un componente nuevo en cada render y remontaría el texto.
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={`split-text ${className}`}
      aria-label={text}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="split-char"
          variants={charVariants}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </MotionTag>
  );
}
