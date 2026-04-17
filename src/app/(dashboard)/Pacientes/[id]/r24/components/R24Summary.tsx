export const R24Summary = ({ totals }: any) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 py-8">
      {Object.entries(totals).map(([meal, values]: any) => (
        <div key={meal} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:border-[#3d5a2b]/30 transition-all group">
          <div className="bg-[#3d5a2b]/5 group-hover:bg-[#3d5a2b] transition-colors text-[#3d5a2b] group-hover:text-white text-center py-2.5 text-[11px] font-black uppercase tracking-widest">
            {meal}
          </div>
          <div className="p-4 space-y-4">
            <SummaryItem label="Energía" value={values.kcal || 0} unit="kcal" color="text-[#3d5a2b]" isKcal />
            <div className="space-y-2 pt-1">
              <SummaryItem label="Prot" value={values.pro || 0} unit="g" />
              <SummaryItem label="Lip" value={values.lip || 0} unit="g" />
              <SummaryItem label="Hco" value={values.hco || 0} unit="g" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SummaryItem = ({ label, value, unit, color = "text-gray-700", isKcal = false }: any) => (
  <div className="flex flex-col border-b border-gray-50 pb-1">
    <span className="text-[8px] font-bold text-gray-400 uppercase">{label}</span>
    <div className="flex items-baseline justify-between">
      <span className={`font-black ${isKcal ? 'text-lg' : 'text-sm'} ${color}`}>{value.toFixed(isKcal ? 0 : 1)}</span>
      <span className="text-[9px] text-gray-300 font-bold uppercase">{unit}</span>
    </div>
  </div>
);