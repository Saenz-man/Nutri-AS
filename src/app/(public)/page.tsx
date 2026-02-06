"use client";
import { motion, Variants, Transition } from "framer-motion";
import { Instagram, Facebook, Video } from "lucide-react"; 
import Link from "next/link"; // Importamos Link para navegación interna
import Services from "@/components/landing/services";
import Pricing from "@/components/landing/pricing"; 
import BlogSection from "@/components/landing/blogSection";
import Testimonials from "@/components/landing/Testimonials";
import ContactSection from "@/components/landing/ContactSection";

export default function LandingPage() {
  const mainTransition: Transition = { 
    duration: 1.5, 
    ease: [0.22, 1, 0.36, 1] as any 
  };

  const slowFadeUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  // Arreglo de redes sociales con tus links reales
  const socialLinks = [
    { icon: Video, href: "#", color: "#4a9a75" }, // Placeholder para video
    { icon: Instagram, href: "https://www.instagram.com/liz_velazquez24/", color: "#E1306C" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61584558133610/", color: "#1877F2" },
  ];

  return (
    <>
      {/* SECCIÓN HERO */}
      <section className="relative min-h-[85vh] flex items-start pt-12 md:pt-16 overflow-hidden bg-white">
        {/* Decoración de fondo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-nutri-light rounded-full blur-3xl"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-12 items-start">
          
          <div className="z-10 text-left pt-8">
            <motion.h1 
              variants={slowFadeUp}
              initial="initial"
              animate="animate"
              transition={mainTransition}
              className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight transition-colors cursor-default"
            >
              Nutri-AS: <br />
              Prueba directa a prod, <br />
              <span className="text-nutri-orange">tu éxito profesional.</span>
            </motion.h1>

            <motion.p 
              variants={slowFadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...mainTransition, delay: 0.4 }}
              className="mt-8 text-xl text-gray-500 leading-relaxed max-w-xl"
            >
              Más que un software, una solución integral. Gestiona pacientes, agenda citas y realiza cálculos dietéticos o antropométricos en segundos. Todo en un solo lugar y accesible desde cualquier dispositivo.
            </motion.p>

            <motion.div 
              variants={slowFadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...mainTransition, delay: 0.8 }}
              className="mt-12 flex flex-col sm:flex-row gap-6 items-center"
            >
              {/* BOTÓN CONÓCENOS: Estilizado y funcional */}
              <Link 
                href="/contacto" 
                className="w-full sm:w-auto px-10 py-5 bg-nutri-main text-white rounded-2xl font-bold text-lg hover:bg-nutri-dark transition-all shadow-xl shadow-nutri-main/20 text-center active:scale-95"
              >
                Contáctanos
              </Link>
              
              {/* REDES SOCIALES: Configuración de links externos */}
              <div className="flex gap-5">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, color: "#f97316", backgroundColor: "white" }}
                    className="p-4 rounded-full bg-gray-50 text-gray-400 hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-gray-100"
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Imagen de Portada */}
          <motion.div 
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            className="relative hidden md:block pt-8"
          >
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053" 
                alt="Nutrición Profesional"
                className="object-cover w-full h-[550px]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIONES POSTERIORES */}
      <Services />
      <Pricing />
      <BlogSection />
      <Testimonials />
      <ContactSection />
    </>
  );
}