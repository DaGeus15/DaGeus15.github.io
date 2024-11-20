import React from "react";
const Testimonials = () => {
  return (
    <section>
      <h2 className="h2">Testimonials</h2>
      <div className="container">
        <ol className="testimonials">
          <li className="testimonial">
            <blockquote className="testimonial-text">
              Working with Dayle was a great experience. His drive htmlFor clean
              aesthetics and his open communication style helped us collaborate
              closely on the solution.
            </blockquote>
            <figure className="testimonial-author">
              <img
                src="assets/images/testimonials/rich-harris.png"
                alt="Rich Harris"
                loading="lazy"
              />
              <figcaption>
                <h3 className="testimonial-author-name">Harris Kareem</h3>
                <p className="testimonial-author-job">Developer @Outlets</p>
              </figcaption>
            </figure>
          </li>
          <li className="testimonial">
            <blockquote className="testimonial-text">
              Dayle is a fantastic UI/UX designer and developer with a keen sense
              htmlFor marketing, and lead generation. He's the only designer I know
              who also has a deep understanding htmlFor code and front-end
              development.
            </blockquote>
            <figure className="testimonial-author">
              <img
                src="assets/images/testimonials/frank-mcsherry.webp"
                alt="Andrew Mead"
                loading="lazy"
              />
              <figcaption>
                <h3 className="testimonial-author-name">Andrew Mead</h3>
                <p className="testimonial-author-job">Chief Scientist @Logos</p>
              </figcaption>
            </figure>
          </li>
          <li className="testimonial">
            <blockquote className="testimonial-text">
              Talented artist, experienced with various media and can make any
              project you are working on look good. He is easy to work with and
              is a self starter. I would work with Dayle again.
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
              Dayle is a true professional with amazing talent. He is a creative
              thinker, has his finger on the pulse of whats to come, and
              absolutely one of the quickest and best problem solvers I have
              ever met.
            </blockquote>
            <figure className="testimonial-author">
              <img
                src="assets/images/testimonials/adam.png"
                alt="Adam Argalye"
                loading="lazy"
              />
              <figcaption>
                <h3 className="testimonial-author-name">Adam Argalye</h3>
                <p className="testimonial-author-job">SWE @Google</p>
              </figcaption>
            </figure>
          </li>
          <li className="testimonial">
            <blockquote className="testimonial-text">
              Dayle is one of my favourite people to work with. He's my go-to
              colleague when trouble shooting any new technique or technology
              because she understands how to tackle unknown problems with
              gumption.
            </blockquote>
            <figure className="testimonial-author">
              <img
                src="assets/images/testimonials/val-head.png"
                alt="Val Head"
                loading="lazy"
              />
              <figcaption>
                <h3 className="testimonial-author-name">Val Head</h3>
                <p className="testimonial-author-job">CEO @Engines</p>
              </figcaption>
            </figure>
          </li>
          <li className="testimonial">
            <blockquote className="testimonial-text">
              Dayle is a talented artist. He is very experienced with various
              media and can make any project you are working on look good. He is
              easy to work with and is a self starter. I would work with Dayle
              again.
            </blockquote>
            <figure className="testimonial-author">
              <img
                src="/assets/images/testimonials/tim-satterwhite.webp"
                alt="Gary Simon"
                loading="lazy"
              />
              <figcaption>
                <h3 className="testimonial-author-name">Gary Simon</h3>
                <p className="testimonial-author-job">A11y Advocate @W3C</p>
              </figcaption>
            </figure>
          </li>
        </ol>
      </div>
    </section>
  );
};
export default Testimonials;
