"use client";

import { useState } from "react";
import { Search, FileText, Download, Eye, ChevronRight, MousePointerClick } from "lucide-react";
import { RECURSOS, CATEGORIAS } from "./constants/recursos";

export default function MaterialApoyoPage() {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  // Estado para el documento seleccionado (Inicia con el primero o null)
  const [selectedDoc, setSelectedDoc] = useState(RECURSOS[0]);

  const recursosFiltrados = RECURSOS.filter((rec) => {
    const coincideCategoria = filtro === "Todos" || rec.categoria === filtro;
    const coincideBusqueda = rec.titulo.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight flex items-center gap-3">
            <span className="bg-nutri-main/10 p-3 rounded-2xl text-nutri-main">
              <FileText size={32} />
            </span>
            Material de Apoyo
          </h1>
          <p className="text-gray-500 mt-2 font-medium ml-1">
            Recursos clínicos y educativos listos para tus consultas.
          </p>
        </div>

        {/* BUSCADOR */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-nutri-main transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Buscar documento..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-white focus:ring-4 focus:ring-nutri-main/10 focus:border-nutri-main outline-none transition-all shadow-sm"
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* CONTENIDO DIVIDIDO (MASTER-DETAIL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-[calc(100vh-250px)]">
        
        {/* 👈 COLUMNA IZQUIERDA: MENÚ Y LISTA */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-hidden">
          
          {/* Categorías (Scroll Horizontal en móvil) */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  filtro === cat 
                    ? "bg-gray-900 text-white border-gray-900 shadow-md" 
                    : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lista de Items (Scroll Vertical) */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {recursosFiltrados.length > 0 ? (
              recursosFiltrados.map((rec) => (
                <button
                  key={rec.id}
                  onClick={() => setSelectedDoc(rec)}
                  className={`w-full text-left p-4 rounded-3xl transition-all border-2 group relative overflow-hidden ${
                    selectedDoc.id === rec.id
                      ? "bg-nutri-main text-white border-nutri-main shadow-lg shadow-nutri-main/30 scale-[1.02]"
                      : "bg-white text-gray-600 border-gray-50 hover:border-nutri-main/30 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`p-3 rounded-2xl ${selectedDoc.id === rec.id ? "bg-white/20 text-white" : rec.color}`}>
                      <rec.icon size={20} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-sm leading-tight ${selectedDoc.id === rec.id ? "text-white" : "text-gray-800"}`}>
                        {rec.titulo}
                      </h3>
                      <p className={`text-[10px] mt-1 line-clamp-2 ${selectedDoc.id === rec.id ? "text-white/80" : "text-gray-400"}`}>
                        {rec.descripcion}
                      </p>
                    </div>
                    {selectedDoc.id === rec.id && (
                      <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 opacity-50" />
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-sm font-medium">No se encontraron resultados.</p>
              </div>
            )}
          </div>
        </div>

        {/* 👉 COLUMNA DERECHA: PREVISUALIZADOR */}
        <div className="lg:col-span-8 bg-gray-900 rounded-[40px] p-2 h-full shadow-2xl flex flex-col relative overflow-hidden">
          
          {selectedDoc ? (
            <>
              {/* Barra Superior del Visor */}
              <div className="bg-gray-800 rounded-t-[32px] px-6 py-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg text-white">
                    <Eye size={18} />
                  </div>
                  <span className="text-white text-sm font-bold truncate max-w-[200px] md:max-w-md">
                    Previsualizando: <span className="text-nutri-main">{selectedDoc.titulo}</span>
                  </span>
                </div>
                
                <a 
                  href={selectedDoc.archivo} 
                  download 
                  className="flex items-center gap-2 bg-nutri-main hover:bg-white hover:text-nutri-main text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                >
                  <Download size={16} /> Descargar
                </a>
              </div>

              {/* PDF Iframe */}
              <div className="flex-1 bg-white rounded-b-[32px] overflow-hidden relative">
                <iframe 
                  src={`${selectedDoc.archivo}#toolbar=0&view=FitH`} 
                  className="w-full h-full object-cover"
                  title="Visor PDF"
                />
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-4">
              <MousePointerClick size={64} />
              <p className="font-bold text-lg">Selecciona un documento para visualizarlo</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}