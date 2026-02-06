// src/app/(dashboard)/Pacientes/[id]/historia/components/HistoriaHeader.tsx
"use client";

import { FileDown, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ExpedienteCompletoPDF from "@/components/pdf/ExpedienteCompletoPDF";

interface HeaderProps {
  paciente: any; // Ahora recibe el objeto completo con appointments
}

export default function HistoriaHeader({ paciente }: HeaderProps) {
  const router = useRouter();

  // Datos dinámicos del nutriólogo
  const nutricionista = {
    nombre: "Edgar Uriel",
    apellido: "Saenz Bobadilla",
    cedula: "---",
    telefono: "4615976167"
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

      {/* 📥 BOTÓN DE EXPORTACIÓN DINÁMICO */}
      <div className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 cursor-pointer">
        <FileDown size={16} />
        <PDFDownloadLink
          document={<ExpedienteCompletoPDF paciente={paciente} nutricionista={nutricionista} />}
          fileName={`Expediente_${paciente.nombre}_${paciente.apellido}.pdf`}
        >
          {({ loading }) => (loading ? "Preparando Archivos..." : "Exportar Reporte Completo (PDF)")}
        </PDFDownloadLink>
      </div>
    </div>
  );
}