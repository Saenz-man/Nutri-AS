"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Facebook, 
  Video, 
  ArrowUpRight 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    empresa: [
      { name: 'Home', href: '/' },
      // Agregamos / antes del # para que funcione desde cualquier página (ej. Blog o Precios)
      { name: 'Servicios', href: '/#servicios' }, 
      { name: 'Precios', href: '/precios' },
      { name: 'Blog', href: '/blog' },
      { name: 'Nuestra Historia', href: '/nuestra-historia' },
    ],
    soporte: [
      { name: 'Contacto de Ventas', href: '/contacto' },
      { name: 'Soporte Técnico', href: '/soporte' },
    ],
    legal: [
      { name: 'Privacidad', href: '/privacidad' },
      { name: 'Términos y Condiciones', href: '/terminos-y-condiciones' },
    ]
  };

  const socialLinks = [
    { Icon: Video, href: "#" },
    { Icon: Instagram, href: "https://www.instagram.com/liz_velazquez24/" },
    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61584558133610" },
  ];

  return (
    <footer className="bg-[#0f1a16] text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Columna 1: Brand & Bio */}
          <div className="lg:col-span-4">
            <Link href="/" className="text-3xl font-bold text-nutri-main">
              Nutri-AS<span className="text-nutri-orange">.</span>
            </Link>
            <p className="mt-6 text-gray-400 leading-relaxed max-w-sm">
              Facilitamos tu consulta, optimizamos tu tiempo y fortalecemos tu labor profesional desde la tecnología y la empatía.
            </p>
            <div className="flex gap-4 mt-8">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: '#f97316' }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-nutri-orange transition-colors"
                >
                  <social.Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Columnas de Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-lg text-white">Compañía</h4>
            <ul className="space-y-4 text-gray-400">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-nutri-accent transition-colors flex items-center group">
                    {link.name} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 ml-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-lg text-white">Ayuda</h4>
            <ul className="space-y-4 text-gray-400">
              {footerLinks.soporte.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-nutri-accent transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 bg-white/[0.03] p-8 rounded-[2rem] border border-white/10 shadow-inner">
            <h4 className="font-extrabold mb-4 text-2xl text-white tracking-tight">
              ¿Listo para empezar?
            </h4>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              Únete a la comunidad de nutriólogos que están transformando su práctica profesional.
            </p>
            
            <div className="relative flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Tu email profesional" 
                className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-gray-500 focus:border-nutri-main focus:ring-1 focus:ring-nutri-main outline-none transition-all"
              />
              <button className="w-full bg-nutri-main hover:bg-nutri-dark text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-nutri-main/20 active:scale-95">
                Suscribirme
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
          <p>© {currentYear} Nutri-AS. Todos los derechos reservados.</p>
          
          <div className="flex gap-8">
            {footerLinks.legal.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-white transition-colors text-center md:text-left">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span>Desarrollado por</span>
            <a 
              href="https://www.undesarrollomas.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-nutri-accent font-bold tracking-tight hover:underline transition-all"
            >
              UnDesarrolloMas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;