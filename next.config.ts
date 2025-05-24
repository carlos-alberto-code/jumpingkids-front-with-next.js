/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuración para desarrollo cross-origin
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '10.0.0.218', // Tu IP de red mostrada en la terminal
  ],
}

module.exports = nextConfig