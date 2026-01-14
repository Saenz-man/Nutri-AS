"use client";
import React from 'react';
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Eye, 
  UserPlus, 
  Lock, 
  Database, 
  RefreshCw, 
  Home, 
  ChevronRight,
  UserCheck
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Responsable de la Protección de sus Datos",
      icon: UserCheck,
      content: "La C. Lizeth Abigail Velazquéz Meléndez, propietaria del sitio web Nutri-AS, es la responsable del tratamiento de sus datos personales. Nos comprometemos a resguardar su información bajo los más altos estándares de seguridad y confidencialidad."
    },
    {
      title: "Datos Personales que Recabamos",
      icon: UserPlus,
      content: "Para el uso de la plataforma, recolectamos datos de identificación (nombre, correo profesional) y, en el ejercicio de la consulta, datos de salud de pacientes (peso, medidas, antecedentes clínicos). Estos últimos son tratados como datos sensibles bajo estricto control del usuario profesional."
    },
    {
      title: "Finalidades del Tratamiento",
      icon: Database,
      content: "Su información se utiliza para proveer las herramientas de cálculo y gestión nutricional, generar reportes PDF personalizados, atender solicitudes de soporte técnico y notificar sobre actualizaciones críticas del SMAE."
    },
    {
      title: "Derechos ARCO",
      icon: Eye,
      content: "Usted tiene derecho a conocer qué datos tenemos (Acceso), solicitar correcciones (Rectificación), pedir que los eliminemos (Cancelación) u oponerse a su uso para fines específicos (Oposición)."
    },
    {
      title: "Seguridad de la Información",
      icon: Lock,
      content: "Implementamos medidas de seguridad administrativas y técnicas para proteger sus datos contra daño, pérdida o acceso no autorizado. Nutri-AS no vende ni alquila bases de datos de pacientes a terceros."
    }
  ];

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium mb-12 text-gray-400">
          <Link href="/" className="flex items-center gap-1 hover:text-nutri-main transition-colors">
            <Home size={16} /> Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-nutri-main font-bold">Aviso de Privacidad</span>
        </nav>

        {/* Header */}
        <header className="mb-16 border-b border-gray-100 pb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Aviso de <span className="text-nutri-main">Privacidad.</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed font-medium">
            En Nutri-AS, valoramos la confianza que depositas en nosotros para gestionar tu práctica profesional.
          </p>
        </header>

        {/* Lista de Secciones */}
        <div className="space-y-12 mb-20">
          {sections.map((sec, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-nutri-main border border-gray-100">
                <sec.icon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{sec.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {sec.content}
                </p>
              </div>
            </motion.section>
          ))}
        </div>

        {/* SECCIÓN CORREGIDA (Basada en tu captura 13.48.47) */}
        <div className="bg-[#0f172a] rounded-[4rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <p className="text-gray-300 text-xl font-medium text-center md:text-left">
            Nuestro equipo jurídico está para apoyarte.
          </p>
          <Link 
            href="/soporte" 
            className="bg-nutri-orange hover:bg-orange-600 text-white px-10 py-5 rounded-[2rem] font-bold text-lg transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] active:scale-95 whitespace-nowrap"
          >
            Contactar Soporte
          </Link>
        </div>

        <footer className="mt-16 pt-8 text-center text-gray-400 text-sm italic">
          Este aviso cumple con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
        </footer>
      </div>
    </main>
  );
}