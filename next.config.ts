/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configuración para GitHub Pages
  output: 'export',
  trailingSlash: true,

  // Configurar basePath si tu repo NO es tu-usuario.github.io
  // Cambia 'jumpingkids-front-with-next.js' por el nombre exacto de tu repo
  basePath: process.env.NODE_ENV === 'production' ? '/jumpingkids-front-with-next.js' : '',

  // Deshabilitar optimización de imágenes para export estático
  images: {
    unoptimized: true
  },

  // Para desarrollo
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '10.0.0.218',
  ],

  // ✅ Ignorar errores de ESLint durante el build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Ignorar errores de TypeScript durante el build  
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig