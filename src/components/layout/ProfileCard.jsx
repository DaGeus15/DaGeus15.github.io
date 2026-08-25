"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import Magnetic from "@/components/ui/Magnetic";
import SplitText from "@/components/ui/SplitText";
import profile from "@/content/profile";
import { spring, tween } from "@/lib/motion";
import { HOVER_QUERY } from "@/lib/breakpoints";

/**
 * Tarjeta de perfil de la barra lateral: foto con inclinación 3D al pasar el
 * cursor, nombre revelado carácter a carácter y botón magnético de CV.
 * En modo compacto (vista detallada) se reduce a sólo la foto y el botón.
 */
export default function ProfileCard({ isCompact = false }) {
  const photoRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const tiltX = useSpring(x, spring.tilt);
  const tiltY = useSpring(y, spring.tilt);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!photoRef.current || isCompact) return;
    if (!window.matchMedia(HOVER_QUERY).matches) return;

    const rect = photoRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`profile-card ${isCompact ? "is-compact" : ""}`}>
      {!isCompact && <div className="profile-glow" aria-hidden="true" />}

      <motion.div
        ref={photoRef}
        className="profile-photo"
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={{
          rotateX: isCompact ? 0 : rotateX,
          rotateY: isCompact ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={isCompact ? undefined : { scale: 1.03 }}
        animate={{ width: isCompact ? 64 : 240, height: isCompact ? 64 : 330 }}
        transition={spring.layout}
      >
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={480}
          height={660}
          priority
          sizes="240px"
        />
      </motion.div>

      <AnimatePresence initial={false}>
        {!isCompact && (
          <motion.div
            className="profile-identity"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={tween.base}
          >
            <SplitText text={profile.name} as="h1" className="profile-name" stagger={0.035} />
            <SplitText text={profile.role} as="p" className="profile-role" stagger={0.015} delay={0.25} />
          </motion.div>
        )}
      </AnimatePresence>

      <Magnetic range={45} strength={0.3}>
        <motion.a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className={`cv-button ${isCompact ? "is-compact" : ""}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={spring.snappy}
          aria-label="Descargar CV"
        >
          <FiDownload size={isCompact ? 18 : 14} aria-hidden="true" />
          {!isCompact && <span>Descargar CV</span>}
        </motion.a>
      </Magnetic>
    </div>
  );
}
