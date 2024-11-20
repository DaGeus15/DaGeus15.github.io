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
          Selected Work
        </h2>
        <div className="work-boxes">
          <div className="work-box">
            <div className="work-textbox">
              <h3 className="h3">Political Campaign Support Platform</h3>
              <p className="work-text">
                A tailored platform designed to support the online presence and
                activities of a political party, ensuring efficiency and
                accessibility htmlFor campaign management.
              </p>
              <ol className="work-technologies">
                <li>Node.js</li>
                <li>SQL (phpMyAdmin)</li>
                <li>JavaScript</li>
                <li>Responsive Design</li>
              </ol>
              <div className="work-links">
                <a
                  href="https://github.com/seby10/MCSProject.git"
                  target="_blank"
                  rel="noopener"
                  className="link"
                >
                  Explore this project
                </a>
                <a
                  href="https://github.com/DaGeus15"
                  target="_blank"
                  rel="noopener"
                  title="Source code"
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
                alt="Political campaign platform"
              />
            </picture>
          </div>

          <div className="work-box">
            <div className="work-textbox">
              <h3 className="h3">ShadowWilds</h3>
              <p className="work-text">
                A PHP and MySQL-based blog website where users can access as
                guests or registered members. The project is hosted on Infinity
                Free.
              </p>
              <ol className="work-technologies">
                <li>PHP</li>
                <li>MySQL</li>
                <li>Infinity Free Hosting</li>
              </ol>
              <div className="work-links">
                <a
                  href="https://github.com/DaGeus15/blog.git"
                  target="_blank"
                  rel="noopener"
                  className="link"
                >
                  Explore this project
                </a>
                <a
                  href="https://github.com/DaGeus15"
                  target="_blank"
                  rel="noopener"
                  title="Source code"
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
                alt="Blog project"
              />
            </picture>
          </div>

          <div className="work-box">
            <div className="work-textbox">
              <h3 className="h3">Tamagotchi</h3>
              <p className="work-text">
                A virtual Tamagotchi developed in Java, using JFrame htmlFor the
                graphical interface and SQL to save the state and progress of
                the Tamagotchi. Ideal htmlFor learning and practicing
                object-oriented programming and database integration.
              </p>
              <ol className="work-technologies">
                <li>Java (Swing and JFrame)</li>
                <li>SQL (database integration)</li>
                <li>Object-Oriented Programming</li>
              </ol>
              <div className="work-links">
                <a
                  href="https://github.com/seby10/MCSProject.git"
                  target="_blank"
                  rel="noopener"
                  className="link"
                >
                  Explore this project
                </a>
                <a
                  href="https://github.com/DaGeus15"
                  target="_blank"
                  rel="noopener"
                  title="Source code"
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
                alt="Tamagotchi project"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
