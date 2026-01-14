"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Dra. Elena Rodríguez",
    role: "Nutrióloga Clínica",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    content: "Nutri-AS transformó mi consulta. Antes perdía horas en cálculos manuales, ahora dedico tiempo de calidad a mis pacientes y mis reportes son 100% profesionales."
  },
  {
    id: 2,
    name: "Mtro. Ricardo Serna",
    role: "Especialista en Deporte",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo",
    content: "El módulo de mediciones es el mejor que he usado. Las gráficas de evolución automática motivan muchísimo a mis atletas a seguir su plan."
  },
  {
    id: 3,
    name: "Lic. Sofía Martínez",
    role: "Nutrición Pediátrica",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    content: "Lo que más valoro es el pago único. Me olvidé de las suscripciones mensuales y el soporte de UnDesarrolloMas siempre es rápido y efectivo."
  },
  {
    id: 4,
    name: "Dr. Carlos Méndez",
    role: "Investigador Nutricional",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    content: "La precisión en los cálculos con el SMAE me da la seguridad de que mis planes de alimentación están basados en la evidencia más reciente."
  },
  {
    id: 5,
    name: "Nut. Paola Vargas",
    role: "Consulta Privada",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paola",
    content: "Desde que uso Nutri-AS, la percepción de mi marca profesional ha subido increíblemente. ¡Es una inversión que se paga sola en el primer mes!"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 10000); // 10 segundos exactos
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className="relative py-32 bg-[#1e3a2f] overflow-hidden">
      {/* Decoración de Fondo (Hojas transparentes) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 -left-20 rotate-45 w-96 h-96 bg-gradient-to-br from-nutri-accent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-20 -rotate-45 w-96 h-96 bg-gradient-to-br from-nutri-main to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-nutri-orange font-bold uppercase tracking-[0.4em] text-xs"
          >
            Casos de Éxito
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mt-4"
          >
            Confianza <span className="text-nutri-accent">Profesional</span>
          </motion.h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-5 gap-12 items-center"
            >
              {/* Lado Imagen */}
              <div className="lg:col-span-2 flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-nutri-main rounded-[3rem] rotate-6 scale-105 opacity-20 group-hover:rotate-12 transition-transform duration-500" />
                  <div className="relative w-64 h-80 md:w-80 md:h-[450px] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                    <img 
                      src={`https://images.unsplash.com/photo-${index === 0 ? '1559839734-2b71f1e59816' : index === 1 ? '1622253692010-333f2da6031d' : '1594824476967-48c8b964273f'}?q=80&w=800`} 
                      className="w-full h-full object-cover" 
                      alt={testimonials[index].name} 
                    />
                  </div>
                </div>
              </div>

              {/* Lado Texto (Tarjeta Glassmorphism) */}
              <div className="lg:col-span-3 text-left">
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[4rem] shadow-2xl relative">
                  <Quote className="absolute top-10 right-10 text-nutri-orange/30 w-20 h-20" />
                  
                  <div className="flex gap-1 mb-6 text-nutri-orange">
                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                  </div>

                  <p className="text-2xl md:text-4xl text-white font-light italic leading-tight mb-10">
                    "{testimonials[index].content}"
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="h-1 w-12 bg-nutri-accent" />
                    <div>
                      <h4 className="text-2xl font-bold text-white leading-none">{testimonials[index].name}</h4>
                      <p className="text-nutri-accent font-medium text-sm uppercase tracking-widest mt-2">
                        {testimonials[index].role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botones de Navegación Flotantes */}
          <div className="flex gap-4 mt-12 lg:absolute lg:-bottom-20 lg:right-0">
            <button 
              onClick={() => setIndex(index === 0 ? testimonials.length - 1 : index - 1)}
              className="w-14 h-14 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#1e3a2f] transition-all group"
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setIndex(index === testimonials.length - 1 ? 0 : index + 1)}
              className="w-14 h-14 rounded-full bg-nutri-main text-white flex items-center justify-center hover:bg-nutri-dark transition-all shadow-xl group"
            >
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}