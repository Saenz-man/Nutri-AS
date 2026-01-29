// src/app/(dashboard)/Pacientes/[id]/mediciones/components/ComposicionCorporal.tsx
export default function ComposicionCorporal({ formData, handleChange, resultados, errors, validarCampo }: any) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 space-y-6">
      <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
        <span className="w-2 h-2 bg-nutri-main rounded-full" /> Composición Básica
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Peso (kg)</label>
          <input name="peso" type="number" value={formData.peso} onChange={handleChange} onBlur={(e) => validarCampo("peso", e.target.value)} className={`nutri-input mt-1 ${errors.peso ? 'border-red-500' : ''}`} placeholder="0.0" />
          {errors.peso && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.peso}</p>}
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Talla (cm)</label>
          <input name="talla" type="number" value={formData.talla} onChange={handleChange} onBlur={(e) => validarCampo("talla", e.target.value)} className={`nutri-input mt-1 ${errors.talla ? 'border-red-500' : ''}`} placeholder="0" />
        </div>
      </div>
      <div className="p-6 bg-nutri-light rounded-3xl flex justify-between items-center border border-nutri-main/10">
        <div>
          <p className="text-[10px] font-black text-nutri-main uppercase">IMC Calculado</p>
          <p className="text-3xl font-black text-gray-900">{resultados.imc}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-nutri-main uppercase">Clasificación</p>
          <p className="font-bold text-gray-700">{resultados.clasificacion}</p>
        </div>
      </div>
    </div>
  );
}