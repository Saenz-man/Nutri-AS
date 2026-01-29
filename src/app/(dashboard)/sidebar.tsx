"use client";

import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardList, 
  Calculator, 
  Settings, 
  LogOut, 
  X 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

// Definición de los módulos solicitados
const menuItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: Users, label: "Pacientes", href: "/dashboard/pacientes" },
  { icon: BookOpen, label: "Material de apoyo", href: "/dashboard/material" },
  { icon: ClipboardList, label: "Lista de dietas", href: "/dashboard/dietas" },
  { icon: Calculator, label: "Calculadora", href: "/dashboard/calculadora" },
  { icon: Settings, label: "Configuración", href: "/dashboard/configuracion" },
];

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* OVERLAY PARA MÓVILES: Se cierra al dar clic fuera */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* CONTENEDOR DEL SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-nutri-main text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 flex flex-col shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        {/* HEADER DEL SIDEBAR: Logo y botón de cierre móvil */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl">N</div>
            <h1 className="text-2xl font-bold tracking-tight">
              Nutri-AS<span className="text-nutri-orange">.</span>
            </h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* MENÚ DE MÓDULOS */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)} // Cierra el menú al navegar en móvil
                className={`
                  flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 font-bold group
                  ${isActive 
                    ? "bg-white text-nutri-main shadow-lg translate-x-1" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"}
                `}
              >
                <item.icon size={22} className={isActive ? "text-nutri-main" : "text-white/60 group-hover:text-white"} />
                <span className="text-sm tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER DEL SIDEBAR: Cierre de Sesión */}
        <div className="p-6 border-t border-white/10">
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/70 hover:text-white hover:bg-red-500/20 transition-all font-bold group"
          >
            <LogOut size={22} className="text-white/50 group-hover:text-white" />
            <span className="text-sm">Cerrar Sesión</span>
          </button>
          
          <div className="mt-6 px-4">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest text-center">
              Powered by Un Desarrollo Mas
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}