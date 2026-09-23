"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { WEB3FORMS_ACCESS_KEY } from "@/content/social";
import useContent from "@/lib/useContent";
import { tween } from "@/lib/motion";

/** Trazo del check de éxito: se dibuja una vez. Es un momento raro, así que
    aquí sí cabe algo más de ceremonia que en un hover. */
const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { type: "spring", bounce: 0, visualDuration: 0.5 }, opacity: { duration: 0.05 } },
  },
};

export default function ContactForm() {
  const { ui } = useContent();
  const [status, setStatus] = useState(null);

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
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={tween.base}
          className="form-success"
          role="status"
        >
          <svg width="44" height="44" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <motion.circle cx="32" cy="32" r="29" strokeWidth="3" variants={checkVariants} initial="hidden" animate="visible" />
            <motion.path
              d="M20 32L28 40L44 22"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={checkVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>
          <p className="form-success__title">{ui.successTitle}</p>
          <p className="form-success__body">{ui.successBody}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="contact-form"
          exit={{ opacity: 0 }}
          transition={tween.fast}
        >
          <div className="form-row">
            <label className="form-field">
              <span className="form-label">{ui.formName}</span>
              <input type="text" name="name" required className="form-input" autoComplete="name" />
            </label>
            <label className="form-field">
              <span className="form-label">{ui.formEmail}</span>
              <input type="email" name="email" required className="form-input" autoComplete="email" />
            </label>
          </div>
          <label className="form-field">
            <span className="form-label">{ui.formMessage}</span>
            <textarea name="message" required className="form-input form-textarea" rows={5} />
          </label>

          {status === "error" && (
            <p className="form-error" role="alert">
              {ui.sendError}
            </p>
          )}

          <button type="submit" className="btn btn--primary" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <span className="spinner" aria-hidden="true" />
                {ui.sending}
              </>
            ) : (
              <>
                <FiSend aria-hidden="true" />
                {ui.send}
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
