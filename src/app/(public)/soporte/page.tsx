"use client";
import React from 'react';
import { motion } from "framer-motion";
// 1. Cambiamos 'Tool' por 'Wrench' en los imports
import { Headset, MessageCircle, Send, Wrench, ShieldCheck } from "lucide-react";

export default function SupportPage() {
  const whatsappNumber = "524615976167";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hola,%20necesito%20soporte%20técnico%20con%20mi%20cuenta%20de%20Nutri-AS`;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            Soporte <span className="text-nutri-orange">Técnico.</span>
          </motion.h1>
          <p className="mt-6 text-xl text-gray-500">
            ¿Tienes problemas con tu acceso o alguna herramienta? Estamos aquí para resolverlo de inmediato.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar de Soporte Rápido */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-900 text-white p-8 rounded-[3rem] shadow-2xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="text-nutri-light" /> Canales Oficiales
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="bg-white/10 p-3 rounded-xl text-nutri-accent"><Headset size={20}/></div>
                  <p className="text-sm text-gray-300 leading-relaxed">Respuesta promedio en tickets de correo: <span className="text-white font-bold">2 horas.</span></p>
                </li>
              </ul>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                 className="mt-10 w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all">
                WhatsApp Técnico <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Formulario de Ticket */}
          <div className="lg:col-span-8">
            <div className="bg-[#f8faf9] p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" className="w-full bg-white border-none rounded-2xl py-4 px-6 outline-none shadow-sm" placeholder="ID de Usuario / Correo" />
                  <select className="w-full bg-white border-none rounded-2xl py-4 px-6 outline-none shadow-sm text-gray-500 font-medium">
                    <option>Tipo de problema</option>
                    <option>Error en cálculos</option>
                    <option>Acceso a cuenta</option>
                    <option>Generación de PDF</option>
                    <option>Otro</option>
                  </select>
                </div>
                <textarea rows={6} className="w-full bg-white border-none rounded-2xl py-4 px-6 outline-none shadow-sm" placeholder="Describe detalladamente el problema..."></textarea>
                
                {/* 2. Actualizamos el uso del icono aquí también */}
                <button className="bg-nutri-orange hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all shadow-lg shadow-orange-500/20">
                  Abrir Ticket de Soporte <Wrench size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}