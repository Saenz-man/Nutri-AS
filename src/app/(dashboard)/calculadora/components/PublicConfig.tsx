"use client";
import { Activity, Info, RotateCcw, Zap } from "lucide-react";

const FORMULAS = {
  mifflin: { label: "Mifflin-St Jeor", desc: "Elección en pacientes con sobrepeso u obesidad." },
  valencia: { label: "Valencia", desc: "Ecuación de elección en sujetos adultos mexicanos." },
  harris: { label: "Harris-Benedict", desc: "Adultos con peso normal." },
  schofield: { label: "Schofield", desc: "La más eficaz en población pediátrica." },
  oms: { label: "FAO/OMS", desc: "Sujetos de 0-18 años o individuos de > 60." }
};

export default function PublicConfig({ 
  formula, 
  setFormula, 
  gett, 
  setGett, 
  calculatedGett, // 💡 Propiedad sugerida para comparar el valor real vs calculado
  imc, 
  edad 
}: any) {
  const esAdulto = edad >= 18;
  const tieneSobrepeso = imc >= 25;
  const esPediatrico = edad < 18;
  const esAdultoMayor = edad >= 60;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => e.target.select();

  // Detectamos si el usuario ha hecho un ajuste manual
  const esManual = Math.round(gett) !== Math.round(calculatedGett);

  return (
    <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
      
      {/* Estilos para ocultar flechas de input number (Evita el descuadre) */}
      <style jsx>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
        <Activity size={14} className="text-nutri-main" /> Configuración de Fórmula
      </div>

      <div className="space-y-4">
        <select 
          value={formula} 
          onChange={e => setFormula(e.target.value)}
          className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-black uppercase outline-none cursor-pointer"
        >
          <option value="mifflin" disabled={!esAdulto || !tieneSobrepeso}>Mifflin-St Jeor</option>
          <option value="valencia" disabled={!esAdulto}>Valencia</option>
          <option value="harris" disabled={!esAdulto || tieneSobrepeso}>Harris-Benedict</option>
          <option value="schofield" disabled={!esPediatrico}>Schofield</option>
          <option value="oms" disabled={!esPediatrico && !esAdultoMayor}>FAO/OMS</option>
        </select>

        <div className="p-4 bg-blue-50 rounded-2xl flex gap-3 border border-blue-100/50">
          <Info size={18} className="text-blue-500 shrink-0" />
          <p className="text-[10px] font-bold text-blue-800 italic leading-snug">
            {FORMULAS[formula as keyof typeof FORMULAS].desc}
          </p>
        </div>
      </div>

      {/* ⚡️ META CALÓRICA INTERACTIVA */}
      <div className="bg-gray-900 rounded-[35px] p-8 text-center shadow-xl relative overflow-hidden group">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-black text-nutri-main uppercase tracking-[0.2em]">Meta Calórica GET</p>
            
            {/* Botón para restablecer si hay ajuste manual */}
            {esManual && (
              <button 
                onClick={() => setGett(calculatedGett)}
                className="flex items-center gap-1.5 bg-nutri-main/20 px-2 py-1 rounded-lg text-nutri-main hover:bg-nutri-main/30 transition-all border border-nutri-main/20"
                title="Regresar a valor de fórmula"
              >
                <RotateCcw size={10} />
                <span className="text-[8px] font-black uppercase italic">Ajustado</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 mt-2">
            <input 
              type="number"
              value={gett > 0 ? Math.round(gett) : ""}
              onFocus={handleFocus}
              onChange={(e) => setGett(e.target.value === "" ? 0 : Number(e.target.value))}
              placeholder="0"
              className="bg-transparent text-6xl font-black text-white italic tracking-tighter text-center w-44 outline-none focus:text-nutri-main transition-colors border-none ring-0 p-0"
            />
            <div className="flex flex-col items-start leading-none pt-4">
               <span className="text-[10px] font-black text-nutri-main uppercase italic">Kcal</span>
               <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-1">/ día</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}