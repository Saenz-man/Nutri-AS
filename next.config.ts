// next.config.ts
const nextConfig = {
  async rewrites() {
    return [
       {
       source: '/dashboard/dietas',       // La URL bonita
        destination: '/lista-dietas',
      },
        {
    source: '/dashboard/material',     // La URL bonita
        destination: '/material-apoyo',
      },
        {
        // ⚙️ Configuración del usuario
        source: '/dashboard/configuracion',
        destination: '/configuracion',
      },
      {
        // ⚙️ Configuración del usuario
        source: '/dashboard/calculadora',
        destination: '/calculadora',
      },
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