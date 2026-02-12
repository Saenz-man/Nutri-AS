// next.config.mjs o next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🖼️ CONFIGURACIÓN DE IMÁGENES (Añade esto)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Permite cualquier ruta dentro de Cloudinary
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/dashboard/dietas',
        destination: '/lista-dietas',
      },
      {
        source: '/dashboard/material',
        destination: '/material-apoyo',
      },
      {
        source: '/dashboard/configuracion',
        destination: '/configuracion',
      },
      {
        source: '/dashboard/calculadora',
        destination: '/calculadora',
      },
      {
        // 🌍 CAPTURA TODO: dashboard/pacientes/ID/historia -> Pacientes/ID/historia
        source: '/dashboard/pacientes/:id/:path*', 
        destination: '/Pacientes/:id/:path*',
      },
      {
        source: '/dashboard/pacientes/:id', 
        destination: '/Pacientes/:id',
      },
      {
        source: '/dashboard/pacientes',
        destination: '/Pacientes',
      },
    ]
  },
};

export default nextConfig;