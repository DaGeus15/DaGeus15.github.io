/**
 * Logos de quien emite o organiza: certificaciones (por su `id` en
 * `copy.js`), la formación y los eventos de `activities.js`. Lo que no tiene
 * logo propio lleva el icono genérico de su tipo.
 *
 * Los archivos están en `public/assets/images/logos/`: cuadrados de 176 px
 * con fondo blanco, el símbolo centrado con margen, para que todos pesen lo
 * mismo a la vista. Salen de sus certificados (HatunSoft, FISEI, UTA, CSEI,
 * Cisco, EF SET) o de las webs oficiales (Cambridge, Grok, TCS, Migo).
 */
const dir = "/assets/images/logos";

export const logos = {
  // certificaciones
  efset: `${dir}/efset.webp`,
  cambridge: `${dir}/cambridge.webp`,
  dataScience: `${dir}/cisco.webp`,
  esp32: `${dir}/fisei.webp`,
  networks: `${dir}/cisco.webp`,
  iot: `${dir}/cisco.webp`,
  // formación
  education: `${dir}/uta.webp`,
  // eventos
  grokbot: `${dir}/grok.webp`,
  hackathon: `${dir}/uta.webp`,
  congresoUta: `${dir}/uta.webp`,
  codificadas: `${dir}/tcs.webp`,
  csei: `${dir}/csei.webp`,
  hatunsoft: `${dir}/hatunsoft.webp`,
};

export default logos;
