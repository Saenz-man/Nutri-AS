"use client";
import { motion, Variants, Transition } from "framer-motion";
import { 
  Check, ShieldCheck, 
  MessageCircle, Zap, Lock 
} from "lucide-react";

export default function Pricing() {
  const mainTransition: Transition = { 
    duration: 1.2, 
    ease: [0.22, 1, 0.36, 1] as any 
  };

  const features = [
    "Acceso de por vida (Pago único)",
    "Los 6 pilares de gestión incluidos",
    "Cálculos y mediciones ilimitadas",
    "Soporte técnico prioritario",
    "Actualizaciones gratuitas",
    "Exportación de reportes en PDF"
  ];

  return (
    <section className="py-12 md:py-24 bg-[#f8faf9]" id="precios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={mainTransition}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            Digitaliza tu consulta <br />
            <span className="text-nutri-main">con un solo movimiento.</span>
          </motion.h2>
        </div>

        {/* Grid Principal: Usamos items-stretch para que las columnas tengan coherencia visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* LADO IZQUIERDO: La Tarjeta de Precios (4 de 12 columnas) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={mainTransition}
            viewport={{ once: true }}
            className="lg:col-span-4 order-2 lg:order-1"
          >
            <div className="bg-white rounded-4xl p-6 md:p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full">
              <div className="text-center mb-8">
                <h3 className="text-nutri-main font-bold uppercase tracking-widest text-sm mb-2">Plan Profesional</h3>
                <div className="flex items-center justify-center">
                  <span className="text-5xl md:text-6xl font-extrabold text-gray-900">$600</span>
                  <span className="text-xl font-bold text-gray-400 ml-2">MXN</span>
                </div>
              </div>

              {/* Lista de Beneficios */}
              <div className="space-y-4 mb-10 flex-grow">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-nutri-light rounded-full p-1">
                      <Check size={14} className="text-nutri-main font-bold" />
                    </div>
                    <span className="text-gray-600 text-sm md:text-base font-medium leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* BOTÓN DE COMPRA CORREGIDO */}
              <button className="w-full flex items-center justify-center gap-3 text-xl py-5 group 
                   border-2 border-nutri-main text-nutri-main bg-white 
                   hover:bg-nutri-main hover:text-white transition-all 
                   rounded-full font-bold shadow-lg shadow-nutri-main/10 
                   active:scale-95 cursor-pointer">
  Comprar ahora
  <motion.span 
    animate={{ x: [0, 5, 0] }} 
    transition={{ repeat: Infinity, duration: 1.5 }}
  >
    →
  </motion.span>
</button>

              {/* Seguridad Mercado Pago */}
              <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm">
                  <ShieldCheck size={18} />
                  Pago seguro vía Mercado Pago
                </div>
                
                <div className="text-center">
                  <span className="font-bold text-2xl italic text-blue-600">Mercado<span className="text-sky-400">Pago</span></span>
                </div>

                <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                  Aceptamos todas las tarjetas de crédito y débito. <br />
                  <span className="flex items-center justify-center gap-1 mt-1">
                    <Lock size={10} /> Procesamiento encriptado de 256 bits.
                  </span>
                </p>

                <div className="pt-4 text-center">
                  <a href="#" className="text-nutri-main font-bold text-sm hover:text-nutri-orange transition-colors inline-flex items-center gap-2">
                    <MessageCircle size={16} />
                    ¿Tienes dudas? Contáctanos
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* LADO DERECHO: Contenido Visual (8 de 12 columnas) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={mainTransition}
            viewport={{ once: true }}
            className="lg:col-span-8 order-1 lg:order-2 flex flex-col gap-8"
          >
            {/* Contenedor de Imagen con Relación de Aspecto Fija */}
            <div className="relative rounded-4xl overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-gray-100 aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop" 
                alt="Nutri-AS Dashboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-nutri-orange/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer shadow-2xl"
                >
                  <Zap size={32} fill="white" />
                </motion.div>
              </div>
            </div>

            {/* Testimonio / Frase de Cierre */}
            <div className="bg-white p-8 md:p-12 rounded-4xl shadow-sm border border-gray-100 flex-grow flex flex-col justify-center">
              <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 italic leading-snug">
                "La herramienta que transformará tu práctica profesional."
              </h4>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
                Únete a los cientos de nutriólogos que ya han eliminado el papeleo y las hojas de cálculo. Con **Nutri-AS**, no solo adquieres un software, adquieres un aliado para escalar tu clínica al siguiente nivel profesional.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}