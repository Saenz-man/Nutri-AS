"use client";

import { useState, useEffect, Suspense, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, Search, ChevronRight, Save, UserCircle, 
  Loader2, Database, Scale, Ruler, Activity 
} from "lucide-react";
import { buscarPacientesAction, getPacienteById } from "@/lib/actions/pacientes";
import { guardarMedicionAction } from "@/lib/actions/mediciones"; // ✅ Tu acción actualizada
import { toast } from "sonner";

// Componentes secundarios (Asegúrate de que acepten las props de cambio de estado)
import ProximaCita from "./ProximaCita";
import MedicionesAnteriores from "./MedicionesAnteriores";

function NuevaConsultaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  // 🔍 Captura de IDs desde la URL
  const pacienteIdUrl = searchParams.get("pacienteId");
  const citaIdUrl = searchParams.get("citaId");

  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(!!pacienteIdUrl);
  
  // 📊 Estados Antropométricos (Preconsulta)
  const [peso, setPeso] = useState<number>(0);
  const [talla, setTalla] = useState<number>(170);
  const [imc, setImc] = useState<number>(0);

  // 1. 🚀 AUTO-SELECCIÓN: Carga inicial del paciente
  useEffect(() => {
    const cargarPaciente = async () => {
      if (pacienteIdUrl) {
        const res = await getPacienteById(pacienteIdUrl);
        if (res.success) setSelectedPatient(res.paciente);
        else toast.error("No se pudo cargar el paciente.");
        setIsLoadingInitial(false);
      }
    };
    cargarPaciente();
  }, [pacienteIdUrl]);

  // 2. 🧮 CÁLCULO DE IMC EN TIEMPO REAL
  useEffect(() => {
    if (peso > 0 && talla > 0) {
      const calculo = parseFloat((peso / ((talla / 100) ** 2)).toFixed(2));
      setImc(calculo);
    }
  }, [peso, talla]);

  // 3. 🔍 BUSCADOR CON DEBOUNCE
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

  // 💾 GUARDAR PRECONSULTA Y ABRIR CATÁLOGO
  const handleFinalizarPreconsulta = async () => {
    if (peso <= 0) return toast.error("Ingresa el peso del paciente.");
    
    setLoading(true);
    
    // Preparamos los datos para tu guardarMedicionAction
    const dataMedicion = { peso, talla, imc };
    const fechaActual = new Date().toISOString();

    const res = await guardarMedicionAction(selectedPatient.id, dataMedicion, fechaActual);

    if (res.success) {
      toast.success("Preconsulta guardada exitosamente.");
      // 🔄 Redirección al Catálogo/Expediente
      startTransition(() => {
        router.push(`/dashboard/Pacientes/${selectedPatient.id}`);
      });
    } else {
      toast.error(res.error || "Error al guardar medición.");
    }
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  if (isLoadingInitial) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="text-nutri-main animate-spin" size={48} />
        <p className="text-gray-500 font-black uppercase text-xs tracking-widest">Sincronizando Expediente...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20 p-4">
      
      {/* 🔝 CABECERA DINÁMICA */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="p-3 rounded-2xl border border-gray-100 bg-white text-gray-400 hover:text-nutri-main transition-all shadow-sm"
          >
            <ArrowLeft />
          </button>
          <div>
            <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Módulo de Atención</p>
            <h1 className="text-3xl font-black font-display tracking-tighter italic uppercase text-gray-800">
              {selectedPatient ? "Preconsulta" : "Nueva Consulta"}
            </h1>
          </div>
        </div>

        {selectedPatient && (
          <button 
            onClick={handleFinalizarPreconsulta} 
            disabled={loading || isPending}
            className="w-full md:w-auto bg-gray-900 text-white px-10 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Finalizar Preconsulta y Abrir Catálogo
          </button>
        )}
      </div>

      {!selectedPatient ? (
        /* 🔎 BUSCADOR DE PACIENTES */
        <div className="glass-card p-12 max-w-2xl mx-auto space-y-8 bg-white rounded-[40px] shadow-sm border border-gray-100">
           <div className="text-center space-y-2">
             <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter italic">Seleccionar Paciente</h2>
             <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Acceso rápido al expediente clínico</p>
           </div>
           <div className="relative">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
             <input 
               type="text" 
               placeholder="Nombre del paciente..." 
               className="nutri-input pl-14 py-5 rounded-3xl border-2 border-gray-50 focus:border-nutri-main outline-none transition-all w-full font-bold" 
               value={searchQuery} 
               onChange={(e) => setSearchQuery(e.target.value)} 
             />
             {isSearching && <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 text-nutri-main animate-spin" size={20} />}
           </div>
           <div className="space-y-3">
             {searchResults.map((p) => (
               <button 
                 key={p.id} 
                 onClick={() => setSelectedPatient(p)} 
                 className="w-full flex items-center justify-between p-5 bg-gray-50/50 border border-gray-100 rounded-3xl hover:border-nutri-main hover:bg-nutri-light transition-all group shadow-sm"
               >
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:bg-nutri-main group-hover:text-white transition-all shadow-sm">
                     <UserCircle />
                   </div>
                   <div className="text-left">
                     <p className="font-black text-gray-800 uppercase text-xs">{p.nombre} {p.apellido}</p>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Ver expediente</p>
                   </div>
                 </div>
                 <ChevronRight className="text-gray-300 group-hover:text-nutri-main transition-colors" size={20} />
               </button>
             ))}
           </div>
        </div>
      ) : (
        /* 🏥 VISTA DE PRECONSULTA ACTIVA */
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* PERFIL IZQUIERDO */}
          <aside className="w-full lg:w-80 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-nutri-light flex items-center justify-center text-nutri-main border-4 border-white shadow-lg mb-4">
                <UserCircle size={48} /> 
              </div>
              <div className="text-center mb-6">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic mb-1">Paciente Activo</p>
                <div className="text-xl font-black text-gray-800 leading-tight uppercase tracking-tighter">
                  {selectedPatient.nombre} <br /> {selectedPatient.apellido}
                </div>
              </div>
              
              <div className="w-full border-t border-gray-50 pt-6 space-y-4">
                <ProximaCita patientId={selectedPatient.id} />
              </div>

              <button 
                onClick={() => { setSelectedPatient(null); router.replace("/dashboard/consultas/nueva"); }} 
                className="mt-8 text-[9px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-2 transition-colors"
              >
                <X size={12}/> Cambiar Paciente
              </button>
            </div>
          </aside>

          {/* ÁREA DE CAPTURA (PRECONSULTA) */}
          <main className="flex-1 space-y-6 w-full">
            {/* CARD DE ANTROPOMETRÍA RÁPIDA */}
            <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 italic">
                  <Activity size={16} className="text-nutri-main" /> Datos de Ingreso
                </h3>
                <div className="bg-nutri-light text-nutri-main px-4 py-1.5 rounded-full text-[10px] font-black uppercase">
                  Paso 1: Antropometría
                </div>
              </div>

              {/* ✅ INTEGRACIÓN CON MEDICIONES ANTERIORES */}
              <div className="grid grid-cols-1 gap-10">
                <MedicionesAnteriores 
                  imcActual={imc} 
                  onPesoChange={setPeso} 
                  talla={talla} 
                  onTallaChange={setTalla} 
                />
              </div>

              {/* RESUMEN VISUAL DE PRECONSULTA */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-50">
                <div className="p-4 bg-gray-50 rounded-3xl text-center">
                   <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Peso</p>
                   <p className="text-lg font-black text-gray-800">{peso} <span className="text-[10px]">kg</span></p>
                </div>
                <div className="p-4 bg-gray-50 rounded-3xl text-center">
                   <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Talla</p>
                   <p className="text-lg font-black text-gray-800">{talla} <span className="text-[10px]">cm</span></p>
                </div>
                <div className="p-4 bg-nutri-main/5 border border-nutri-main/10 rounded-3xl text-center">
                   <p className="text-[9px] font-black text-nutri-main uppercase mb-1">IMC</p>
                   <p className="text-lg font-black text-nutri-main">{imc}</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}

export default function NuevaConsultaPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black uppercase text-xs tracking-widest animate-pulse">Iniciando Nutri-AS...</div>}>
      <NuevaConsultaContent />
    </Suspense>
  );
}

// Icono X no importado arriba
function X({size}: {size: number}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
}