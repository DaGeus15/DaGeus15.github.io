import React, { useEffect } from "react";

const Work = () => {
  useEffect(() => {
    const workEls = document.querySelectorAll(".work-box");
    const workImgs = document.querySelectorAll(".work-img");

    workImgs.forEach((workImg) => workImg.classList.add("transform"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const [textbox, picture] = Array.from(entry.target.children);
          if (entry.isIntersecting) {
            picture.classList.remove("transform");
            Array.from(textbox.children).forEach(
              (el) => (el.style.animationPlayState = "running")
            );
          }
        });
      },
      { threshold: 0.3 }
    );
    workEls.forEach((workEl) => observer.observe(workEl));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="work">
      <div className="container">
        <h2 className="h2" id="work">
          Trabajo Seleccionado
        </h2>
        <div className="work-boxes">
          <div className="work-box">
            <div className="work-textbox">
              <h3 className="h3">Plataforma de Apoyo a Campañas Políticas</h3>
              <p className="work-text">
                Una plataforma personalizada diseñada para apoyar la presencia
                en línea y las actividades de un partido político, asegurando
                eficiencia y accesibilidad para la gestión de campañas.
              </p>
              <ol className="work-technologies">
                <li>Node.js</li>
                <li>SQL (phpMyAdmin)</li>
                <li>JavaScript</li>
                <li>Diseño Responsivo</li>
              </ol>
              <div className="work-links">
                <a
                  href="https://github.com/seby10/MCSProject.git"
                  target="_blank"
                  rel="noopener"
                  className="link"
                >
                  Explorar este proyecto
                </a>
                <a
                  href="https://github.com/DaGeus15"
                  target="_blank"
                  rel="noopener"
                  title="Código fuente"
                >
                  <img
                    src="/assets/images/social-links/github.svg"
                    alt="GitHub"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
            <picture className="work-img">
              <img
                loading="lazy"
                src="/assets/images/work/partido-mary-cruz.png"
                alt="Plataforma de campaña política"
              />
            </picture>
          </div>

          <div className="work-box">
            <div className="work-textbox">
              <h3 className="h3">ShadowWilds</h3>
              <p className="work-text">
                Un sitio web de blog basado en PHP y MySQL donde los usuarios
                pueden acceder como invitados o miembros registrados. El
                proyecto está alojado en Infinity Free.
              </p>
              <ol className="work-technologies">
                <li>PHP</li>
                <li>MySQL</li>
                <li>Alojamiento en Infinity Free</li>
              </ol>
              <div className="work-links">
                <a
                  href="https://github.com/DaGeus15/blog.git"
                  target="_blank"
                  rel="noopener"
                  className="link"
                >
                  Explorar este proyecto
                </a>
                <a
                  href="https://github.com/DaGeus15"
                  target="_blank"
                  rel="noopener"
                  title="Código fuente"
                >
                  <img
                    src="assets/images/social-links/github.svg"
                    alt="GitHub"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
            <picture className="work-img">
              <img
                loading="lazy"
                src="/assets/images/work/blog.png"
                alt="Proyecto de blog"
              />
            </picture>
          </div>

          <div className="work-box">
            <div className="work-textbox">
              <h3 className="h3">Tamagotchi</h3>
              <p className="work-text">
                Un Tamagotchi virtual desarrollado en Java, utilizando JFrame
                para la interfaz gráfica y SQL para guardar el estado y el
                progreso del Tamagotchi. Ideal para aprender y practicar
                programación orientada a objetos e integración de bases de
                datos.
              </p>
              <ol className="work-technologies">
                <li>Java (Swing y JFrame)</li>
                <li>SQL (integración de bases de datos)</li>
                <li>Programación Orientada a Objetos</li>
              </ol>
              <div className="work-links">
                <a
                  href="https://github.com/seby10/MCSProject.git"
                  target="_blank"
                  rel="noopener"
                  className="link"
                >
                  Explorar este proyecto
                </a>
                <a
                  href="https://github.com/DaGeus15"
                  target="_blank"
                  rel="noopener"
                  title="Código fuente"
                >
                  <img
                    src="/assets/images/social-links/github.svg"
                    alt="GitHub"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
            <picture className="work-img">
              <img
                loading="lazy"
                src="/assets/images/work/tamagochi.jpg"
                alt="Proyecto Tamagotchi"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
