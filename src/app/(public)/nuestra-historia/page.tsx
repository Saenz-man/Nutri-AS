"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Heart, Zap, Target, Code2, GraduationCap } from "lucide-react";

export default function OurHistoryPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-nutri-main font-bold uppercase tracking-widest text-sm"
          >
            Propósito y Pasión
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 mt-4"
          >
            Nuestra <span className="text-nutri-main">Historia.</span>
          </motion.h1>
        </div>

        <div className="space-y-16">
          
          {/* Sección 1: El Origen */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg text-gray-600">
              <p>
                Como nutrióloga, conozco de primera mano los desafíos que enfrentamos al brindar una consulta nutricional de calidad en poco tiempo. Entre fórmulas, cálculos y evaluaciones, muchas veces el enfoque humano y clínico se ve limitado por el tiempo invertido en operaciones manuales.
              </p>
              <p>
                <strong>Nutri-AS</strong> nació precisamente de esa necesidad: crear una herramienta que agilizara el proceso de consulta nutricional sin sacrificar precisión ni profesionalismo.
              </p>
            </div>
            <div className="bg-nutri-light/30 p-12 rounded-[3rem] border border-nutri-light">
              <Heart className="text-nutri-main mb-6" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enfoque Humano</h3>
              <p className="text-gray-500">
                Diseñado para apoyar tanto a nutriólogos como a estudiantes, permitiéndoles realizar cálculos de forma automática, rápida y confiable.
              </p>
            </div>
          </section>

          {/* Sección 2: La Barrera Tecnológica */}
          <section className="bg-gray-900 rounded-[4rem] p-10 md:p-16 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <Zap className="text-nutri-accent mb-6" size={40} />
              <h2 className="text-3xl font-bold mb-6">Calidad sin barreras</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Sabemos que no todos cuentan con herramientas costosas como un InBody, pero eso no debería ser una barrera para brindar una atención de calidad. Con Nutri-AS, es posible tener resultados claros y precisos al instante.
              </p>
            </div>
            <div className="absolute -right-20 -bottom-20 opacity-10">
              <Target size={300} />
            </div>
          </section>

          {/* Sección 3: Desarrollo Técnico - Uriel Sáenz */}
          <section className="flex flex-col md:flex-row gap-12 items-center py-10">
            <div className="w-full md:w-1/3 text-center">
              <div className="bg-gray-100 rounded-[3rem] p-4 border-4 border-white shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                 {/* Aquí podrías poner una foto de Uriel o un icono de ingeniería */}
                 <Code2 size={80} className="text-nutri-main" />
              </div>
              <h4 className="mt-6 text-2xl font-bold text-gray-900">Ing. Uriel Sáenz</h4>
              <p className="text-nutri-orange font-bold">Desarrollo Técnico</p>
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-xl text-gray-600 leading-relaxed italic">
                "En el desarrollo técnico de esta herramienta está el ingeniero Uriel Sáenz, quien con su experiencia y compromiso, hizo posible que esta idea se convirtiera en una realidad funcional y accesible para todos."
              </p>
            </div>
          </section>

          {/* Sección 4: Misión */}
          <section className="border-t border-gray-100 pt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Nuestra Misión</h2>
            <div className="bg-[#f8faf9] p-10 md:p-14 rounded-[4rem] shadow-sm">
              <p className="text-2xl md:text-3xl font-bold text-nutri-main leading-tight italic">
                "Facilitar tu consulta, optimizar tu tiempo y fortalecer tu labor profesional desde el conocimiento, la tecnología y la empatía."
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}