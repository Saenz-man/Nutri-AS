"use client";
import { motion, Transition } from "framer-motion";
import { Headset, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link"; // 1. Importamos Link

export default function ContactSection() {
  const mainTransition: Transition = { 
    duration: 1.2, 
    ease: [0.22, 1, 0.36, 1] as any 
  };

  const contactTypes = [
    {
      title: "Contacto de Ventas",
      description: "Ideal para nutriólogos que quieren escalar su clínica y conocer planes empresariales.",
      icon: ShoppingCart,
      color: "bg-nutri-main", 
      accent: "text-nutri-main",
      cta: "Hablar con Ventas",
      href: "/contacto" // 2. Ruta a la página de Ventas
    },
    {
      title: "Soporte Técnico",
      description: "¿Ya eres parte de Nutri-AS? Te ayudamos con cualquier duda técnica o de acceso.",
      icon: Headset,
      color: "bg-nutri-orange", 
      accent: "text-nutri-orange",
      cta: "Abrir Ticket",
      href: "/soporte" // 3. Ruta a la página de Soporte
    }
  ];

  return (
    <section className="py-24 bg-[#f8faf9]" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={mainTransition}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900"
          >
            Estamos para <span className="text-nutri-main">ayudarte.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {contactTypes.map((contact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ ...mainTransition, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className={`w-16 h-16 ${contact.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <contact.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{contact.title}</h3>
              <p className="text-gray-500 mb-8 flex-grow">{contact.description}</p>
              
              {/* 4. Cambiamos 'button' por 'Link' */}
              <Link 
                href={contact.href}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-center
                ${i === 0 
                  ? 'bg-nutri-main text-white hover:bg-nutri-dark shadow-lg shadow-nutri-main/20' 
                  : 'border-2 border-nutri-orange text-nutri-orange hover:bg-nutri-orange hover:text-white'
                }`}
              >
                {contact.cta} <ArrowRight size={20} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}