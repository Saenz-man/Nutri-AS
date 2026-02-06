"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const servicios = [
    { name: "Gestión de Pacientes", slug: "gestion" },
    { name: "Historia Clínica", slug: "historia-clinica" },
    { name: "Cálculos Nutricionales", slug: "calculos" },
    { name: "R24 + SMAE", slug: "r24-smae" },
    { name: "Antropometría", slug: "mediciones" },
    { name: "Biblioteca de Recursos", slug: "contenido" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-nutri-main flex items-center">
            Nutri-AS<span className="text-nutri-orange">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-nutri-main font-medium transition-colors">Home</Link>
            
            {/* Dropdown Servicios */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 group-hover:text-nutri-main font-medium py-8 transition-colors">
                Servicios <ChevronDown size={16} />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                {servicios.map((s) => (
                  <Link 
                    key={s.slug} 
                    href={`/servicios/${s.slug}`}
                    className="block px-4 py-3 text-sm text-gray-600 hover:bg-nutri-light hover:text-nutri-main rounded-xl transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/precios" className="text-gray-600 hover:text-nutri-main font-medium transition-colors">Precios</Link>
            <Link href="/blog" className="text-gray-600 hover:text-nutri-main font-medium transition-colors">Blog</Link>

            {/* Dropdown Contacto Corregido */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 group-hover:text-nutri-main font-medium py-8 transition-colors">
                Contacto <ChevronDown size={16} />
              </button>
              <div className="absolute top-full right-0 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                <Link href="/contacto" className="block px-4 py-3 text-sm text-gray-600 hover:bg-nutri-light hover:text-nutri-main rounded-xl transition-colors">
                  Ventas
                </Link>
                <Link href="/soporte" className="block px-4 py-3 text-sm text-gray-600 hover:bg-nutri-light hover:text-nutri-main rounded-xl transition-colors">
                  Soporte Técnico
                </Link>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-nutri-main font-bold">Inicio de sesión</Link>
            <Link href="/registro" className="bg-nutri-main hover:bg-nutri-dark text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-nutri-main/20">
              Registrarme
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-600 font-bold">Home</Link>
          <div className="pl-4 space-y-2 border-l-2 border-nutri-light">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Servicios</p>
            {servicios.map((s) => (
              <Link key={s.slug} href={`/servicios/${s.slug}`} onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-600">{s.name}</Link>
            ))}
          </div>
          <Link href="/precios" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-600 font-bold">Precios</Link>
          <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-600 font-bold">Blog</Link>
          <div className="pl-4 space-y-2 border-l-2 border-nutri-orange/30">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ayuda</p>
             <Link href="/contacto" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-600">Ventas</Link>
             <Link href="/soporte" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-600">Soporte Técnico</Link>
          </div>
          <div className="pt-4 flex flex-col gap-4">
            <Link href="/login" className="w-full text-center py-3 text-gray-600 font-bold">Inicio de Sesion</Link>
            <Link href="/registro" className="w-full text-center py-4 bg-nutri-main text-white rounded-2xl font-bold">Registrarme</Link>
          </div>
        </div>
      )}
    </nav>
  );
}