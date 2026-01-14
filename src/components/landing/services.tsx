"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link"; // 1. Importamos Link para la navegación
import { 
  Users, ClipboardList, Calculator, 
  Apple, Activity, BookOpen 
} from "lucide-react";

const services = [
  {
    title: "01. GESTIÓN",
    slug: "gestion", // 2. Añadimos el slug exacto para la ruta
    subtitle: "Control total de pacientes",
    description: "Organiza expedientes, programa citas y accede al historial completo de forma intuitiva.",
    icon: Users,
  },
  {
    title: "02. HISTORIA CLÍNICA",
    slug: "historia-clinica",
    subtitle: "Expediente digital flexible",
    description: "Formularios 100% personalizables para capturar información relevante de forma ágil.",
    icon: ClipboardList,
  },
  {
    title: "03. CÁLCULOS",
    slug: "calculos",
    subtitle: "Precisión Nutricional",
    description: "Automatiza cálculos con fórmulas validadas (Mifflin, Harris-Benedict) sin errores.",
    icon: Calculator,
  },
  {
    title: "04. R24 + SMAE",
    slug: "r24-smae",
    subtitle: "Evaluación especializada",
    description: "Recordatorio de 24 horas integrado con el SMAE (5ta ed) y generación de reportes PDF.",
    icon: Apple,
  },
  {
    title: "05. MEDICIONES",
    slug: "mediciones",
    subtitle: "Análisis antropométrico",
    description: "Registro de pliegues y circunferencias con gráficas automáticas de evolución corporal.",
    icon: Activity,
  },
  {
    title: "06. CONTENIDO",
    slug: "contenido",
    subtitle: "Biblioteca de recursos",
    description: "Material multimedia y dietas prediseñadas para mejorar la adherencia al tratamiento.",
    icon: BookOpen,
  },
];

export default function Services() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-24 bg-gray-50/50" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            Soluciones para una <span className="text-nutri-main">gestión inteligente</span>
          </motion.h2>
          <div className="mt-4 h-1.5 w-24 bg-nutri-accent mx-auto rounded-full" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            // 3. Envolvemos la card con Link para que sea toda clickeable
            <Link key={index} href={`/servicios/${service.slug}`}>
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group bg-white p-8 h-full rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-nutri-accent/50 transition-all duration-500 relative overflow-hidden cursor-pointer"
              >
                <div className="w-16 h-16 bg-nutri-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-nutri-orange group-hover:rotate-6 transition-all duration-500">
                  <service.icon className="w-8 h-8 text-nutri-main group-hover:text-white transition-colors" />
                </div>

                <span className="text-nutri-main font-bold text-xs uppercase tracking-widest">
                  {service.title}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4 group-hover:text-nutri-main transition-colors">
                  {service.subtitle}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-8 flex items-center text-nutri-orange font-bold text-sm opacity-0 group-hover:opacity-100 transition-all -translate-x-2.5 group-hover:translate-x-0">
                  Ver detalles <span className="ml-2">→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}