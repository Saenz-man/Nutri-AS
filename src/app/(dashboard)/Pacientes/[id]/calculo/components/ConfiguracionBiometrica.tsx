import { User, Wand2, Info } from "lucide-react";

const FORMULA_INFO: Record<string, string> = {
  mifflin: "Ecuación de elección en pacientes adultos con sobrepeso u obesidad.",
  valencia: "Ecuación de elección en sujetos adultos mexicanos.",
  harris: "Recomendada para adultos con peso normal.",
  schofield: "La más eficaz en población pediátrica.",
  oms: "Elección en sujetos de 0-18 años o mayores de 60 años."
};

export default function ConfiguracionBiometrica({ 
  paciente, peso, setPeso, talla, setTalla, formula, setFormula, actividad, setActividad, gett, handleAutomatic, imc, edad, genero 
}: any) {
  
  // 🛡️ REGLAS CLÍNICAS
  const esAdulto = edad >= 18;
  const esNino = edad > 0 && edad < 18;
  const esAdultoMayor = edad >= 60;
  const tieneSobrepeso = imc >= 25;

  return (
    <section className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-6">
      <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 italic">
        <User size={14} /> Datos Biométricos y GET
      </h2>

      {/* Badge del Paciente Corregido */}
      <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 flex justify-between items-center text-xs font-black">
        <p className="uppercase tracking-tighter">{paciente.nombre} {paciente.apellido}</p>
        <p className="text-nutri-main italic capitalize">
          {genero} | {edad > 0 ? `${edad} años` : "Edad pendiente"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black text-gray-400 uppercase ml-2 italic">Peso (kg)</label>
          <input type="number" value={peso} onChange={(e) => setPeso(Number(e.target.value))} className="nutri-input-calculadora text-lg font-black" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black text-gray-400 uppercase ml-2 italic">Talla (cm)</label>
          <input type="number" value={talla} onChange={(e) => setTalla(Number(e.target.value))} className="nutri-input-calculadora text-lg font-black" />
        </div>
      </div>

      {/* Selector de Fórmula */}
      <div className="space-y-2">
        <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Fórmula Seleccionada</label>
        <select 
          value={formula} 
          onChange={(e) => setFormula(e.target.value)} 
          className="w-full p-4 rounded-3xl border-2 border-gray-100 font-black text-[10px] uppercase outline-none focus:border-nutri-main bg-white cursor-pointer"
        >
          {/* LIZETH (IMC 41.5) debería tener Mifflin y Valencia habilitados */}
          <option value="mifflin" disabled={!esAdulto || !tieneSobrepeso}>Mifflin-St Jeor (Adulto Obeso)</option>
          <option value="valencia" disabled={!esAdulto}>Valencia (Adulto Mexicano)</option>
          <option value="harris" disabled={!esAdulto || tieneSobrepeso}>Harris-Benedict (Peso Normal)</option>
          <option value="schofield" disabled={!esNino}>Schofield (Pediátrico)</option>
          <option value="oms" disabled={!esNino && !esAdultoMayor}>FAO/OMS (0-18 o 60 años)</option>
        </select>
        
        {/* Leyenda de Recomendación */}
        <div className="flex gap-2 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl animate-in fade-in duration-300">
          <Info size={16} className="text-blue-500 shrink-0" />
          <p className="text-[10px] font-bold text-blue-800 italic leading-tight">
            {FORMULA_INFO[formula]}
          </p>
        </div>
      </div>

      {/* GET Result */}
      <div className="bg-nutri-main p-6 rounded-3xl text-center shadow-lg shadow-green-100 text-white">
        <p className="text-[10px] font-black opacity-70 uppercase tracking-widest mb-1">Gasto Energético Total</p>
        <p className="text-4xl font-black italic tracking-tighter">
          {gett > 0 ? gett.toFixed(0) : "---"} <span className="text-xs">KCAL</span>
        </p>
      </div>

      <button onClick={handleAutomatic} className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white p-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
        <Wand2 size={16} /> Aplicar Cálculo Automático
      </button>
    </section>
  );
}