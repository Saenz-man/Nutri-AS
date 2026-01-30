// 📐 Fórmulas de Base
export const calcularIMC = (peso: number, tallaCm: number): number => {
  if (!peso || !tallaCm) return 0;
  const tallaM = tallaCm / 100;
  return parseFloat((peso / (tallaM * tallaM)).toFixed(2));
};

// ✅ Esta es la función que te faltaba exportar
export const obtenerClasificacionIMC = (imc: number): string => {
  if (imc <= 0) return "Pendiente";
  if (imc < 18.5) return "Bajo Peso";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidad";
};

export const calcularICC = (cintura: number, cadera: number): number => {
  if (!cintura || !cadera) return 0;
  return parseFloat((cintura / cadera).toFixed(2));
};

// 🧬 Fórmulas Científicas (Siri)
export const calcularGrasaSiri = (triceps: number, biceps: number, subescapular: number, cresta: number): number => {
  const suma4 = triceps + biceps + subescapular + cresta;
  if (suma4 <= 0) return 0;
  const densidad = 1.1599 - (0.0717 * Math.log10(suma4));
  return parseFloat((((4.95 / densidad) - 4.50) * 100).toFixed(2));
};

// 🦴 Masa Ósea (Von Dobeln)
export const calcularMasaOseaDobeln = (tallaCm: number, estiloideoCm: number, femurCm: number): number => {
  if (!tallaCm || !estiloideoCm || !femurCm) return 0;
  const resultado = 3.02 * Math.pow(((tallaCm / 100) * (estiloideoCm / 100) * (femurCm / 100) * 400), 0.712);
  return parseFloat(resultado.toFixed(2));
};

/**
 * 🎂 CALCULAR EDAD
 */
export const calcularEdad = (fechaNacimiento: string | Date): number => {
  if (!fechaNacimiento) return 0;
  
  const hoy = new Date();
  // ✅ Convertimos a Date solo si es string, si ya es Date se queda igual
  const cumple = new Date(fechaNacimiento); 
  
  let edad = hoy.getFullYear() - cumple.getFullYear();
  const m = hoy.getMonth() - cumple.getMonth();
  
  if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
    edad--;
  }
  return edad;
};

/**
 * 🥩 CALCULAR MASA MUSCULAR (TEJIDO MAGRO)
 * Basado en resta de componentes: Peso - (Grasa + Osea + Residual)
 */
export const calcularMasaMuscularSimplificada = (peso: number, grasaPorc: number, oseaKg: number): number => {
  if (!peso || !grasaPorc) return 0;
  const grasaKg = peso * (grasaPorc / 100);
  const residual = peso * 0.24; // Constante promedio para tejido residual
  const muscularKg = peso - (grasaKg + oseaKg + residual);
  return parseFloat(((muscularKg / peso) * 100).toFixed(2));
};