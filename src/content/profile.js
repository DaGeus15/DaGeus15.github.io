/**
 * Datos personales.
 * Editá este archivo para actualizar tu nombre, foto, bio o CV.
 */
export const profile = {
  name: "Dayle Garcia",
  role: "Software Engineer",
  avatar: "/dayle.jpeg",
  cv: "/Dayle-Garcia-Fernandez-CV.pdf",
  location: "Ambato, Ecuador",
  nationality: "Cubana/Española",

  /** Bio corta — se muestra en la vista resumida. */
  bioShort: [
    "Desarrolladora de software centrada en el backend. Construyo APIs y servicios con **Spring Boot**, **NestJS** y Node.js, modelo bases de datos relacionales y despliego con **Docker**.",
    "También trabajo el lado full-stack y la infraestructura cloud. Me mueve la arquitectura limpia y las buenas prácticas: pruebas, contenedores y código que otros puedan mantener.",
  ],

  /** Párrafos extra que sólo aparecen en la vista detallada. */
  bioExtra: [
    "Mantengo mi propia infraestructura en Oracle Cloud, donde despliego y administro mis proyectos de forma autónoma.",
  ],
};

export default profile;
