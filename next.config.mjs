/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // `/es/` -> `es/index.html`: GitHub Pages lo sirve sin reescrituras.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
