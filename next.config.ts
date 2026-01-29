// next.config.ts
const nextConfig = {
  async rewrites() {
    return [
      {
        // 🌍 CAPTURA TODO: dashboard/pacientes/ID/historia -> Pacientes/ID/historia
        source: '/dashboard/pacientes/:id/:path*', 
        destination: '/Pacientes/:id/:path*',
      },
      {
        // Para el expediente principal (ID)
        source: '/dashboard/pacientes/:id', 
        destination: '/Pacientes/:id',
      },
      {
        // Para el catálogo general
        source: '/dashboard/pacientes',
        destination: '/Pacientes',
      },
    ]
  },
};

export default nextConfig;