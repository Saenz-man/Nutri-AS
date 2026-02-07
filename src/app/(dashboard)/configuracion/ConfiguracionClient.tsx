"use client";

import { useState } from "react";
import { User, ShieldCheck, CreditCard } from "lucide-react";
import PerfilForm from "./components/PerfilForm";
import SeguridadForm from "./components/SeguridadForm";
import PlanSuscripcion from "./components/PlanSuscripcion";

export default function ConfiguracionPage({ userData }: { userData: any }) {
  const [activeTab, setActiveTab] = useState("perfil");

  const tabs = [
    { id: "perfil", label: "Perfil Profesional", icon: <User size={18} /> },
    { id: "seguridad", label: "Seguridad", icon: <ShieldCheck size={18} /> },
    { id: "suscripcion", label: "Mi Plan", icon: <CreditCard size={18} /> },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Configuración</h1>
        <p className="text-gray-500 font-medium">Gestiona tu identidad digital y preferencias en Nutri-AS</p>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        {/* Navegación de Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-8 py-5 text-sm font-bold transition-all relative ${
                activeTab === tab.id 
                  ? "text-nutri-main" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-nutri-main rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Contenido Dinámico */}
        <div className="p-8 md:p-12">
          {activeTab === "perfil" && <PerfilForm user={userData} />}
          {activeTab === "seguridad" && <SeguridadForm userId={userData.id} />}
          {activeTab === "suscripcion" && <PlanSuscripcion user={userData} />}
        </div>
      </div>
    </div>
  );
}