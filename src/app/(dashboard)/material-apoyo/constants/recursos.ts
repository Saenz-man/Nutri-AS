import { FileText, Calculator, Pill, ShoppingBag, ClipboardList } from "lucide-react";

export const RECURSOS = [
  // 🏥 CLÍNICA
  {
    id: "1",
    titulo: "Historia Clínica Nutricional",
    descripcion: "Formato completo para recolección de antecedentes y datos del paciente.",
    categoria: "Clínica",
    archivo: "/materiales/HISTORIA CLINICA.pdf",
    icon: ClipboardList,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "2",
    titulo: "Orden de Estudios de Laboratorio",
    descripcion: "Formato para solicitar biometría, química sanguínea y más.",
    categoria: "Clínica",
    archivo: "/materiales/ORDEN DE ESTUDIOS DE LABORATORIO.pdf",
    icon: Pill,
    color: "bg-purple-100 text-purple-600",
  },
  
  // 🍎 EDUCACIÓN Y GUÍAS
  {
    id: "3",
    titulo: "Guía de Marcas Recomendadas",
    descripcion: "Catálogo visual de productos saludables en el supermercado.",
    categoria: "Educación",
    archivo: "/materiales/GUIA DE MARCAS RECOMENDADAS.pdf",
    icon: ShoppingBag,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "4",
    titulo: "Guía de Porciones (Método de la Mano)",
    descripcion: "Referencia visual rápida para medir alimentos sin báscula.",
    categoria: "Educación",
    archivo: "/materiales/GUIA DE PORCIONES.pdf",
    icon: FileText,
    color: "bg-orange-100 text-orange-600",
  },

  // 🛠️ HERRAMIENTAS
  {
    id: "5",
    titulo: "Lista de Equivalentes",
    descripcion: "Tabla detallada de intercambio de alimentos por grupos.",
    categoria: "Herramientas",
    archivo: "/materiales/LISTA DE EQUIVALENTES.pdf",
    icon: Calculator,
    color: "bg-teal-100 text-teal-600",
  },
];

export const CATEGORIAS = ["Todos", "Clínica", "Educación", "Herramientas"];