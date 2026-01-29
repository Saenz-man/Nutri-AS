"use client"; // ✅ Indispensable para manejar eventos de clic

import { FileDown, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  paciente: {
    nombre: string;
    apellido: string;
    expediente: string;
  };
}

export default function HistoriaHeader({ paciente }: HeaderProps) {
  const router = useRouter();

  // ✅ La función de exportación vive aquí, en el cliente
  const handleExport = () => {
    console.log("Iniciando exportación de PDF para:", paciente.nombre);
    // Aquí integraremos jspdf o tu lógica de impresión más adelante
    alert(`Generando reporte profesional de ${paciente.nombre} ${paciente.apellido}...`);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => router.back()}
          className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Expediente Clínico</p>
          <h1 className="text-2xl font-black text-gray-800">
            {paciente.nombre} {paciente.apellido}
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            ID: {paciente.expediente}
          </p>
        </div>
      </div>

      <button 
        onClick={handleExport}
        className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
      >
        <FileDown size={16} />
        Exportar Reporte Completo (PDF)
      </button>
    </div>
  );
}