// src/app/(dashboard)/Pacientes/[id]/calculo/constants/smae.ts

export type SmaeInfo = { label: string; kcal: number; pro: number; lip: number; hco: number };

export const GRUPOS_SMAE: Record<string, SmaeInfo> = {
  verduras: { label: "Verdura", kcal: 25, pro: 2, lip: 0, hco: 4 },
  frutas: { label: "Fruta", kcal: 60, pro: 0, lip: 0, hco: 15 },
  cerealesSG: { label: "Cereales sin grasa", kcal: 70, pro: 2, lip: 0, hco: 15 },
  cerealesCG: { label: "Cereales con grasa", kcal: 115, pro: 2, lip: 5, hco: 15 },
  leguminosas: { label: "Leguminosas", kcal: 120, pro: 8, lip: 1, hco: 20 },
  aoaMBAG: { label: "O.A muy bajo en grasa", kcal: 40, pro: 7, lip: 1, hco: 0 },
  aoaBAG: { label: "O.A. bajo en grasa", kcal: 55, pro: 7, lip: 3, hco: 0 },
  aoaMAG: { label: "O.A. moderado en grasa", kcal: 75, pro: 7, lip: 5, hco: 0 },
  aoaAAG: { label: "O.A. alto en grasa", kcal: 100, pro: 7, lip: 8, hco: 0 },
  lecheDescremada: { label: "Leche descremada", kcal: 95, pro: 9, lip: 2, hco: 12 },
  lecheSemidescremada: { label: "Leche semidescremada", kcal: 110, pro: 9, lip: 4, hco: 12 },
  lecheEntera: { label: "Leche entera", kcal: 150, pro: 9, lip: 8, hco: 12 },
  azucaresSG: { label: "Azúcar", kcal: 40, pro: 0, lip: 0, hco: 10 },
  azucaresCG: { label: "Azúcar con grasa", kcal: 85, pro: 0, lip: 5, hco: 10 },
  grasasSG: { label: "Grasa", kcal: 45, pro: 0, lip: 5, hco: 0 },
  grasasCP: { label: "Grasa con proteina", kcal: 70, pro: 3, lip: 5, hco: 3 },
  suplementoPro: { label: "Suplemento de proteína", kcal: 75, pro: 15, lip: 0, hco: 2 },
};