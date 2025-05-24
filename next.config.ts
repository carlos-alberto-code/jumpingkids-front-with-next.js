import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    '10.0.0.218:3000', // IP de red actual
  ],
};

export default nextConfig;
