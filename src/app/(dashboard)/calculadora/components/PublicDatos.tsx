"use client";

import { 
  UserCircle, 
  Ruler, 
  Scale, 
  Zap, 
  Calendar, 
  VenusAndMars, 
  ChevronDown 
} from "lucide-react";

interface Props {
  edad: number; 
  setEdad: (v: number) => void;
  genero: string; 
  setGenero: (v: any) => void;
  peso: number; 
  setPeso: (v: number) => void;
  talla: number; 
  setTalla: (v: number) => void;
  actividad: number; 
  setActividad: (v: number) => void;
  imc: number;
}

const CATEGORIAS_ACTIVIDAD = [
  { label: "Sedentario", range: "1.0 - 1.39", value: 1.2 },
  { label: "Poco Activo", range: "1.4 - 1.59", value: 1.5 },
  { label: "Activo", range: "1.6 - 1.89", value: 1.75 },
  { label: "Muy Activo", range: "1.9 - 2.5", value: 2.2 },
];

export default function PublicDatos({ 
  edad, setEdad, genero, setGenero, peso, setPeso, talla, setTalla, actividad, setActividad, imc 
}: Props) {
  
  // ✅ Mejora: Selecciona todo el texto al hacer clic (Adiós al problema del "0")
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  // Determina el color del badge de IMC dinámicamente
  const getImcStyles = (val: number) => {
    if (val <= 0) return "bg-gray-50 text-gray-400 border-gray-100";
    if (val < 18.5) return "bg-blue-50 text-blue-500 border-blue-100";
    if (val < 25) return "bg-green-50 text-green-500 border-green-100";
    if (val < 30) return "bg-orange-50 text-orange-500 border-orange-100";
    return "bg-red-50 text-red-500 border-red-100";
  };

  return (
    <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
      
      {/* 🟢 ENCABEZADO: DATOS BIOMÉTRICOS */}
      <div className="flex items-start justify-between border-b border-gray-50 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-nutri-main/10 rounded-2xl text-nutri-main shadow-sm">
            <UserCircle size={26} />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 italic uppercase tracking-tighter">
              Datos Biométricos
            </h2>
            <div className="flex gap-2 mt-2">
               {/* Campo Edad */}
               <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 hover:border-gray-200 transition-all">
                  <Calendar size={12} className="text-gray-400"/>
                  <input 
                    type="number" 
                    value={edad} 
                    onFocus={handleFocus}
                    onChange={e => setEdad(Number(e.target.value))} 
                    className="w-10 bg-transparent text-[10px] font-black outline-none text-gray-700" 
                  />
               </div>
               {/* Selector Género */}
               <div className="relative">
                 <select 
                    value={genero} 
                    onChange={e => setGenero(e.target.value)} 
                    className="bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 text-[10px] font-black uppercase outline-none appearance-none pr-8 text-gray-700 cursor-pointer"
                 >
                    <option value="H">Hombre</option>
                    <option value="M">Mujer</option>
                 </select>
                 <ChevronDown size={10} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
               </div>
            </div>
          </div>
        </div>

        {/* Badge IMC */}
        <div className={`px-5 py-2.5 rounded-[20px] border-2 flex flex-col items-center shadow-sm transition-all duration-500 ${getImcStyles(imc)}`}>
          <span className="text-[9px] font-black uppercase tracking-widest leading-none mb-1">IMC</span>
          <span className="text-xl font-black italic leading-none">{imc > 0 ? imc : "--"}</span>
        </div>
      </div>

      {/* 🟡 GRID: PESO Y TALLA */}
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase italic flex items-center gap-2 ml-2 tracking-widest">
            <Scale size={14} className="text-nutri-main" /> Peso (kg)
          </label>
          <input 
            type="number" 
            step="0.1" 
            value={peso === 0 ? "" : peso} // ✅ UX: Vacío si es cero para mostrar el placeholder
            placeholder="0.0"
            onFocus={handleFocus}
            onChange={e => setPeso(e.target.value === "" ? 0 : Number(e.target.value))} 
            className="w-full bg-gray-50 border-2 border-transparent rounded-3xl p-5 text-lg font-black text-gray-800 outline-none focus:bg-white focus:border-nutri-main/20 focus:ring-4 focus:ring-nutri-main/5 transition-all" 
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase italic flex items-center gap-2 ml-2 tracking-widest">
            <Ruler size={14} className="text-nutri-teal" /> Talla (cm)
          </label>
          <input 
            type="number" 
            value={talla === 0 ? "" : talla} // ✅ UX: Campo limpio si es cero
            placeholder="0"
            onFocus={handleFocus}
            onChange={e => setTalla(e.target.value === "" ? 0 : Number(e.target.value))} 
            className="w-full bg-gray-50 border-2 border-transparent rounded-3xl p-5 text-lg font-black text-gray-800 outline-none focus:bg-white focus:border-nutri-teal/20 focus:ring-4 focus:ring-nutri-teal/5 transition-all" 
          />
        </div>
      </div>

      {/* 🔵 BLOQUE: ACTIVIDAD FÍSICA (Diseño Dark) */}
      <div className="space-y-4 bg-gray-900 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-nutri-main/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-nutri-main/20 transition-all duration-700" />
        
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-nutri-main/20 rounded-xl">
               <Zap size={18} className="text-nutri-main animate-pulse" />
            </div>
            <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.25em]">Actividad Física</p>
          </div>
          <div className="relative">
            <input 
              type="number" 
              step="0.01" 
              value={actividad} 
              onFocus={handleFocus}
              onChange={e => setActividad(Number(e.target.value))} 
              className="w-20 bg-white/10 border border-white/10 rounded-xl py-2 text-center text-sm font-black text-nutri-main outline-none focus:bg-white/20 transition-all" 
            />
          </div>
        </div>

        <div className="relative z-10">
          <select 
            value={CATEGORIAS_ACTIVIDAD.find(c => actividad >= parseFloat(c.range.split(' ')[0]))?.value || actividad}
            onChange={e => setActividad(Number(e.target.value))}
            className="w-full bg-white/5 border-2 border-white/5 hover:border-white/10 focus:border-nutri-main/40 rounded-2xl px-6 py-5 text-xs font-black text-white uppercase appearance-none cursor-pointer transition-all"
          >
            {CATEGORIAS_ACTIVIDAD.map(cat => (
              <option key={cat.label} value={cat.value} className="text-gray-800">
                {cat.label} — {cat.range}
              </option>
            ))}
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">
            <ChevronDown size={18} />
          </div>
        </div>
      </div>
    </section>
  );
}