// Mapeo exacto de tus archivos: "KCAL": NumeroDeSemanas
export const ESTRUCTURA_DIETAS: Record<string, number> = {
  "1200": 8,
  "1300": 9,
  "1400": 7,
  "1500": 12,
  "1600": 9,
  "1700": 5,
  "1800": 4,
};

export const NIVELES_KCAL = Object.keys(ESTRUCTURA_DIETAS);

// Generador dinámico de semanas según las calorías seleccionadas
export const getSemanasDisponibles = (kcal: string) => {
  const totalSemanas = ESTRUCTURA_DIETAS[kcal] || 0;
  
  return Array.from({ length: totalSemanas }, (_, i) => ({
    label: `Semana ${i + 1}`,
    id: `S${i + 1}` // Genera S1, S2... S10, S11, etc.
  }));
};

export const getDietaPDF = (kcal: string, semanaId: string) => {
  return `/dietas/${kcal}_${semanaId}.pdf`;
};