import React from "react";
const Contact = () => {
  return (
    <section className="contact">
      <div className="container">
        <h2 className="h2" id="contact">
          Enviar Mensaje
        </h2>
        <div className="contact-content">
          <div className="contact-textbox">
            <strong href="#" className="hire-alert">
              <span className="indicator"></span>
              Disponible para contratación
            </strong>
            <p className="contact-text">
              Soy estudiante de ingeniería de software con pasión por el
              aprendizaje. Me especializo en construir interfaces web y diseñar
              sistemas, siempre enfocándome en la accesibilidad y el
              rendimiento. Disfruto programar desde cero y me encanta dar vida a
              las ideas a través de la tecnología.
            </p>
            <p className="contact-text">
              Como entusiasta del código abierto, contribuyo a varios proyectos
              en mi tiempo libre.
            </p>

            <img
              src="/assets/images/R.png"
              alt="Syed Mohsin"
              className="signatures"
              loading="lazy"
            />
          </div>
          <form action="#" className="contact-form" netlify="true">
            <div className="form-field">
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" id="name" required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                inputMode="email"
              />
            </div>
            <div className="form-field">
              <label htmlFor="message">¿Cómo puedo ayudarte?</label>
              <textarea name="message" id="message" required></textarea>
            </div>
            <button type="submit" className="btn btn-cta">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Contact;
