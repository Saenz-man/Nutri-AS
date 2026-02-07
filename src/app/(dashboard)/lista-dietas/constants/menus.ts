import { Coffee, Sun, Sunset, Moon, Utensils } from "lucide-react";

export type Comida = {
  nombre: string;
  detalle: string;
};

export type PlanSemanal = {
  id: string;
  semana: string; // "Semana 1", "Semana 2", etc.
  descripcion: string;
  macros: { pro: number; hco: number; lip: number }; // Distribución aproximada
  menu: {
    desayuno: Comida;
    colacion1: Comida;
    comida: Comida;
    colacion2: Comida;
    cena: Comida;
  };
};

export const CATALOGO_KCAL = ["1200", "1400", "1500", "1600", "1800", "2000", "2200"];

export const DIETAS: Record<string, PlanSemanal[]> = {
  "1500": [
    {
      id: "1500-s1",
      semana: "Semana 1",
      descripcion: "Menú equilibrado alto en fibra.",
      macros: { pro: 20, hco: 50, lip: 30 },
      menu: {
        desayuno: { nombre: "Huevos a la Mexicana", detalle: "2 huevos + 1 tz verdura + 1 tortilla maíz + 1/3 aguacate." },
        colacion1: { nombre: "Fruta con Yogurt", detalle: "1 manzana picada + 1/2 tz yogurt griego sin azúcar." },
        comida: { nombre: "Pollo Asado con Quinoa", detalle: "120g pechuga + 1/2 tz quinoa + ensalada verde ilimitada + 1 cdita aceite oliva." },
        colacion2: { nombre: "Nueces y Arándanos", detalle: "10 almendras + 1 cda arándanos deshidratados." },
        cena: { nombre: "Tostadas de Atún", detalle: "1 lata atún agua + 2 tostadas horneadas + pico de gallo." },
      },
    },
    {
      id: "1500-s2",
      semana: "Semana 2",
      descripcion: "Variedad de proteínas magras.",
      macros: { pro: 25, hco: 45, lip: 30 },
      menu: {
        desayuno: { nombre: "Avena Cocida", detalle: "1/2 tz avena en agua + 1 scoop proteína o 3 claras + canela." },
        colacion1: { nombre: "Jícama con Limón", detalle: "1 taza de jícama picada + limón y chile en polvo." },
        comida: { nombre: "Pescado Empapelado", detalle: "150g filete blanco + verduras al vapor + 1/2 tz arroz integral." },
        colacion2: { nombre: "Gelatina Light", detalle: "1 taza de gelatina sin azúcar + 1/2 taza de fresas." },
        cena: { nombre: "Quesadillas Ligeras", detalle: "2 tortillas nopal + 60g queso panela + salsa mexicana." },
      },
    },
    // ... Puedes agregar Semana 3 y 4 aquí
  ],
  "1800": [
    {
      id: "1800-s1",
      semana: "Semana 1",
      descripcion: "Carga de energía para actividad moderada.",
      macros: { pro: 20, hco: 55, lip: 25 },
      menu: {
        desayuno: { nombre: "Hotcakes de Avena", detalle: "Hechos con 1/2 tz avena, 1 huevo, plátano y leche light." },
        colacion1: { nombre: "Smoothie Verde", detalle: "Espinaca + 1/2 plátano + 1 taza leche almendras + 1 cda crema cacahuate." },
        comida: { nombre: "Pasta con Carne Molida", detalle: "1 tz pasta integral + 120g carne molida 90/10 + salsa tomate casera." },
        colacion2: { nombre: "Palomitas Caseras", detalle: "2.5 tazas de palomitas naturales (sin mantequilla)." },
        cena: { nombre: "Sandwich de Pavo", detalle: "2 rebanadas pan integral + 3 rebanadas pechuga pavo + aguacate + germen." },
      },
    },
    // ... Más semanas
  ],
};

// Íconos para mapear visualmente
export const TIEMPOS_COMIDA = [
  { key: "desayuno", label: "Desayuno", icon: Sun, color: "text-orange-500 bg-orange-50" },
  { key: "colacion1", label: "Colación Matutina", icon: Coffee, color: "text-blue-500 bg-blue-50" },
  { key: "comida", label: "Comida", icon: Utensils, color: "text-green-500 bg-green-50" },
  { key: "colacion2", label: "Colación Vespertina", icon: Sunset, color: "text-purple-500 bg-purple-50" },
  { key: "cena", label: "Cena", icon: Moon, color: "text-indigo-500 bg-indigo-50" },
];