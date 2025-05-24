/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para permitir solicitudes de desarrollo desde diferentes orígenes
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '10.0.0.218', // Tu IP de red actual (sin el puerto)
  ],
  
  // Configuración para imágenes si planeas usar next/image
  images: {
    domains: [
      // Agrega aquí los dominios de donde cargarás imágenes
    ],
  },
  
  // Optimizar el bundle
  compiler: {
    // Remover console.logs en producción
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;