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
  /* Retrato completo. Los datos estructurados usan esta ruta. La portada
     usa las variantes WebP de `npm run portrait` (`content/portrait.js`).
     El recorte de cara y hombros (`public/dayle-avatar.jpg`) es la imagen
     de vista previa (`npm run og`) y el avatar de la portada en móvil; si
     cambia la foto, regenerá los dos. */
  avatar: "/dayle.jpeg",
  /* Las dos versiones del CV: quien lee en español puede querer el inglés para
     mandarlo fuera, así que el botón ofrece ambas. */
  cvEs: "/Dayle-Garcia-Fernandez-CV-ES.pdf",
  cvEn: "/Dayle-Garcia-Fernandez-CV-EN.pdf",
};

export default profile;
