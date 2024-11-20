import React from "react";
const Contact = () => {
  return (
    <section className="contact">
      <div className="container">
        <h2 className="h2" id="contact">
          Send Message
        </h2>
        <div className="contact-content">
          <div className="contact-textbox">
            <strong href="#" className="hire-alert">
              <span className="indicator"></span>
              Available for hire
            </strong>
            <p className="contact-text">
              I am a software engineering student with a passion for learning. I
              specialize in building web interfaces and designing systems,
              always focusing on accessibility and performance. I enjoy coding
              from scratch and love bringing ideas to life through technology.
            </p>
            <p className="contact-text">
              As an open-source enthusiast, I contribute to various projects in
              my free time.
            </p>

            <img
              src="/assets/images/signatures.png"
              alt="Syed Mohsin"
              className="signatures"
              loading="lazy"
            />
          </div>
          <form action="#" className="contact-form" netlify="true">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                inputMode="email"
              />
            </div>
            <div className="form-field">
              <label htmlFor="message">How can I help you?</label>
              <textarea name="message" id="message" required></textarea>
            </div>
            <button type="submit" className="btn btn-cta">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Contact;
