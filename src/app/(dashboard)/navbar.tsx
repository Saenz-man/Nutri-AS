"use client";

import { Bell, Search, User as UserIcon, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Definimos la interfaz para que TypeScript no marque error (Error 2322)
interface NavbarProps {
  onMenuClick: () => void;
}

export default function DashboardNavbar({ onMenuClick }: NavbarProps) {
  const { data: session } = useSession();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-20 bg-white/60 backdrop-blur-md border-b border-gray-100 px-6 md:px-10 flex items-center justify-between sticky top-0 z-40">
      
      <div className="flex items-center gap-4 flex-1">
        {/* BOTÓN HAMBURGUESA: Ahora usa la función recibida */}
        <button 
          onClick={onMenuClick} 
          className="md:hidden text-nutri-main p-2 hover:bg-nutri-light rounded-xl transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center bg-nutri-light rounded-2xl px-4 py-2 w-full max-w-md border border-gray-100">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar pacientes..." 
            className="bg-transparent border-none outline-none px-3 w-full text-sm font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Notificaciones y Perfil (Mismo código de antes) */}
        <button className="relative p-2 text-gray-500 hover:text-nutri-main transition-colors">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-nutri-orange rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{session?.user?.name || "Nutriólogo"}</p>
            <p className="text-xs font-bold text-nutri-main uppercase">{session?.user?.status || "Especialista"}</p>
          </div>
          <button className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
            <UserIcon size={24} className="mx-auto text-nutri-main" />
          </button>
        </div>
      </div>
    </header>
  );
}