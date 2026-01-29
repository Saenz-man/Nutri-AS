"use client";

export default function PerfilBioquimico({ values, onChange, getStatusColor }: any) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 space-y-8">
      <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
        <span className="w-2 h-2 bg-purple-500 rounded-full" /> Perfil Bioquímico (Biomarcadores)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4 p-6 bg-gray-50 rounded-3xl">
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Metabolismo</p>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Glucosa (mg/dL)</label>
          <input name="glucosa" value={values.glucosa || ""} onChange={(e) => onChange(e.target.name, e.target.value)} className={`nutri-input ${getStatusColor('glucosa', values.glucosa)}`} />
        </div>

        <div className="space-y-4 p-6 bg-gray-50 rounded-3xl">
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Función Renal</p>
          <input name="urea" placeholder="Urea (mg/dL)" onChange={(e) => onChange(e.target.name, e.target.value)} className="nutri-input mb-2" />
          <input name="creatinina" placeholder="Creatinina (mg/dL)" onChange={(e) => onChange(e.target.name, e.target.value)} className="nutri-input" />
        </div>

        <div className="space-y-4 p-6 bg-gray-50 rounded-3xl">
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Función Hepática</p>
          <input name="tgo" placeholder="TGO (U/L)" onChange={(e) => onChange(e.target.name, e.target.value)} className="nutri-input mb-2" />
          <input name="tgp" placeholder="TGP (U/L)" onChange={(e) => onChange(e.target.name, e.target.value)} className="nutri-input" />
        </div>
      </div>
    </div>
  );
}