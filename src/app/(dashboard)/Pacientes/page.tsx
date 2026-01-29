"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { getPacientes } from "@/lib/actions/pacientes";
import PatientCard from "./patient-card";

export default function PacientesPage() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Carga inicial desde la base de datos de Hostinger
  useEffect(() => {
    const fetchData = async () => {
      const res = await getPacientes();
      if (res.success) setPacientes(res.pacientes || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* 🔝 CABECERA: Título y Alta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 font-display">
            <Users className="text-nutri-main" size={40} /> Pacientes
          </h1>
          <p className="text-gray-500 font-bold mt-1">
            Gestiona tu cartera de {pacientes.length} pacientes activos.
          </p>
        </div>
        
        <button 
          onClick={() => router.push("/dashboard/pacientes/nuevo")}
          className="bg-nutri-main text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-green-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={22} /> Alta de Paciente
        </button>
      </div>

      {/* 🗂️ LISTADO DE TARJETAS MASIVO */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="text-nutri-main animate-spin" size={48} />
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Cargando Catálogo...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pacientes.map(paciente => (
            <PatientCard key={paciente.id} patient={paciente} />
          ))}
        </div>
      )}

      {/* Mensaje de estado vacío */}
      {!loading && pacientes.length === 0 && (
        <div className="text-center py-24 bg-white rounded-4xl border-2 border-dashed border-gray-100">
          <p className="text-gray-400 font-bold text-lg">Aún no has registrado pacientes en tu cuenta.</p>
          <button 
            onClick={() => router.push("/dashboard/pacientes/nuevo")}
            className="mt-4 text-nutri-main font-black text-xs uppercase tracking-widest hover:underline"
          >
            Comenzar primer registro
          </button>
        </div>
      )}
    </div>
  );
}