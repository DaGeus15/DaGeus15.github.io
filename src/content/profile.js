/**
 * Datos personales que NO se traducen.
 * El rol, la ubicación, la nacionalidad y la bio viven en `copy.js`, en los
 * dos idiomas, y se unen con esto en `src/lib/useContent.js`.
 */
export const profile = {
  name: "Dayle Garcia",
  /* El rol se repite en `copy.js` para poder traducirlo en la interfaz. Aquí
     se queda una copia porque los metadatos (title, Open Graph) se generan al
     construir el sitio y no pueden depender del idioma del visitante. */
  role: "Software Engineer",
  avatar: "/dayle.jpeg",
  /* Dos versiones del CV: el botón de descarga ofrece ambas, no adivina por
     el idioma de la interfaz — quien mira el sitio en español puede querer el
     CV en inglés para mandarlo fuera. */
  cvEs: "/Dayle-Garcia-Fernandez-CV-ES.pdf",
  cvEn: "/Dayle-Garcia-Fernandez-CV-EN.pdf",
};

export default profile;
