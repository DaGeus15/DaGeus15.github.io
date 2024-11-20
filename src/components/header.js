import React, { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const btnToggleNav = document.querySelector(".menu-btn");

    const toggleNav = () => {
      nav.classList.toggle("hidden");
      document.body.classList.toggle("lock-screen");
      btnToggleNav.textContent = nav.classList.contains("hidden")
        ? "menu"
        : "close";
    };

    btnToggleNav.addEventListener("click", toggleNav);

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !nav.classList.contains("hidden")) {
        toggleNav();
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      btnToggleNav.removeEventListener("click", toggleNav);
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="header">
      <div className="menu-btn-container">
        <div className="container">
          <button type="button" className="menu-btn">
            Menu
          </button>
        </div>
      </div>

      <nav className="nav hidden">
        <ol className="nav-items">
          <li className="nav-item">
            <a href="#">Home</a>
          </li>
          <li className="nav-item">
            <a href="#work">My Work</a>
          </li>
          <li className="nav-item">
            <a href="#skills">My Skills</a>
          </li>
          <li className="nav-item">
            <a href="#contact" data-focused="last-focused">
              Contact
            </a>
          </li>
        </ol>
      </nav>

      <div className="container">
        <div className="header-textbox">
          <h1 className="h1">
            <span>Hi, I'm Dayle García</span>
            <span>Web Developer</span>
          </h1>
          <p className="header-text">
            A frontend software engineer and interface designer who builds UX
            rich accessible and performant websites.
          </p>
          <div className="header-btns">
            <a href="#contact" className="btn btn-cta">
              Hire me
            </a>
            <a href="#work" className="btn btn-secondary">
              See my work
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
