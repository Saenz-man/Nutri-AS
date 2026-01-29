"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LaboratorioHeader from "./components/LaboratorioHeader";
import { useLaboratorioLogic, RANGOS_LAB } from "./hooks/useLaboratorioLogic";
import { toast } from "sonner";
import { guardarLaboratorioAction } from "@/lib/actions/laboratorios";

export default function LaboratoriosPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

  // ✅ Ahora extraemos 'getStatus' correctamente
  const { values, setValues, getStatus, totalAlertas, indiceAterogenico } = useLaboratorioLogic();

  const hasChanges = Object.values(values).some(v => v !== "" && v !== null);

 const handleSave = async () => {
  setIsSaving(true);
  try {
    const res = await guardarLaboratorioAction(id as string, values, fecha);
    
    if (res.success) {
      toast.success("Estudios guardados y vinculados al expediente.");
      router.push(`/dashboard/Pacientes/${id}/historia`);
    } else {
      toast.error(res.error);
    }
  } catch (error) {
    toast.error("Fallo crítico en el servidor.");
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <LaboratorioHeader 
        id={id as string} onSave={handleSave} isSaving={isSaving} 
        fecha={fecha} setFecha={setFecha} hasChanges={hasChanges}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* BLOQUE BIOQUÍMICO */}
        <section className="bg-white rounded-4xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-6 bg-gray-50 border-b border-gray-100 uppercase text-[10px] font-black text-gray-400 tracking-widest">Perfil Bioquímico</div>
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-gray-50">
              {Object.entries(RANGOS_LAB).slice(0, 8).map(([key, config]) => (
                <FilaLab key={key} name={key} config={config} values={values} setValues={setValues} getStatus={getStatus} />
              ))}
            </tbody>
          </table>
        </section>

        <div className="space-y-8">
          {/* BLOQUE LIPÍDICO */}
          <section className="bg-white rounded-4xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Perfil Lipídico</h2>
              <div className="px-3 py-1 bg-gray-900 rounded-full text-[9px] font-black text-white uppercase">CT/HDL: {indiceAterogenico}</div>
            </div>
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-50">
                {Object.entries(RANGOS_LAB).slice(8, 12).map(([key, config]) => (
                  <FilaLab key={key} name={key} config={config} values={values} setValues={setValues} getStatus={getStatus} />
                ))}
              </tbody>
            </table>
          </section>

          {/* BLOQUE ORINA (CORREGIDO) */}
          <section className="bg-white rounded-4xl border border-gray-100 p-8 space-y-6 shadow-sm">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Examen de Orina (EGO)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ✅ Ahora pasamos getStatus aquí para evitar el TypeError */}
              <InputPH values={values} setValues={setValues} getStatus={getStatus} />
              {["Proteínas", "Glucosa", "Cetona", "Sangre"].map(item => (
                <SelectorEGO key={item} label={item} name={item.toLowerCase()} values={values} setValues={setValues} getStatus={getStatus} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// 🧱 COMPONENTES CON LÓGICA DE BORDE GRIS-300
function FilaLab({ name, config, values, setValues, getStatus }: any) {
  const status = getStatus(name, values[name] || "");
  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="p-4">
        <p className="font-bold text-gray-700 capitalize text-sm">{name.replace(/([A-Z])/g, ' $1')}</p>
        <p className="text-[9px] text-gray-400 font-medium">{config.min} - {config.max} {config.unit}</p>
      </td>
      <td className="p-4">
        <input 
          type="number" value={values[name] || ""}
          onChange={(e) => setValues((p: any) => ({ ...p, [name]: e.target.value }))}
          className={`w-20 px-2 py-2 rounded-xl font-black border-2 text-center text-sm transition-all outline-none ${
            status.color === 'red' ? 'border-red-500 bg-red-50 text-red-700' : 
            status.color === 'yellow' ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 
            status.color === 'green' ? 'border-green-500 bg-green-50 text-green-700' : 
            'border-gray-200 bg-white focus:border-gray-400' 
          }`}
          placeholder="--"
        />
      </td>
      <td className="p-4 text-center">
        <div className={`w-3 h-3 rounded-full mx-auto ${
          status.color === 'red' ? 'bg-red-500 animate-pulse' : 
          status.color === 'yellow' ? 'bg-yellow-500' : 
          status.color === 'green' ? 'bg-green-500' : 'bg-gray-100'
        }`} />
      </td>
    </tr>
  );
}

function InputPH({ values, setValues, getStatus }: any) {
  const status = getStatus("ph", values.ph || "");
  return (
    <div className="space-y-1">
      <label className="text-[9px] font-black text-gray-400 uppercase ml-2">PH (6.0 - 7.5)</label>
      <input 
        type="number" step="0.1" value={values.ph || ""}
        onChange={(e) => setValues((p: any) => ({ ...p, ph: e.target.value }))}
        className={`nutri-input text-sm border-2 font-black ${
          status.color === 'red' ? 'border-red-500 bg-red-50' : 
          status.color === 'yellow' ? 'border-yellow-500 bg-yellow-50' : 
          status.color === 'green' ? 'border-green-500 bg-green-50' : 
          'border-gray-200'
        }`} 
        placeholder="0.0"
      />
    </div>
  );
}

function SelectorEGO({ label, name, values, setValues, getStatus }: any) {
  const currentVal = values[name] || "";
  // Lógica simple para el borde del selector basado en Positivo/Negativo
  const borderColor = currentVal === "Positivo" ? "border-red-500 bg-red-50" : 
                    currentVal === "Negativo" ? "border-green-500 bg-green-50" : "border-gray-200";

  return (
    <div className="space-y-1">
      <label className="text-[9px] font-black text-gray-400 uppercase ml-2">{label}</label>
      <select 
        value={currentVal}
        onChange={(e) => setValues((p: any) => ({ ...p, [name]: e.target.value }))}
        className={`nutri-input text-sm border-2 font-black transition-all ${borderColor}`}
      >
        <option value="">Seleccionar</option>
        <option value="Negativo">Negativo</option>
        <option value="Positivo">Positivo</option>
      </select>
    </div>
  );
}