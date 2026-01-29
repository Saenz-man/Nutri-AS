"use client";

import { Camera, Pencil, User, PlusCircle, FileText } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // 1. Importación necesaria

export default function AdminBanner() {
  const { data: session } = useSession();
  const router = useRouter(); // 2. Inicialización del router

  return (
    <div className="relative w-full">
      {/* 1. PORTADA EDITABLE */}
      <div className="h-48 md:h-64 w-full rounded-4xl bg-gray-100 overflow-hidden relative group shadow-inner">
        <div className="w-full h-full bg-gradient-to-r from-nutri-main/20 to-nutri-teal/20 flex items-center justify-center">
          <span className="text-gray-400 font-bold opacity-50 tracking-widest uppercase text-xs">
            Espacio para Banner Personalizado
          </span>
        </div>
        <label className="absolute bottom-4 right-6 bg-white/80 backdrop-blur-md p-2 rounded-xl text-nutri-main cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          <Camera size={18} />
          <input type="file" className="hidden" accept="image/*" />
        </label>
      </div>

      {/* 2. CONTENEDOR DE IDENTIDAD Y ACCIONES */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 px-8 -mt-16 relative z-10">
        
        {/* Lado Izquierdo: Avatar e Info Profesional */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
              {session?.user?.image ? (
                <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-nutri-light flex items-center justify-center text-nutri-main">
                  <User size={60} />
                </div>
              )}
            </div>
            <button className="absolute bottom-2 right-2 bg-nutri-orange text-white p-2.5 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
              <Pencil size={18} />
            </button>
          </div>

          <div className="text-center md:text-left pb-4">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {session?.user?.name || "Especialista Nutri-AS"}
            </h2>
            <p className="text-nutri-main font-bold text-lg">
              Nutriólogo/a Clínico
            </p>
          </div>
        </div>

        {/* Lado Derecho: Los Botones Reubicados */}
        <div className="flex flex-wrap gap-4 pb-4">
          <button 
            onClick={() => router.push("/dashboard/pacientes/nuevo")} // 3. Ahora el router ya existe
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl font-bold text-gray-700 shadow-sm border border-gray-100 hover:border-nutri-main hover:text-nutri-main transition-all"
          >
            <PlusCircle size={20} /> Alta de Paciente
          </button>
        <button 
        onClick={() => router.push("/dashboard/consultas/nueva")} 
        className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl font-bold text-gray-700 shadow-sm border border-gray-100 hover:border-nutri-main hover:text-nutri-main transition-all"
      >
        <FileText size={20} /> Nueva Consulta
      </button>
        </div>

      </div>
    </div>
  );
}