"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, Phone, CheckCircle2 } from "lucide-react";

export default function SalesContactPage() {
  const whatsappNumber = "525524948319";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hola,%20me%20gustaría%20recibir%20información%20sobre%20los%20planes%20de%20Nutri-AS`;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Columna Informativa */}
          <div>
            <motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-nutri-main font-bold uppercase tracking-widest text-sm"
            >
              Atención Comercial
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold text-gray-900 mt-4 leading-tight"
            >
              Impulsa tu <span className="text-nutri-main">clínica hoy.</span>
            </motion.h1>
            <p className="mt-8 text-xl text-gray-500 leading-relaxed">
              Nuestro equipo de ventas está listo para ayudarte a elegir el plan ideal para tu crecimiento profesional.
            </p>

            <div className="mt-12 space-y-6">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-4 p-6 bg-[#25D366]/10 rounded-[2rem] border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-all group">
                <div className="w-12 h-12 bg-[#25D366] text-white rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">Chatea con Ventas</p>
                  <p className="text-lg font-bold text-gray-900">Equipo de ventas</p>
                </div>
              </a>
            </div>
          </div>

          {/* Formulario de Correo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-[#f8faf9] p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Mail className="text-nutri-main" /> Envíanos un correo
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
                  <input type="text" className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-nutri-main/20 outline-none shadow-sm" placeholder="Ej. Ana García" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Correo Profesional</label>
                  <input type="email" className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-nutri-main/20 outline-none shadow-sm" placeholder="ana@ejemplo.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mensaje</label>
                <textarea rows={4} className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-nutri-main/20 outline-none shadow-sm" placeholder="¿En qué podemos ayudarte?"></textarea>
              </div>
              <button className="w-full bg-nutri-main hover:bg-nutri-dark text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-nutri-main/20">
                Enviar Solicitud <Send size={20} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}