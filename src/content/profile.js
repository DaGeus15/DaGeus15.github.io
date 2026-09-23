/**
 * Datos personales que NO se traducen. El rol, la frase de presentación, la
 * ubicación y la bio viven en `copy.js` y se unen en `lib/useContent.js`.
 *
 * Fuente: el CV (`public/Dayle-Garcia-Fernandez-CV-*.pdf`). Si cambia el CV,
 * este archivo y `copy.js` se actualizan con él.
 */
export const profile = {
  name: "Daylé García Fernández",
  /* El rol va aquí además de en `copy.js`: los metadatos (título, Open Graph)
     se generan al construir y también se piden fuera de React. */
  role: "Software Engineer",
  email: "garciadayle2004@gmail.com",
  /* Retrato completo (Open Graph, datos estructurados) y recorte cuadrado de
     cara y hombros para la columna fija: a 88px el retrato entero en un
     cuadrado dejaba la cara diminuta. Si cambia la foto, regenerá el recorte. */
  avatar: "/dayle.jpeg",
  avatarSquare: "/dayle-avatar.jpg",
  /* Las dos versiones del CV: quien lee en español puede querer el inglés para
     mandarlo fuera, así que el botón ofrece ambas. */
  cvEs: "/Dayle-Garcia-Fernandez-CV-ES.pdf",
  cvEn: "/Dayle-Garcia-Fernandez-CV-EN.pdf",
};

export default profile;
