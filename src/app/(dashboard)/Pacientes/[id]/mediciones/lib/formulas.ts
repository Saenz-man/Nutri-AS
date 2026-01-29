// src/app/(dashboard)/Pacientes/[id]/mediciones/lib/formulas.ts

// Índice de Masa Corporal (IMC)
export const calcularIMC = (peso: number, tallaCm: number): number => {
  if (!peso || !tallaCm) return 0;
  const tallaM = tallaCm / 100;
  return parseFloat((peso / (tallaM * tallaM)).toFixed(2));
};

// Clasificación OMS del IMC
export const obtenerClasificacionIMC = (imc: number): string => {
  if (imc === 0) return "Pendiente";
  if (imc < 18.5) return "Bajo Peso";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidad";
};

// Índice Cintura-Cadera (ICC)
export const calcularICC = (cintura: number, cadera: number): number => {
  if (!cintura || !cadera) return 0;
  return parseFloat((cintura / cadera).toFixed(2));
};