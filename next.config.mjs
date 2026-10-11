/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // `/es/` -> `es/index.html`: GitHub Pages lo sirve sin reescrituras.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Navegar entre rutas con View Transitions (<ViewTransition> de React): la
  // captura de una tarjeta crece hasta la portada de su caso y vuelve al
  // regresar. Sin soporte en el navegador, se navega igual, sin animar.
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
