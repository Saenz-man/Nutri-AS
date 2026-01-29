// src/app/(dashboard)/Pacientes/[id]/calculo/constants/smae.ts

export type SmaeInfo = { kcal: number; pro: number; lip: number; hco: number };

// ✅ Usamos Record<string, SmaeInfo> para permitir indexación por texto
export const GRUPOS_SMAE: Record<string, SmaeInfo> = {
  verduras: { kcal: 25, pro: 2, lip: 0, hco: 4 },
  frutas: { kcal: 60, pro: 0, lip: 0, hco: 15 },
  cerealesSG: { kcal: 70, pro: 2, lip: 0, hco: 15 },
  cerealesCG: { kcal: 115, pro: 2, lip: 5, hco: 15 },
  leguminosas: { kcal: 120, pro: 8, lip: 1, hco: 20 },
  aoaMBAG: { kcal: 40, pro: 7, lip: 1, hco: 0 },
  aoaBAG: { kcal: 55, pro: 7, lip: 3, hco: 0 },
  aoaAAG: { kcal: 100, pro: 7, lip: 8, hco: 0 },
  lecheDescremada: { kcal: 95, pro: 9, lip: 2, hco: 12 },
  lecheEntera: { kcal: 150, pro: 9, lip: 8, hco: 12 },
  aceitesSP: { kcal: 45, pro: 0, lip: 5, hco: 0 },
  aceitesCP: { kcal: 70, pro: 3, lip: 5, hco: 3 },
  azucaresSG: { kcal: 40, pro: 0, lip: 0, hco: 10 },
};