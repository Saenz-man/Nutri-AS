"use client";

export default function ExamenOrina({ values, onChange }: any) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 space-y-6">
      <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
        <span className="w-2 h-2 bg-yellow-500 rounded-full" /> Examen General de Orina (EGO)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Densidad</label>
          <input name="densidad" value={values.densidad || ""} onChange={(e) => onChange(e.target.name, e.target.value)} className="nutri-input mt-1" placeholder="1.0xx" />
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">pH</label>
          <input name="ph" value={values.ph || ""} onChange={(e) => onChange(e.target.name, e.target.value)} className="nutri-input mt-1" placeholder="5.0 - 8.0" />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Aspecto / Color</label>
          <input name="aspecto" value={values.aspecto || ""} onChange={(e) => onChange(e.target.name, e.target.value)} className="nutri-input mt-1" placeholder="Amarillo claro, Transparente..." />
        </div>
        <div className="col-span-full">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Notas del Sedimento (Bacterias, Cristales, Leucocitos)</label>
          <textarea 
            name="sedimento" 
            value={values.sedimento || ""} 
            onChange={(e) => onChange(e.target.name, e.target.value)} 
            className="nutri-input mt-1 h-24 py-4 resize-none" 
            placeholder="Describir presencia de elementos microscópicos..." 
          />
        </div>
      </div>
    </div>
  );
}