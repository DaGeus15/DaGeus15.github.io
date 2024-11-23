import React, { useEffect, useState } from "react";

const Footer = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme === "light");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <nav>
            <ol className="footer-links">
              <li className="footer-link">
                <a
                  title="GitHub"
                  href="https://github.com/DaGeus15"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="/assets/images/social-links/github.svg"
                    alt="GitHub"
                  />
                </a>
              </li>
              <li className="footer-link">
                <a
                  title="Codepen"
                  href="https://github.com/DaGeus15"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="/assets/images/social-links/codepen.svg"
                    alt="Codepen"
                  />
                </a>
              </li>
              <li className="footer-link">
                <a
                  title="Linkedin"
                  href="https://www.linkedin.com/in/dayle-garcia-6a0878170/"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="/assets/images/social-links/linkedin.svg"
                    alt="Linkedin"
                  />
                </a>
              </li>
              <li className="footer-link">
                <a
                  title="X"
                  href="https://x.com/garci015"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    loading="lazy"
                    src="/assets/images/social-links/x.png"
                    alt="X"
                  />
                </a>
              </li>
            </ol>
          </nav>
          <p className="footer-text">
            &copy; <span>2024</span> - Personal portfolio designed and developed
            by{" "}
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/DaGeus15"
            >
              Dayle García
            </a>
            .
          </p>

          <label className="theme-switch" htmlFor="theme-switch">
            <span>Dark Theme</span>
            <input
              type="checkbox"
              id="theme-switch"
              role="switch"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
          </label>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
