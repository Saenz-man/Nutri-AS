"use client";
import { Activity, Info } from "lucide-react";

const FORMULAS = {
  mifflin: { label: "Mifflin-St Jeor", desc: "Elección en pacientes con sobrepeso u obesidad." },
  valencia: { label: "Valencia", desc: "Ecuación de elección en sujetos adultos mexicanos." },
  harris: { label: "Harris-Benedict", desc: "Adultos con peso normal." },
  schofield: { label: "Schofield", desc: "La más eficaz en población pediátrica." },
  oms: { label: "FAO/OMS", desc: "Sujetos de 0-18 años o individuos de > 60." }
};

export default function PublicConfig({ formula, setFormula, gett, imc, edad }: any) {
  const esAdulto = edad >= 18;
  const esPediatrico = edad < 18;
  const esAdultoMayor = edad >= 60;
  const tieneSobrepeso = imc >= 25;

  return (
    <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
      <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
        <Activity size={14} className="text-nutri-main" /> Configuración de Fórmula
      </div>

      <div className="space-y-4">
        <select 
          value={formula} onChange={e => setFormula(e.target.value)}
          className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-black uppercase outline-none"
        >
          <option value="mifflin" disabled={!esAdulto || !tieneSobrepeso}>Mifflin-St Jeor</option>
          <option value="valencia" disabled={!esAdulto}>Valencia</option>
          <option value="harris" disabled={!esAdulto || tieneSobrepeso}>Harris-Benedict</option>
          <option value="schofield" disabled={!esPediatrico}>Schofield</option>
          <option value="oms" disabled={!esPediatrico && !esAdultoMayor}>FAO/OMS</option>
        </select>

        <div className="p-4 bg-blue-50 rounded-2xl flex gap-3">
          <Info size={18} className="text-blue-500 shrink-0" />
          <p className="text-[10px] font-bold text-blue-800 italic leading-snug">
            {FORMULAS[formula as keyof typeof FORMULAS].desc}
          </p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-[35px] p-8 text-center shadow-xl">
        <p className="text-[10px] font-black text-nutri-main uppercase tracking-[0.2em] mb-2">Meta Calórica GET</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-5xl font-black text-white italic tracking-tighter">
            {gett > 0 ? gett.toFixed(0) : "---"}
          </span>
          <span className="text-[10px] font-black text-nutri-main mt-4 uppercase italic font-black">Kcal</span>
        </div>
      </div>
    </section>
  );
}