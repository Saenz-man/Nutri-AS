"use client";

import { useState, useEffect, Suspense } from "react"; // 💡 Agregamos Suspense
import { useRouter, useSearchParams } from "next/navigation"; // 💡 Importamos useSearchParams
import { ArrowLeft, Search, ChevronRight, Save, UserCircle, Loader2, UserPlus } from "lucide-react";
import ProximaCita from "./ProximaCita";
import MedicionesAnteriores from "./MedicionesAnteriores";
import CalculosAnteriores from "./CalculosAnteriores";
import Evolucion from "./Evolucion";
import { buscarPacientesAction, getPacienteById } from "@/lib/actions/pacientes"; // 💡 Importamos la nueva acción
import { toast } from "sonner";

// Componente interno para manejar la lógica de búsqueda de parámetros
function NuevaConsultaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pacienteIdUrl = searchParams.get("pacienteId"); // 🔍 Leemos el ID de la URL

  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(!!pacienteIdUrl); // Estado de carga inicial
  
  const [activeTab, setActiveTab] = useState("antropometria");
  const [peso, setPeso] = useState(0);
  const [talla, setTalla] = useState(170);
  const [imc, setImc] = useState(0);

  // 1. 🚀 AUTO-SELECCIÓN: Carga el paciente si viene desde el Dashboard
  useEffect(() => {
    const cargarPacienteDesdeUrl = async () => {
      if (pacienteIdUrl) {
        const res = await getPacienteById(pacienteIdUrl);
        if (res.success) {
          setSelectedPatient(res.paciente);
        } else {
          toast.error("No se pudo cargar el paciente de la cita.");
        }
        setIsLoadingInitial(false);
      }
    };
    cargarPacienteDesdeUrl();
  }, [pacienteIdUrl]);

  // 2. Búsqueda con Debounce (solo si no hay paciente seleccionado)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2 && !selectedPatient) {
        setIsSearching(true);
        const res = await buscarPacientesAction(searchQuery);
        if (res.success) setSearchResults(res.pacientes || []);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedPatient]);

  useEffect(() => {
    if (peso > 0 && talla > 0) {
      setImc(parseFloat((peso / ((talla/100)**2)).toFixed(2)));
    }
  }, [peso, talla]);

  // Pantalla de carga mientras se recupera el paciente de la URL
  if (isLoadingInitial) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="text-nutri-main animate-spin" size={48} />
        <p className="text-gray-500 font-bold">Cargando expediente del paciente...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* CABECERA */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-3 rounded-2xl border border-gray-100 bg-white text-gray-400 hover:text-nutri-main transition-all">
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-bold font-display">
            {selectedPatient ? "Consulta en Curso" : "Nueva Consulta"}
          </h1>
        </div>
        {selectedPatient && (
          <button onClick={() => router.push("/dashboard")} className="bg-nutri-orange text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all">
            <Save className="inline mr-2" size={18} /> Finalizar
          </button>
        )}
      </div>

      {!selectedPatient ? (
        /* BUSCADOR (Igual que antes) */
        <div className="glass-card p-12 max-w-2xl mx-auto space-y-8">
           <div className="text-center">
             <h2 className="text-2xl font-bold">Seleccionar Paciente</h2>
             <p className="text-gray-500 font-bold mt-1">Busca por nombre o expediente</p>
           </div>
           <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
             <input type="text" placeholder="Buscar..." className="nutri-input pl-12" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
             {isSearching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 text-nutri-main animate-spin" size={20} />}
           </div>
           <div className="space-y-3">
             {searchResults.map((p) => (
               <button key={p.id} onClick={() => setSelectedPatient(p)} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-3xl hover:border-nutri-main hover:bg-nutri-light transition-all group">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-nutri-main group-hover:text-white transition-all"><UserCircle /></div>
                   <div className="text-left"><p className="font-bold">{p.nombre} {p.apellido}</p></div>
                 </div>
                 <ChevronRight size={20} />
               </button>
             ))}
           </div>
        </div>
      ) : (
        /* VISTA DE CONSULTA ACTIVA */
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 space-y-6 lg:sticky lg:top-24">
            <div className="glass-card p-6 rounded-4xl border-l-4 border-l-nutri-main">
              <div className="flex items-center gap-4 mb-6">
                <UserCircle className="text-nutri-main" size={40} /> 
                <div className="font-bold leading-tight">{selectedPatient.nombre} {selectedPatient.apellido}</div>
              </div>
              
              {/* ✅ Pasamos el ID real para agendar la siguiente cita */}
              <ProximaCita patientId={selectedPatient.id} />
              
              <button onClick={() => { setSelectedPatient(null); router.replace("/dashboard/consultas/nueva"); }} className="w-full mt-4 text-[10px] font-bold text-red-400 uppercase tracking-widest">Cambiar Paciente</button>
            </div>
          </aside>

          <main className="flex-1 space-y-6">
            <div className="flex bg-white p-2 rounded-3xl shadow-sm border gap-2">
              {["antropometria", "calculos", "notas"].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-4 rounded-2xl font-bold capitalize transition-all ${activeTab === t ? 'bg-nutri-main text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}>{t}</button>
              ))}
            </div>
            <div className="glass-card p-8 rounded-4xl min-h-125">
              {activeTab === "antropometria" && <MedicionesAnteriores imcActual={imc} onPesoChange={setPeso} talla={talla} onTallaChange={setTalla} />}
              {activeTab === "calculos" && <CalculosAnteriores />}
              {activeTab === "notas" && <Evolucion />}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

// 💡 Exportamos con Suspense para evitar errores en Next.js al usar useSearchParams
export default function NuevaConsultaPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold">Cargando aplicación...</div>}>
      <NuevaConsultaContent />
    </Suspense>
  );
}