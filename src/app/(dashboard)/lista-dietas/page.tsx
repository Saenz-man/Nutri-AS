"use client";

import { useState } from "react";
import { 
  Flame, ChevronRight, FileDown, Eye, UtensilsCrossed 
} from "lucide-react";
import { NIVELES_KCAL, getSemanasDisponibles, getDietaPDF } from "./constants/dietas";

export default function ListaDietasPage() {
  const [selectedKcal, setSelectedKcal] = useState("1500");
  const [selectedWeek, setSelectedWeek] = useState({ label: "Semana 1", id: "S1" });

  // 1. Obtenemos las semanas reales para estas calorías
  const semanasDisponibles = getSemanasDisponibles(selectedKcal);
  
  // 2. Construimos la ruta del PDF
  const pdfUrl = getDietaPDF(selectedKcal, selectedWeek.id);

  // 3. Manejador inteligente de cambio de calorías
  const handleKcalChange = (kcal: string) => {
    setSelectedKcal(kcal);
    // Siempre reiniciar a Semana 1 para evitar errores (ej. estar en S10 y cambiar a una dieta de 4 semanas)
    setSelectedWeek({ label: "Semana 1", id: "S1" });
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight flex items-center gap-3">
            <span className="bg-nutri-main/10 p-3 rounded-2xl text-nutri-main">
              <UtensilsCrossed size={32} />
            </span>
            Catálogo de Dietas PDF
          </h1>
          <p className="text-gray-500 mt-2 font-medium ml-1">
            Visualiza e imprime los planes alimenticios por requerimiento calórico.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-[calc(100vh-250px)] min-h-[600px]">
        
        {/* 👈 SIDEBAR: SELECCIÓN DE KCAL */}
        <div className="lg:col-span-3 flex flex-col gap-4 h-full overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2 mb-2 sticky top-0 bg-nutri-light/50 backdrop-blur-sm py-2">
            Requerimiento
          </h3>
          {NIVELES_KCAL.map((kcal) => (
            <button
              key={kcal}
              onClick={() => handleKcalChange(kcal)}
              className={`w-full text-left p-4 rounded-2xl transition-all border-2 flex justify-between items-center group ${
                selectedKcal === kcal
                  ? "bg-gray-900 text-white border-gray-900 shadow-lg scale-[1.02]"
                  : "bg-white text-gray-600 border-gray-50 hover:border-nutri-main/30 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${selectedKcal === kcal ? "bg-white/20" : "bg-orange-50 text-orange-500"}`}>
                  <Flame size={18} />
                </div>
                <span className="font-bold text-lg italic">{kcal} <span className="text-xs font-normal opacity-70">kcal</span></span>
              </div>
              {selectedKcal === kcal && <ChevronRight size={18} />}
            </button>
          ))}
        </div>

        {/* 👉 VISOR PRINCIPAL */}
        <div className="lg:col-span-9 flex flex-col gap-6 h-full">
          
          {/* Pestañas de Semanas (Dinámicas) */}
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-gray-100 w-fit shadow-sm max-w-full overflow-x-auto pb-3 custom-scrollbar">
            {semanasDisponibles.map((semana) => (
              <button
                key={semana.id}
                onClick={() => setSelectedWeek(semana)}
                className={`whitespace-nowrap px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedWeek.id === semana.id
                    ? "bg-nutri-main text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {semana.label}
              </button>
            ))}
          </div>

          {/* Contenedor del PDF */}
          <div className="flex-1 bg-gray-900 rounded-[40px] p-2 shadow-2xl flex flex-col relative overflow-hidden">
            
            {/* Barra de herramientas del visor */}
            <div className="bg-gray-800 rounded-t-[32px] px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg text-white">
                  <Eye size={18} />
                </div>
                <span className="text-white text-sm font-bold truncate">
                  Viendo: <span className="text-nutri-main">Plan {selectedKcal} kcal - {selectedWeek.label}</span>
                </span>
              </div>
              
              <a 
                href={pdfUrl} 
                download={`Plan_NutriAS_${selectedKcal}kcal_${selectedWeek.id}.pdf`}
                className="flex items-center gap-2 bg-nutri-main hover:bg-white hover:text-nutri-main text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <FileDown size={16} /> Descargar PDF
              </a>
            </div>

            {/* Iframe del PDF */}
            <div className="flex-1 bg-white rounded-b-[32px] overflow-hidden relative group">
              <iframe 
                src={`${pdfUrl}#toolbar=0&view=FitH`} 
                className="w-full h-full object-cover"
                title="Visor de Dieta"
              />
              
              {/* Overlay por si el archivo no existe */}
              <object data={pdfUrl} type="application/pdf" className="hidden">
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-400 z-0">
                    <p className="font-bold">No se encontró el archivo</p>
                    <p className="text-xs">Verifica: {selectedKcal}_{selectedWeek.id}.pdf</p>
                 </div>
              </object>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}