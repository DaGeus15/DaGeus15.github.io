import React from "react";
const Testimonials = () => {
  return (
    <section>
      <h2 className="h2">Testimonios</h2>
      <div className="container">
        <ol className="testimonials">
          <li className="testimonial">
            <blockquote className="testimonial-text">
              Trabajar con Dayle fue una experiencia excelente. Su dedicación a
              una estética limpia y su estilo de comunicación abierta nos
              permitió colaborar de manera efectiva en la solución.
            </blockquote>
            <figure className="testimonial-author">
              <img
                src="assets/images/testimonials/rich-harris.png"
                alt="Harris Kareem"
                loading="lazy"
              />
              <figcaption>
                <h3 className="testimonial-author-name">Harris Kareem</h3>
                <p className="testimonial-author-job">
                  Desarrollador en @Outlets
                </p>
              </figcaption>
            </figure>
          </li>
          <li className="testimonial">
            <blockquote className="testimonial-text">
              Dayle es una excelente diseñadora UI/UX y desarrolladora con una
              gran visión para el marketing y la generación de leads. Es la
              única persona que conozco que combina un profundo conocimiento de
              diseño con un excelente manejo del código y desarrollo frontend.
            </blockquote>
            <figure className="testimonial-author">
              <img
                src="assets/images/testimonials/frank-mcsherry.webp"
                alt="Andrew Mead"
                loading="lazy"
              />
              <figcaption>
                <h3 className="testimonial-author-name">Andrew Mead</h3>
                <p className="testimonial-author-job">
                  Científico Principal en @Logos
                </p>
              </figcaption>
            </figure>
          </li>
          <li className="testimonial">
            <blockquote className="testimonial-text">
              Es una artista talentosa, con experiencia en diversos medios,
              capaz de hacer que cualquier proyecto que estés desarrollando
              luzca increíble. Es fácil trabajar con ella y tiene la iniciativa
              para empezar proyectos por sí sola. Sin duda, volvería a trabajar
              con Dayle.
            </blockquote>
            <figure className="testimonial-author">
              <img
                src="assets/images/testimonials/brian-hirsh.png"
                alt="Brian Hirsh"
                loading="lazy"
              />
              <figcaption>
                <h3 className="testimonial-author-name">Brian Hirsh</h3>
                <p className="testimonial-author-job">Head @Zero-in</p>
              </figcaption>
            </figure>
          </li>
          <li className="testimonial">
            <blockquote className="testimonial-text">
              Dayle es una verdadera profesional con un talento impresionante.
              Es una pensadora creativa, siempre al tanto de las tendencias
              futuras, y es una de las solucionadoras de problemas más rápidas y
              efectivas que he conocido.
            </blockquote>
            <figure className="testimonial-author">
              <img
                src="assets/images/testimonials/adam.png"
                alt="Adam Argalye"
                loading="lazy"
              />
              <figcaption>
                <h3 className="testimonial-author-name">Adam Argalye</h3>
                <p className="testimonial-author-job">SWE en @Google</p>
              </figcaption>
            </figure>
          </li>
          <li className="testimonial">
            <blockquote className="testimonial-text">
              Dayle es una de mis personas favoritas para trabajar. Es mi colega
              de referencia cuando tenemos que resolver cualquier técnica o
              tecnología nueva, porque sabe cómo abordar problemas desconocidos
              con mucha determinación.
            </blockquote>
            <figure className="testimonial-author">
              <img
                src="assets/images/testimonials/val-head.png"
                alt="Val Head"
                loading="lazy"
              />
              <figcaption>
                <h3 className="testimonial-author-name">Val Head</h3>
                <p className="testimonial-author-job">CEO en @Engines</p>
              </figcaption>
            </figure>
          </li>
          <li className="testimonial">
            <blockquote className="testimonial-text">
              Dayle es una artista talentosa. Tiene mucha experiencia con
              diversos medios y sabe cómo hacer que cualquier proyecto en el que
              trabajes se vea genial. Es fácil trabajar con ella y es muy
              proactiva. Definitivamente volvería a trabajar con Dayle.
            </blockquote>
            <figure className="testimonial-author">
              <img
                src="/assets/images/testimonials/tim-satterwhite.webp"
                alt="Gary Simon"
                loading="lazy"
              />
              <figcaption>
                <h3 className="testimonial-author-name">Gary Simon</h3>
                <p className="testimonial-author-job">
                  Defensor de la accesibilidad en @W3C
                </p>
              </figcaption>
            </figure>
          </li>
        </ol>
      </div>
    </section>
  );
};
export default Testimonials;
