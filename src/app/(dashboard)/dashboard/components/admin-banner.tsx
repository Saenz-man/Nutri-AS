"use client";

import Image from "next/image";
import { Pencil, User, PlusCircle, FileText, Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CldUploadButton from "./perfil/CldUploadButton"; // ✅ Importar el botón que creamos

interface AdminUser {
  name?: string | null;
  image?: string | null;
  fotoPerfil?: string | null; // ✅ Sincronizado con Prisma
  fotoBanner?: string | null; // ✅ Sincronizado con Prisma
  role?: string;
}

export default function AdminBanner({ initialUser }: { initialUser?: AdminUser }) {
  const { data: session } = useSession();
  const router = useRouter();

  // Prioridad: Datos del servidor > Sesión del cliente > Default
  const userData = initialUser || (session?.user as AdminUser);

  return (
    <div className="relative w-full">
      
      {/* 🖼️ BANNER BACKGROUND WRAPPED */}
      <CldUploadButton tipo="fotoBanner">
        <div className="h-48 md:h-64 w-full rounded-[2rem] bg-gray-100 overflow-hidden relative group shadow-inner cursor-pointer">
          {userData?.fotoBanner ? (
            <Image 
              src={userData.fotoBanner} 
              alt="Banner personalizado" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-nutri-main/20 to-nutri-teal/20 flex items-center justify-center">
              <span className="text-gray-400 font-bold opacity-50 tracking-widest uppercase text-xs">
                Espacio para Banner Personalizado
              </span>
            </div>
          )}
          
          {/* Overlay de edición en hover para el banner */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold text-gray-700 shadow-lg">
              <Camera size={16} /> Cambiar Portada
            </div>
          </div>
        </div>
      </CldUploadButton>

      {/* Profile & Actions Container */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 px-8 -mt-16 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white relative">
              {/* Prioridad de imagen: Perfil guardado > Imagen de sesión > Icono default */}
              {(userData?.fotoPerfil || userData?.image) ? (
                <Image 
                  src={userData?.fotoPerfil || userData?.image || ""} 
                  alt="Avatar de usuario" 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-nutri-light flex items-center justify-center text-nutri-main">
                  <User size={60} />
                </div>
              )}
            </div>

            {/* 🔘 BOTÓN DE PERFIL WRAPPED */}
            <CldUploadButton tipo="fotoPerfil">
              <div 
                aria-label="Editar foto de perfil"
                className="absolute bottom-2 right-2 bg-nutri-orange text-white p-2.5 rounded-full shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <Pencil size={18} />
              </div>
            </CldUploadButton>
          </div>

          <div className="text-center md:text-left pb-4">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {userData?.name || "Especialista Nutri-AS"}
            </h2>
            <p className="text-nutri-main font-semibold text-lg">Nutriólogo/a Clínico</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pb-4">
          <button 
            onClick={() => router.push("/dashboard/pacientes/nuevo")} 
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl font-bold text-gray-700 shadow-sm border border-gray-100 hover:border-nutri-main hover:text-nutri-main transition-all active:bg-gray-50"
          >
            <PlusCircle size={20} /> Alta de Paciente
          </button>
          <button 
            onClick={() => router.push("/dashboard/consultas/nueva")} 
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl font-bold text-gray-700 shadow-sm border border-gray-100 hover:border-nutri-main hover:text-nutri-main transition-all active:bg-gray-50"
          >
            <FileText size={20} /> Nueva Consulta
          </button>
        </div>
      </div>
    </div>
  );
}