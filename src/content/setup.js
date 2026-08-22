/**
 * Setup de hardware y entorno — vista detallada de "Sobre Mí".
 * `wide: true` hace que la tarjeta ocupe todo el ancho del grid.
 */
export const setup = [
  {
    title: "Estación de Trabajo",
    specs: [
      ["Laptop", "Acer Nitro 5"],
      ["Procesador", "Intel Core i5"],
      ["Memoria", "16 GB RAM DDR4"],
      ["Almacenamiento", "512 GB SSD NVMe"],
    ],
  },
  {
    title: "Procesamiento local de IA",
    specs: [
      ["Tarjeta Gráfica", "NVIDIA GeForce RTX 3050 Ti Laptop GPU"],
      ["Entorno CUDA", "Configurado para PyTorch y TensorFlow"],
    ],
    note: "Esta GPU dedicada me permite el entrenamiento y ejecución local de redes neuronales convolucionales (CNN) y procesamiento de imágenes sin depender de servicios cloud costosos.",
  },
  {
    title: "Entorno de Desarrollo y Virtualización",
    wide: true,
    specs: [
      [
        "Sistemas Operativos",
        "Dual Boot con Windows 11 para flujos de trabajo tradicionales y Linux (Ubuntu) optimizado para desarrollo.",
      ],
      [
        "Contenedores",
        "Docker y Docker Compose para crear y probar entornos locales de despliegue.",
      ],
    ],
  },
];

/** Hobbies e intereses — vista detallada de "Sobre Mí". */
export const hobbies = [
  {
    title: "Desarrollo Open Source",
    detail:
      "Creación de pequeñas librerías y scripts de automatización en Python y Node.js.",
  },
  {
    title: "Idiomas",
    detail:
      "Actualmente practicando inglés de nivel intermedio-avanzado (B2) y dando mis primeros pasos en el aprendizaje del **Francés**.",
  },
  {
    title: "Lógica y Estrategia",
    detail:
      "Disfruto de la resolución de problemas lógicos, el ajedrez y los videojuegos de estrategia en tiempo real.",
  },
];
