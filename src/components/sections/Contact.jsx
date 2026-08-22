"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import GlassCard from "@/components/ui/GlassCard";
import Magnetic from "@/components/ui/Magnetic";
import social, { WEB3FORMS_ACCESS_KEY } from "@/content/social";
import { cardVariants, tween } from "@/lib/motion";

const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { type: "spring", stiffness: 90, damping: 16 }, opacity: { duration: 0.05 } },
  },
};

export default function Contact({ isExpanded = false }) {
  const [status, setStatus] = useState(null);

  // Ver la nota en Section.jsx: sólo anima cuando es hijo de AnimatePresence.
  const presenceProps = isExpanded
    ? { variants: cardVariants, initial: "initial", animate: "animate", exit: "exit" }
    : { initial: false };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      e.target.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <GlassCard
      id="contact"
      className={`content-card ${isExpanded ? "is-expanded" : ""}`}
      {...presenceProps}
      aria-labelledby="contact-title"
    >
      <header className="section-header">
        <h2 className="section-title" id="contact-title">
          Contacto
        </h2>
        <span className="section-divider" />
      </header>

      <div className="section-body">
        <p className="section-text">
          ¿Tienes un proyecto en mente o simplemente quieres saludar? ¡No dudes en escribirme!
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={tween.base}
              className="form-success"
              role="status"
            >
              <svg width="60" height="60" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <motion.circle
                  cx="32" cy="32" r="29"
                  stroke="var(--foreground)" strokeWidth="3"
                  variants={checkVariants} initial="hidden" animate="visible"
                />
                <motion.path
                  d="M20 32L28 40L44 22"
                  stroke="var(--foreground)" strokeWidth="3.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  variants={checkVariants} initial="hidden" animate="visible"
                />
              </svg>
              <h3>¡Mensaje enviado con éxito!</h3>
              <p>Te responderé lo más pronto posible.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="contact-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={tween.fast}
            >
              <label className="form-field">
                <span className="sr-only">Tu nombre</span>
                <input type="text" name="name" placeholder="Tu Nombre" required className="form-input" autoComplete="name" />
              </label>
              <label className="form-field">
                <span className="sr-only">Tu correo electrónico</span>
                <input type="email" name="email" placeholder="Tu Correo Electrónico" required className="form-input" autoComplete="email" />
              </label>
              <label className="form-field">
                <span className="sr-only">Tu mensaje</span>
                <textarea name="message" placeholder="¿Cómo puedo ayudarte?" required className="form-textarea" />
              </label>

              {status === "error" && (
                <p className="form-error" role="alert">
                  Hubo un error al enviar el mensaje. Inténtalo de nuevo.
                </p>
              )}

              <button type="submit" className="contact-button" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <FiSend size={15} aria-hidden="true" />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <footer className="social-links">
          <p className="social-title">También puedes encontrarme en:</p>
          <ul className="social-icons">
            {social.map((item) => (
              <li key={item.name}>
                <Magnetic range={40} strength={0.35}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={item.name}>
                    <Image src={item.icon} alt="" width={22} height={22} aria-hidden="true" />
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </GlassCard>
  );
}
