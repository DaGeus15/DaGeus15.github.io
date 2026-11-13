"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { WEB3FORMS_ACCESS_KEY } from "@/content/social";
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

/** El servicio es externo: si no responde, sale el error en vez de quedarse
    enviando para siempre. */
const SUBMIT_TIMEOUT_MS = 15000;
const FORM_ENDPOINT = "https://api.web3forms.com/submit";

export default function ContactForm({ email, labels }) {
  const [status, setStatus] = useState(null);
  const [emailDraft, setEmailDraft] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;
    const fields = new FormData(event.currentTarget);
    setStatus("submitting");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fields,
        signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
      });
      if (!res.ok || (await res.json()).success !== true) {
        throw new Error("Web3Forms did not confirm delivery");
      }
      setStatus("success");
    } catch {
      const body = [fields.get("message"), fields.get("name")].join("\r\n\r\n");
      setEmailDraft(`mailto:${email}?body=${encodeURIComponent(body)}`);
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
          <p className="form-success__title">{labels.successTitle}</p>
          <p className="form-success__body">{labels.successBody}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={FORM_ENDPOINT}
          method="post"
          onSubmit={handleSubmit}
          aria-busy={status === "submitting"}
          className="contact-form"
          exit={{ opacity: 0 }}
          transition={tween.fast}
        >
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <div className="form-row">
            <label className="form-field">
              <span className="form-label">{labels.formName}</span>
              <input type="text" name="name" required className="form-input" autoComplete="name" />
            </label>
            <label className="form-field">
              <span className="form-label">{labels.formEmail}</span>
              <input type="email" name="email" required className="form-input" autoComplete="email" />
            </label>
          </div>
          <label className="form-field">
            <span className="form-label">{labels.formMessage}</span>
            <textarea name="message" required className="form-input form-textarea" rows={5} />
          </label>

          {status === "error" && (
            <p className="form-error" role="alert">
              {labels.sendError} <a href={emailDraft}>{labels.emailFallback}</a>.
            </p>
          )}

          <button type="submit" className="btn btn--primary" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <span className="spinner" aria-hidden="true" />
                {labels.sending}
              </>
            ) : (
              <>
                <FiSend aria-hidden="true" />
                {labels.send}
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
