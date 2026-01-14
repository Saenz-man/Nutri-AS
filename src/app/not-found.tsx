"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wrench, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Decoración de fondo suave - Estilo Nutri-AS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-nutri-light/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-nutri-orange/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl w-full bg-[#f8faf9] border border-gray-100 p-12 md:p-20 rounded-[4rem] text-center shadow-2xl shadow-gray-200/50 relative z-10"
      >
        {/* Icono de construcción estilizado */}
        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-nutri-main/10 relative">
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Wrench size={48} className="text-nutri-main" />
          </motion.div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-nutri-orange rounded-full border-4 border-white" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
          Próximamente <span className="text-nutri-main">disponible.</span>
        </h1>
        
        <p className="text-xl text-gray-500 font-medium mb-12 leading-relaxed">
          Estamos mejorando esta sección para ti. <br className="hidden md:block" />
          Vuelve pronto para descubrir las nuevas funcionalidades de <span className="font-bold text-gray-900">Nutri-AS.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-nutri-main text-white rounded-2xl font-bold text-lg hover:bg-nutri-dark transition-all shadow-lg shadow-nutri-main/20 active:scale-95"
          >
            <Home size={20} />
            Volver al Inicio
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-600 rounded-2xl font-bold text-lg hover:bg-white hover:border-nutri-main hover:text-nutri-main transition-all active:scale-95"
          >
            <ArrowLeft size={20} />
            Regresar
          </button>
        </div>

        {/* Footer interno de la página 404 */}
        <p className="mt-12 text-sm text-gray-400 font-bold uppercase tracking-widest">
          Error 404 • Sección en Desarrollo
        </p>
      </motion.div>
    </main>
  );
}