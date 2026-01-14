"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { motion, Transition } from 'framer-motion';
import { 
  Calendar, Users, LineChart, Layout, CheckCircle2, 
  ArrowRight, Smartphone, Zap, ClipboardCheck,
  ClipboardList, Calculator, Apple, Clock, FileText,
  Activity, Ruler, BookOpen, Image, Download,
  Stethoscope, ShieldCheck, Microscope, HeartPulse, GraduationCap
} from 'lucide-react';
import Link from 'next/link';

// 1. DICCIONARIO COMPLETO DE CONTENIDO PARA LOS 6 SERVICIOS
const servicesContent: Record<string, any> = {
  "gestion": {
    id: "01",
    title: "Gestión y Control Total de Pacientes",
    tagline: "Transforma tu administración en eficiencia pura",
    intro: "Deja atrás el papel y las hojas de cálculo dispersas. Centraliza toda tu práctica clínica en un entorno intuitivo diseñado para el flujo real de una consulta nutricional.",
    mainIcon: Users,
    functionalities: [
      {
        icon: Calendar,
        title: "1. Agenda Médica Inteligente y Dinámica",
        desc: "No es solo un calendario, es el centro operativo de tu día.",
        bullets: [
          "Visualización Flexible: Alterna entre vistas diaria, semanal o mensual.",
          "Gestión Ágil: Reagenda citas con un solo movimiento de Drag & Drop.",
          "Sincronización en Tiempo Real: Cambios instantáneos en tu Dashboard."
        ]
      },
      {
        icon: ClipboardCheck,
        title: "2. Expediente Clínico Digital 360°",
        desc: "Accede a la radiografía completa de tu paciente desde un solo lugar.",
        bullets: [
          "Perfil Unificado: Visualiza datos personales e indicadores clave (IMC) inmediatos.",
          "Búsqueda Inteligente: Filtros avanzados por nombre, número o estado.",
          "Historial Centralizado: Consulta notas y estudios sin navegar múltiples pestañas."
        ]
      },
      {
        icon: LineChart,
        title: "3. Seguimiento de Evolución Clínica",
        desc: "Toma decisiones basadas en datos acumulados, no en suposiciones.",
        bullets: [
          "Línea de Tiempo: Registro cronológico detallado de cada interacción.",
          "Notas de Progreso: Espacio para observaciones subjetivas y objetivos.",
          "Estatus de Paciente: Control de pacientes activos y concluidos."
        ]
      },
      {
        icon: Smartphone,
        title: "4. Entorno Multiplataforma y Ubicuidad",
        desc: "Tu consultorio te acompaña a donde vayas.",
        bullets: [
          "Acceso 24/7: Desarrollo en la nube accesible desde laptop, tablet o smartphone.",
          "Interfaz Adaptativa: Diseño optimizado para pantallas táctiles y escritorio."
        ]
      }
    ],
    benefits: [
      "Optimización del Tiempo: Reduce hasta un 40% el tiempo administrativo.",
      "Profesionalismo: Proyecta una imagen moderna y tecnológica.",
      "Seguridad de Información: Datos seguros y respaldados en la nube."
    ]
  },
  "historia-clinica": {
    id: "02",
    title: "Historia Clínica Digital Flexible",
    tagline: "La base de un diagnóstico preciso empieza aquí",
    intro: "Olvida los formatos rígidos. Captura la esencia clínica de tus pacientes con formularios diseñados para adaptarse a tu metodología de trabajo.",
    mainIcon: Stethoscope,
    functionalities: [
      {
        icon: Layout,
        title: "1. Captura de Datos Generales",
        desc: "Inicia el proceso con una estructura profesional y organizada.",
        bullets: ["Identificación Fotográfica para personalización", "Edad calculada automáticamente", "Motivo de consulta documentado con prioridad"]
      },
      {
        icon: HeartPulse,
        title: "2. Mapeo Hereditario y Patológico",
        desc: "Identifica factores de riesgo de forma visual y rápida.",
        bullets: ["Registro sistémico de enfermedades (Diabetes, HTA)", "Historial personal de padecimientos y cirugías", "Lógica condicional en campos de descripción"]
      },
      {
        icon: Microscope,
        title: "3. Exploración de Manifestaciones Clínicas",
        desc: "Evaluación física cualitativa en tabla técnica.",
        bullets: ["Evaluación de ojos, piel, cabello, uñas y lengua", "Referencia de Características Normales vs del paciente", "Detección facilitada de deficiencias nutricionales"]
      }
    ],
    benefits: [
      "Navegación Intuitiva con validaciones en tiempo real.",
      "Estandarización Clínica para reportes legales y auditorías.",
      "Flexibilidad de Campo con observaciones de texto abierto."
    ]
  },
  "calculos": {
    id: "03",
    title: "Cálculos y Precisión Nutricional",
    tagline: "Ciencia exacta al servicio de tu consulta",
    intro: "Sustituye las calculadoras manuales por un motor de procesamiento clínico que garantiza resultados exactos bajo estándares internacionales.",
    mainIcon: Calculator,
    functionalities: [
      {
        icon: Zap,
        title: "1. Algoritmos de Gasto Energético",
        desc: "Obtén el GEB y GET en segundos con fórmulas validadas.",
        bullets: ["Mifflin-St Jeor y Harris-Benedict integradas", "Valencia optimizada para población latina", "Schofield y OMS/FAO para todas las edades"]
      },
      {
        icon: LineChart,
        title: "2. Distribución Dinámica de Macros",
        desc: "Configura la estrategia nutricional con precisión matemática.",
        bullets: ["Reparto por porcentaje de HC, Proteínas y Lípidos", "Conversión instantánea a Kilocalorías y Gramos", "Monitoreo de hidratos simples para planes terapéuticos"]
      },
      {
        icon: Apple,
        title: "3. Integración con SMAE (5ta Ed.)",
        desc: "Conecta tus cálculos directamente con el sistema de equivalentes.",
        bullets: ["Llenado por grupos (Verduras, Frutas, AOA, etc.)", "Balance automático vs meta establecida", "Semáforo visual de adecuación (95-105%)"]
      }
    ],
    benefits: [
      "Cero Errores: Elimina riesgos en fórmulas complejas.",
      "Agilidad en Consulta: Ajustes frente al paciente en segundos.",
      "Sustento Científico: Automatización de fórmulas académicas."
    ]
  },
  "r24-smae": {
    id: "04",
    title: "R24 + SMAE (Evaluación Especializada)",
    tagline: "Diagnósticos reales basados en hábitos reales",
    intro: "Captura con exactitud lo que tu paciente consume y compáralo instantáneamente con las metas nutricionales.",
    mainIcon: ClipboardList,
    functionalities: [
      {
        icon: Clock,
        title: "1. Recordatorio de 24 Horas",
        desc: "Transforma la entrevista en un registro estructurado.",
        bullets: ["Captura por tiempos de comida (Desayuno, Colaciones, etc.)", "Detalle de preparaciones y métodos de cocción", "Interfaz ágil que sigue el ritmo de la conversación"]
      },
      {
        icon: Microscope,
        title: "2. Visor Integrado del SMAE",
        desc: "Todo el conocimiento del libro a un clic.",
        bullets: ["Buscador rápido por nombre o grupo", "Datos nutricionales (Energía, Macros) inmediatos", "Cálculo automático según porciones consumidas"]
      },
      {
        icon: FileText,
        title: "3. Generación de PDFs Profesionales",
        desc: "Entrega resultados que impacten y motiven.",
        bullets: ["Branding de tu clínica en cada reporte", "Tablas de consumo y gráficas de adecuación", "Envío directo por WhatsApp o Correo"]
      }
    ],
    benefits: [
      "Ahorro de hasta 20 minutos por paciente.",
      "Estandarización basada en la 5ta Edición del SMAE.",
      "Aumento del valor percibido del servicio profesional."
    ]
  },
  "mediciones": {
    id: "05",
    title: "Mediciones y Análisis Antropométrico",
    tagline: "Visualiza el progreso, motiva el cambio",
    intro: "Registra, analiza y proyecta la evolución corporal de tus pacientes con precisión clínica y claridad visual.",
    mainIcon: Ruler,
    functionalities: [
      {
        icon: Activity,
        title: "1. Registro de Plicometría",
        desc: "Control de grasa corporal mediante métodos validados.",
        bullets: ["Fórmulas de Jackson-Pollock y Durnin-Womersley", "Cálculo automático de % de grasa corporal", "Referencia por edad y sexo integrada"]
      },
      {
        icon: LineChart,
        title: "2. Gráficas de Evolución Automáticas",
        desc: "La herramienta más poderosa para retener pacientes.",
        bullets: ["Visualización de caída de grasa vs aumento de músculo", "Comparativa visual Estado Inicial vs Actual", "Impacto motivacional mediante tendencias positivas"]
      }
    ],
    benefits: [
      "Decisiones basadas en datos de composición real.",
      "Ahorro de tiempo en operaciones matemáticas complejas.",
      "Fidelización mediante resultados graficados."
    ]
  },
  "contenido": {
    id: "06",
    title: "Biblioteca de Recursos y Contenido",
    tagline: "Empodera a tus pacientes con herramientas prácticas",
    intro: "Ofrece un repositorio exclusivo de material educativo y planes alimenticios prediseñados para mejorar la adherencia.",
    mainIcon: BookOpen,
    functionalities: [
      {
        icon: Layout,
        title: "1. Repositorio de Dietas (Plantillas)",
        desc: "Acelera tu flujo de trabajo sin sacrificar calidad.",
        bullets: ["Colección por objetivos (Keto, Diabetes, etc.)", "Personalización rápida desde una estructura base", "Consistencia clínica en cada entrega"]
      },
      {
        icon: Image,
        title: "2. Material Multimedia Educativo",
        desc: "Convierte la nutrición en un proceso visual.",
        bullets: ["Infografías de porciones e intercambios", "Videos de recetas y técnicas de preparación", "Manuales PDF de etiquetado e hidratación"]
      },
      {
        icon: GraduationCap,
        title: "3. Envío Directo al Paciente",
        desc: "La información correcta en el momento preciso.",
        bullets: ["Asignación automática al expediente del paciente", "Compartición ágil desde la plataforma", "Historial de materiales recibidos por el usuario"]
      }
    ],
    benefits: [
      "Diferenciación mediante una experiencia educativa integral.",
      "Ahorro de tiempo en explicaciones repetitivas.",
      "Fidelización gracias al acompañamiento constante."
    ]
  }
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "gestion";
  const data = servicesContent[slug] || servicesContent["gestion"];

  const mainTransition: Transition = { 
    duration: 1.2, 
    ease: [0.22, 1, 0.36, 1] as any 
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SECCIÓN HERO */}
      <section className="bg-gradient-to-b from-[#f8faf9] to-white pt-32 pb-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={mainTransition}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="md:w-3/5">
              <span className="text-nutri-main font-bold uppercase tracking-widest text-sm">Servicio {data.id}</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-4 leading-tight">
                {data.title}
              </h1>
              <p className="text-nutri-orange text-2xl font-semibold mt-4 italic leading-relaxed">
                "{data.tagline}"
              </p>
              <p className="mt-8 text-xl text-gray-500 leading-relaxed max-w-2xl">
                {data.intro}
              </p>
            </div>
            {/* Tarjeta de Resumen Rápido */}
            <div className="md:w-2/5">
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-nutri-main/10 border border-nutri-main/10 relative overflow-hidden group">
                <data.mainIcon size={120} className="text-nutri-main/10 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform" />
                <div className="relative z-10">
                  <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Zap className="text-nutri-orange" /> Ventajas Competitivas
                  </h4>
                  <ul className="space-y-4">
                    {data.benefits.map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-semibold text-gray-600">
                        <CheckCircle2 size={18} className="text-nutri-main mt-0.5 shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN FUNCIONALIDADES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              🚀 Funcionalidades Clave
            </h2>
            <div className="h-1.5 w-24 bg-nutri-main mx-auto mt-6 rounded-full" />
          </div>

          <div className="space-y-32">
            {data.functionalities.map((func: any, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={mainTransition}
                viewport={{ once: true }}
                className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}
              >
                {/* Contenido Texto */}
                <div className="md:w-1/2">
                  <div className="w-16 h-16 bg-nutri-light rounded-2xl flex items-center justify-center mb-6">
                    <func.icon className="text-nutri-main" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{func.title}</h3>
                  <p className="text-lg text-nutri-main font-semibold mb-6 italic leading-relaxed">{func.desc}</p>
                  <ul className="space-y-4">
                    {func.bullets.map((bullet: string, bIdx: number) => (
                      <li key={bIdx} className="flex items-start gap-3 text-gray-600">
                        <div className="h-2 w-2 bg-nutri-orange rounded-full mt-2.5 shrink-0" />
                        <span className="leading-relaxed font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contenedor Captura de Pantalla */}
                <div className="md:w-1/2 w-full">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-nutri-main rounded-4xl rotate-2 opacity-5 group-hover:rotate-1 transition-transform" />
                    <div className="relative bg-[#f8faf9] rounded-4xl border-8 border-white shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                      <img 
                        src={`/assets/servicios/${slug}-${idx + 1}.png`} 
                        alt={func.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = "https://placehold.co/800x450?text=Nutri-AS+Dashboard"; }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-nutri-main">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Digitaliza tu clínica con Nutri-AS
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/registro" className="bg-white text-nutri-main px-12 py-5 rounded-full font-bold text-xl hover:bg-nutri-light transition-all flex items-center justify-center gap-2">
              Empezar ahora <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}