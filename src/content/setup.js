/**
 * Setup de hardware y entorno — vista detallada de "Sobre Mí".
 * `wide: true` hace que la tarjeta ocupe todo el ancho del grid.
 */
export const setup = [
  {
    title: "Estación de trabajo",
    specs: [
      ["Equipo", "Acer Nitro 5"],
      ["Procesador", "Intel Core i5"],
      ["Gráficos", "NVIDIA GeForce RTX 3050 Ti"],
      ["Memoria", "16 GB DDR4"],
      ["Almacenamiento", "512 GB SSD NVMe"],
    ],
  },
  {
    title: "Entorno de desarrollo",
    wide: true,
    specs: [
      ["Sistemas", "Dual boot: Windows 11 y Ubuntu para desarrollo."],
      ["Contenedores", "Docker y Docker Compose para reproducir en local los entornos de despliegue."],
    ],
  },
];

/** Hobbies e intereses — vista detallada de "Sobre Mí". */
export const hobbies = [
  {
    title: "Open source",
    detail: "Pequeñas librerías y scripts de automatización en Python y Node.js.",
  },
  {
    title: "Idiomas",
    detail: "Inglés de nivel B2 y primeros pasos con el **francés**.",
  },
  {
    title: "Lógica y estrategia",
    detail: "Ajedrez y videojuegos de estrategia en tiempo real.",
  },
];
