import React, { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const btnToggleNav = document.querySelector(".menu-btn");
    const navLinks = document.querySelectorAll(".nav-item a");

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

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (!nav.classList.contains("hidden")) {
          toggleNav();
        }
      });
    });

    return () => {
      btnToggleNav.removeEventListener("click", toggleNav);
      document.body.removeEventListener("keydown", handleKeyDown);
      navLinks.forEach((link) => {
        link.removeEventListener("click", () => {
          if (!nav.classList.contains("hidden")) {
            toggleNav();
          }
        });
      });
    };
  }, []);

  return (
    <header className="header">
      <div className="menu-btn-container">
        <div className="container">
          <button type="button" className="menu-btn">
            Menú
          </button>
        </div>
      </div>

      <nav className="nav hidden">
        <ol className="nav-items">
          <li className="nav-item">
            <a href="#home">Inicio</a>
          </li>
          <li className="nav-item">
            <a href="#work">Mi Trabajo</a>
          </li>
          <li className="nav-item">
            <a href="#resume">Resumen</a>
          </li>
          <li className="nav-item">
            <a href="#skills">Mis Habilidades</a>
          </li>
          <li className="nav-item">
            <a href="#contact" data-focused="last-focused">
              Contacto
            </a>
          </li>
        </ol>
      </nav>

      <div className="container">
        <div className="header-textbox">
          <div className="profile-picture">
            <img src="/assets/images/foto para todo.jpg" alt="Perfil" id="home"/>
          </div>

          <h1 className="h1">
            <span>Hola, soy Dayle García</span>
            <span>Estudiante de Ingeniería en Software</span>
          </h1>

          <p className="header-text">
            Estudiante de Ingeniería en Software con interés en desarrollo
            backend. Busco crear aplicaciones escalables y optimizadas.
          </p>

          <div className="header-btns">
            <a href="#contact" className="btn btn-cta">
              Contáctame
            </a>
            <a href="#work" className="btn btn-secondary">
              Ver mi trabajo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
