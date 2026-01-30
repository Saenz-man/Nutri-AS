"use client";

import { useState, useEffect, Suspense, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, Search, ChevronRight, Save, UserCircle, 
  Loader2, Database, Scale, Activity, Zap, Plus, Calendar, Clock, X
} from "lucide-react";
import { buscarPacientesAction, getPacienteById } from "@/lib/actions/pacientes";
import { guardarMedicionAction } from "@/lib/actions/mediciones";
import { agendarCita } from "@/lib/actions/appointments";
import { toast } from "sonner";
import { format } from "date-fns";

/**
 * 📅 SUB-COMPONENTE: PRÓXIMA CITA CON CANDADOS
 */
function ProximaCita({ patientId }: { patientId: string }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Restricciones: No permite días ni horas pasadas
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const currentTimeStr = format(new Date(), "HH:mm");

  const handleAgendar = async () => {
    if (!date || !time) return toast.error("Selecciona fecha y hora.");
    setLoading(true);
    const res = await agendarCita(patientId, date, time);
    if (res.success) {
      toast.success("Próxima cita programada con éxito.");
      setDate(""); setTime("");
    } else {
      toast.error(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4 border-t border-gray-50 pt-6">
      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 italic">
        <Calendar size={14} /> Próxima Cita
      </h3>
      <div className="space-y-2">
        <input 
          type="date" 
          min={todayStr} 
          className="nutri-input text-xs font-bold" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
        <input 
          type="time" 
          min={date === todayStr ? currentTimeStr : undefined} 
          className="nutri-input text-xs font-bold" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
        />
        <button 
          onClick={handleAgendar}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-nutri-main/10 text-nutri-main py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-nutri-main hover:text-white transition-all"
        >
          {loading ? <Loader2 className="animate-spin" size={14}/> : <Plus size={14} />} Agendar Cita
        </button>
      </div>
    </div>
  );
}

/**
 * 🏥 COMPONENTE PRINCIPAL: PRECONSULTA
 */
function NuevaConsultaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  
  // IDs y Selección
  const pacienteIdUrl = searchParams.get("pacienteId");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(!!pacienteIdUrl);
  
  // 📊 Estados Prioritarios (IMC)
  const [peso, setPeso] = useState<number>(0);
  const [talla, setTalla] = useState<number>(170);
  const [imc, setImc] = useState<number>(0);

  // 🧪 Estados Opcionales (Bioimpedancia)
  const [grasa, setGrasa] = useState<number | "">("");
  const [musculo, setMusculo] = useState<number | "">("");

  // 1. Auto-selección por URL
  useEffect(() => {
    if (pacienteIdUrl) {
      getPacienteById(pacienteIdUrl).then(res => {
        if (res.success) setSelectedPatient(res.paciente);
        setIsLoadingInitial(false);
      });
    }
  }, [pacienteIdUrl]);

  // 2. Cálculo de IMC
  useEffect(() => {
    if (peso > 0 && talla > 0) {
      setImc(parseFloat((peso / ((talla / 100) ** 2)).toFixed(2)));
    }
  }, [peso, talla]);

  // 3. Buscador con Debounce
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

  const handleFinalizar = async () => {
    if (peso <= 0) return toast.error("El peso es obligatorio para el expediente.");
    
    setLoading(true);
    const res = await guardarMedicionAction(selectedPatient.id, { 
      peso, talla, imc,
      grasaEquipo: grasa || null,
      musculo: musculo || null 
    }, new Date().toISOString());

    if (res.success) {
      toast.success("Preconsulta guardada correctamente.");
      startTransition(() => {
        router.push(`/dashboard/pacientes/${selectedPatient.id}`);
      });
    } else {
      toast.error(res.error);
    }
    setLoading(false);
  };

  if (isLoadingInitial) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-nutri-main" size={48} /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 p-4 animate-in fade-in duration-500">
      
      {/* 🔝 CABECERA DINÁMICA */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-3 rounded-2xl border bg-white shadow-sm hover:text-nutri-main transition-all"><ArrowLeft /></button>
          <div>
            <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest">Módulo de Atención</p>
            <h1 className="text-3xl font-black italic uppercase text-gray-800 tracking-tighter">
              {selectedPatient ? "Preconsulta" : "Nueva Consulta"}
            </h1>
          </div>
        </div>
        {selectedPatient && (
          <button onClick={handleFinalizar} disabled={loading || isPending} className="bg-gray-900 text-white px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-3">
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Database size={18} />} Finalizar y Abrir Catálogo
          </button>
        )}
      </div>

      {!selectedPatient ? (
        /* 🔎 BUSCADOR DE PACIENTES */
        <div className="glass-card p-12 max-w-2xl mx-auto text-center space-y-8 bg-white rounded-[40px] shadow-sm border">
          <h2 className="text-2xl font-black uppercase italic text-gray-800">Seleccionar Paciente</h2>
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            <input 
              type="text" 
              placeholder="Escribe el nombre del paciente..." 
              className="nutri-input pl-14" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            {isSearching && <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 text-nutri-main animate-spin" size={20} />}
          </div>

          <div className="space-y-3 mt-6">
            {searchResults.map((p) => (
              <button key={p.id} onClick={() => setSelectedPatient(p)} className="w-full flex items-center justify-between p-5 bg-gray-50/50 border border-gray-100 rounded-3xl hover:border-nutri-main hover:bg-nutri-light transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:bg-nutri-main group-hover:text-white transition-all"><UserCircle /></div>
                  <div className="text-left">
                    <p className="font-black text-gray-800 uppercase text-xs">{p.nombre} {p.apellido}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Ver expediente</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-nutri-main" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* 👤 PERFIL LATERAL */}
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-nutri-light flex items-center justify-center text-nutri-main mb-4"><UserCircle size={48} /></div>
              <div className="text-center mb-6">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic mb-1">Paciente en Turno</p>
                <div className="text-xl font-black text-gray-800 uppercase tracking-tighter">
                  {selectedPatient.nombre} <br /> {selectedPatient.apellido}
                </div>
              </div>
              <ProximaCita patientId={selectedPatient.id} />
              <button 
                onClick={() => { setSelectedPatient(null); setSearchQuery(""); }} 
                className="mt-8 text-[9px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-2"
              >
                <X size={12}/> Cambiar Paciente
              </button>
            </div>
          </aside>

          {/* 📝 ÁREA DE CAPTURA */}
          <main className="flex-1 space-y-6 w-full">
            {/* 🟢 SECCIÓN: ANTROPOMETRÍA (Prioridad) */}
            <section className="bg-white p-10 rounded-[40px] border-2 border-nutri-main/10 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-nutri-main italic flex items-center gap-2"><Scale size={16} /> Datos de Ingreso</h3>
                <div className="bg-nutri-light text-nutri-main px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter">Paso 1: IMC</div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 italic">Peso Actual (kg)</label>
                  <input type="number" className="nutri-input text-4xl font-black" value={peso} onChange={(e) => setPeso(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 italic">Estatura (cm)</label>
                  <input type="number" className="nutri-input text-4xl font-black" value={talla} onChange={(e) => setTalla(parseFloat(e.target.value) || 0)} />
                </div>
              </div>
              <div className="p-8 bg-nutri-main/5 border border-nutri-main/10 rounded-[35px] text-center">
                <p className="text-[10px] font-black text-nutri-main uppercase mb-2">Resultado IMC</p>
                <p className="text-6xl font-black text-nutri-main italic tracking-tighter">{imc}</p>
              </div>
            </section>

            {/* ⚪ SECCIÓN: COMPOSICIÓN (Opcional) */}
            <section className="bg-gray-50/50 p-10 rounded-[40px] border border-dashed border-gray-200 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 italic flex items-center gap-2"><Zap size={16} /> Bioimpedancia Opcional</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2"> % Grasa Corporal</label>
                  <div className="relative">
                    <input type="number" step="0.1" className="nutri-input bg-white text-2xl font-black" placeholder="0.0" value={grasa} onChange={(e) => setGrasa(e.target.value === "" ? "" : parseFloat(e.target.value))} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-300">%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2"> % Músculo</label>
                  <div className="relative">
                    <input type="number" step="0.1" className="nutri-input bg-white text-2xl font-black" placeholder="0.0" value={musculo} onChange={(e) => setMusculo(e.target.value === "" ? "" : parseFloat(e.target.value))} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-300">%</span>
                  </div>
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