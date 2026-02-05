"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, FileText, Clock, BarChart3, Calculator, 
  TestTube2, History, UserCircle, Loader2, ChevronRight, 
  Pencil, X, Save, Trash2, AlertTriangle, Scale, Activity, Zap,
  Droplets, AlertCircle, Bone, Calendar, Ruler, VenusAndMars
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { 
  getPacienteById, 
  actualizarPaciente, 
  cambiarStatusPaciente, 
  eliminarPaciente,
  getHistorialCompleto 
} from "@/lib/actions/pacientes";
import { toast } from "sonner";

// 🎂 Función Auxiliar: Calcular Edad
const calcularEdad = (fecha: string | Date) => {
  if (!fecha) return 0;
  const hoy = new Date();
  const cumple = new Date(fecha);
  let edad = hoy.getFullYear() - cumple.getFullYear();
  const m = hoy.getMonth() - cumple.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) edad--;
  return edad;
};

export default function ExpedientePacientePage() {
  const router = useRouter();
  const { id } = useParams();
  const [paciente, setPaciente] = useState<any>(null);
  const [ultimaMedicion, setUltimaMedicion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Estados para Edición y Modales
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  
  // 📝 EditData expandido para incluir sexo, talla y fecha de nacimiento
  const [editData, setEditData] = useState({ 
    nombre: "", 
    apellido: "", 
    foto: "", 
    sexo: "", 
    talla: "", 
    fechaNacimiento: "" 
  });

  useEffect(() => {
    const cargarDatos = async () => {
      const res = await getPacienteById(id as string);
      const hist = await getHistorialCompleto(id as string);

      if (res.success && res.paciente) {
        setPaciente(res.paciente);
        
        const citas = hist.historial?.appointments || [];
        const citaConMedicion = citas.find((c: any) => c.medicion);
        if (citaConMedicion) setUltimaMedicion(citaConMedicion.medicion);

        setEditData({ 
          nombre: res.paciente.nombre, 
          apellido: res.paciente.apellido, 
          foto: res.paciente.foto || "",
          sexo: res.paciente.sexo || "",
          talla: res.paciente.talla?.toString() || "",          fechaNacimiento: res.paciente.fechaNacimiento ? new Date(res.paciente.fechaNacimiento).toISOString().split('T')[0] : ""
        });
      } else {
        toast.error("No se pudo encontrar el expediente.");
        router.push("/dashboard/pacientes");
      }
      setLoading(false);
    };
    cargarDatos();
  }, [id, router]);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await actualizarPaciente(id as string, editData);
    if (res.success) {
      setPaciente(res.paciente);
      setIsEditModalOpen(false);
      toast.success("Información actualizada correctamente");
    } else {
      toast.error(res.error || "Error al guardar");
    }
    setIsSaving(false);
  };

  const handleToggleStatus = async () => {
    setIsStatusLoading(true);
    const res = await cambiarStatusPaciente(id as string, paciente.status);
    if (res.success) {
      setPaciente({ ...paciente, status: res.status });
      toast.success(`Estatus actualizado`);
    }
    setIsStatusLoading(false);
  };

  const handleDelete = async () => {
    setIsSaving(true);
    const res = await eliminarPaciente(id as string);
    if (res.success) {
      toast.success("Paciente eliminado definitivamente");
      router.push("/dashboard/pacientes");
    } else {
      toast.error(res.error);
      setIsSaving(false);
    }
  };

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-nutri-main" size={48} /></div>;

  const edadActual = calcularEdad(paciente.fechaNacimiento);

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-10">
      
      {/* 🔝 CABECERA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-4xl border border-gray-100 shadow-sm relative">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push("/dashboard/pacientes")} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-400 hover:text-nutri-main transition-all group">
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-3xl overflow-hidden bg-gray-100 border-4 border-white shadow-md">
              {paciente.foto ? <Image src={paciente.foto} alt={paciente.nombre} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><UserCircle size={40} /></div>}
            </div>
            <div>
              <p className="text-[10px] font-black text-nutri-main uppercase tracking-widest mb-1">Folio: {paciente.expediente}</p>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900 font-display">{paciente.nombre} {paciente.apellido}</h1>
                <div className="flex gap-2">
                  <button onClick={() => setIsEditModalOpen(true)} className="p-2 rounded-full hover:bg-gray-100 text-gray-300 hover:text-nutri-main transition-all"><Pencil size={18} /></button>
                  <button onClick={() => setIsDeleteModalOpen(true)} className="p-2 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-400 capitalize">{paciente.sexo || "Sexo no definido"} | {edadActual > 0 ? `${edadActual} Años` : "Sin edad registrada"}</p>
            </div>
          </div>
        </div>

        <button onClick={handleToggleStatus} disabled={isStatusLoading} className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${paciente.status === 'ACTIVO' ? 'bg-green-50 border-green-100 text-green-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
          <div className={`w-3 h-3 rounded-full ${paciente.status === 'ACTIVO' ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span className="font-bold text-sm uppercase tracking-tighter">{paciente.status}</span>
        </button>
      </div>

      {/* 📊 INDICADORES CLÍNICOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Evolución de Peso', val: ultimaMedicion?.peso ? `${ultimaMedicion.peso} kg` : "-- kg", desc: 'Peso Actual', icon: Scale, color: 'text-green-500' },
          { label: 'Índice de Masa Corporal', val: ultimaMedicion?.imc || "0.0", desc: paciente?.talla ? `Talla: ${paciente.talla}cm` : "Sin talla", icon: Activity, color: 'text-blue-500' },
          { label: '% Grasa', val: ultimaMedicion?.grasaEquipo ? `${ultimaMedicion.grasaEquipo}%` : "-- %", desc: 'Grasa Corporal', icon: Zap, color: 'text-orange-500' },
          { label: '% Músculo', val: ultimaMedicion?.musculo ? `${ultimaMedicion.musculo}%` : "-- %", desc: 'Tejido Magro', icon: BarChart3, color: 'text-purple-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[35px] border border-gray-50 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic leading-tight">{s.label}</p>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <div className="text-3xl font-black text-gray-800 italic tracking-tighter">{s.val}</div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🗂️ BLOQUES DE MÓDULOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 'historia', label: 'Historia Clínica', icon: FileText, color: 'text-blue-500 bg-blue-50' },
          { id: 'r24', label: 'R24 & SMAE', icon: Clock, color: 'text-orange-500 bg-orange-50' },
          { id: 'mediciones', label: 'Mediciones', icon: BarChart3, color: 'text-green-500 bg-green-50' },
          { id: 'calculo', label: 'Cálculo Dietético', icon: Calculator, color: 'text-purple-500 bg-purple-50' },
          { id: 'laboratorios', label: 'Estudios Lab.', icon: TestTube2, color: 'text-red-500 bg-red-50' },
          { id: 'consultas', label: 'Historial Consultas', icon: History, color: 'text-gray-500 bg-gray-50' },
        ].map((item) => (
          <button key={item.id} onClick={() => router.push(`/dashboard/pacientes/${id}/${item.id}`)} className="group bg-white p-8 rounded-4xl border border-gray-100 hover:border-nutri-main/20 hover:shadow-2xl transition-all flex flex-col items-center text-center gap-4 relative overflow-hidden">
            <div className={`p-5 rounded-3xl ${item.color} group-hover:scale-110 transition-transform duration-500`}><item.icon size={32} /></div>
            <h3 className="font-bold text-gray-800 text-lg">{item.label}</h3>
            <p className="text-xs text-gray-400 font-medium px-4 italic">Acceder al módulo clínico</p>
          </button>
        ))}
      </div>

     {/* 🛠️ MODAL DE EDICIÓN PROFESIONAL */}
{isEditModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
    <div className="bg-white rounded-[45px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-100">
      
      {/* HEADER DEL MODAL */}
      <div className="bg-gray-50/50 px-10 py-8 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-nutri-main/10 rounded-2xl text-nutri-main">
            <Pencil size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-nutri-main uppercase tracking-[0.2em]">Ajustes del Sistema</p>
            <h2 className="text-2xl font-black text-gray-800 uppercase italic tracking-tighter">Editar Expediente</h2>
          </div>
        </div>
        <button 
          onClick={() => setIsEditModalOpen(false)} 
          className="p-3 hover:bg-red-50 rounded-2xl text-gray-400 hover:text-red-500 transition-all"
        >
          <X size={24} />
        </button>
      </div>

      <div className="p-10 space-y-8">
        {/* GRUPO 1: IDENTIDAD PERSONAL */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
            <UserCircle size={14} /> Información Personal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-4 italic">Nombre(s)</label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input value={editData.nombre} onChange={e => setEditData({...editData, nombre: e.target.value})} className="nutri-input-premium pl-12" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-4 italic">Apellidos</label>
              <input value={editData.apellido} onChange={e => setEditData({...editData, apellido: e.target.value})} className="nutri-input-premium" />
            </div>
          </div>
        </div>

        {/* GRUPO 2: DATOS CLÍNICOS BASE */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} /> Parámetros Biométricos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-4 italic">Fecha de Nacimiento</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input type="date" value={editData.fechaNacimiento} onChange={e => setEditData({...editData, fechaNacimiento: e.target.value})} className="nutri-input-premium pl-12" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-4 italic">Sexo Biológico</label>
              <div className="relative">
                <VenusAndMars className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <select value={editData.sexo} onChange={e => setEditData({...editData, sexo: e.target.value})} className="nutri-input-premium pl-12 bg-white appearance-none">
                  <option value="">Seleccionar...</option>
                  <option value="MUJER">Mujer</option>
                  <option value="HOMBRE">Hombre</option>
                </select>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-4 italic">Talla Base (cm)</label>
              <div className="relative">
                <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input type="number" value={editData.talla} onChange={e => setEditData({...editData, talla: e.target.value})} className="nutri-input-premium pl-12" placeholder="170" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTÓN DE ACCIÓN */}
        <button 
          onClick={handleSave} 
          disabled={isSaving} 
          className="w-full bg-gray-900 text-white p-6 rounded-[30px] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-black hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {isSaving ? "Sincronizando..." : "Actualizar Expediente"}
        </button>
      </div>
    </div>
  </div>
)}

      {/* ⚠️ MODAL DE ELIMINACIÓN */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[40px] max-w-md w-full p-10 shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto text-red-500 shadow-inner"><AlertTriangle size={40} /></div>
            <div>
              <h3 className="text-xl font-black text-gray-800 uppercase italic">¿Eliminar Paciente?</h3>
              <p className="text-xs text-gray-400 font-bold mt-2">Esta acción es irreversible. Se perderán todas las mediciones y planes alimenticios de {paciente.nombre}.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setIsDeleteModalOpen(false)} className="p-5 bg-gray-100 rounded-3xl font-black text-[10px] uppercase tracking-widest text-gray-500">Cancelar</button>
              <button onClick={handleDelete} disabled={isSaving} className="p-5 bg-red-500 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-200">
                {isSaving ? <Loader2 className="animate-spin mx-auto" size={16} /> : "Sí, Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}