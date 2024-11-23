import React from "react";

const Resume = () => {
  return (
    <div className="resume-container">
      <section className="resume-col">
        <header className="resume-title">
          <h2 id="resume">Educación</h2>
        </header>
        <div className="resume-contents">
          <div className="resume-box">
            <h4>2018 - 2022</h4>
            <h3>Bachillerato General Unificado</h3>
            <p>
              Me gradué de Bachillerato General Unificado en el Colegio Juan León Mera de La Salle, en la ciudad de Ambato, Ecuador. Este período me permitió obtener una sólida formación académica que sentó las bases para mi carrera universitaria.
            </p>
          </div>
          <div className="resume-box">
            <h4>2022 - Actualidad</h4>
            <h3>Ingeniería de Software</h3>
            <p>
              Actualmente estudio Ingeniería de Software en la Universidad Técnica de Ambato, donde estoy aprendiendo sobre desarrollo de software, programación, bases de datos, y arquitecturas de sistemas. Mi enfoque está en adquirir habilidades avanzadas en programación y desarrollo de soluciones tecnológicas.
            </p>
          </div>
          <div className="resume-box">
            <h4>2021</h4>
            <h3>Título B2 en Inglés - Cambridge</h3>
            <p>
              Obtuve el nivel B2 en inglés a través del examen de Cambridge, lo que valida mi capacidad para comunicarme con fluidez en entornos profesionales y académicos en inglés.
            </p>
          </div>
        </div>
      </section>

      <section className="resume-col">
        <header className="resume-title">
          <h2>Experiencia</h2>
        </header>
        <div className="resume-contents">
          <div className="resume-box">
            <h4>2022 - Actualidad</h4>
            <h3>Desarrollador Web</h3>
            <p>
              A lo largo de estos años he desarrollado habilidades en desarrollo web, creando sitios y aplicaciones web responsivas usando tecnologías como HTML, CSS, JavaScript, y frameworks como React. Me he enfocado en crear interfaces atractivas y fáciles de usar, mejorando la experiencia del usuario.
            </p>
          </div>
          <div className="resume-box">
            <h4>2022 - Actualidad</h4>
            <h3>Desarrollador en Java</h3>
            <p>
              He trabajado con Java para el desarrollo de aplicaciones de software, desde aplicaciones de escritorio hasta servicios backend. He implementado estructuras de datos, algoritmos eficientes y he trabajado con bases de datos, como MySQL y PostgreSQL.
            </p>
          </div>
          <div className="resume-box">
            <h4>2022 - Actualidad</h4>
            <h3>Desarrollador Frontend</h3>
            <p>
              He creado interfaces de usuario interactivas y accesibles, trabajando con HTML5, CSS3, JavaScript y utilizando tecnologías como React. He desarrollado componentes reutilizables y optimizado el rendimiento de las aplicaciones.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resume;


