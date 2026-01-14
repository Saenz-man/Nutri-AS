"use client";
import { motion, Transition } from "framer-motion";
import Pricing from "@/components/landing/pricing";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";

export default function PreciosPage() {
  const mainTransition: Transition = { 
    duration: 1.2, 
    ease: [0.22, 1, 0.36, 1] as any 
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cabecera de la página de precios */}
      <section className="pt-32 pb-12 bg-[#f8faf9]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={mainTransition}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6"
          >
            Invierte en tu <span className="text-nutri-main">futuro profesional.</span>
          </motion.h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Sin suscripciones mensuales, sin letras chiquitas. Un solo pago para toda la vida.
          </p>
        </div>
      </section>

      {/* Reutilizamos tu componente de precios que ya está perfecto */}
      <Pricing />

      {/* Sección de preguntas frecuentes o seguridad adicional */}
      <section className="pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <ShieldCheck className="text-nutri-main mb-4" size={40} />
            <h3 className="font-bold text-gray-900 mb-2">Garantía Nutri-AS</h3>
            <p className="text-sm text-gray-500">Soporte técnico prioritario de por vida incluido.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <CreditCard className="text-nutri-orange mb-4" size={40} />
            <h3 className="font-bold text-gray-900 mb-2">Pago Flexible</h3>
            <p className="text-sm text-gray-500">Aceptamos todas las tarjetas de crédito y débito.</p>
          </div>
          <div className="flex flex-center flex-col items-center text-center p-6">
            <Lock className="text-blue-600 mb-4" size={40} />
            <h3 className="font-bold text-gray-900 mb-2">100% Seguro</h3>
            <p className="text-sm text-gray-500">Procesamiento encriptado vía Mercado Pago.</p>
          </div>
        </div>
      </section>
    </div>
  );
}