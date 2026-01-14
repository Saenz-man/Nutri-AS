"use client";
import React from 'react';
import { motion } from "framer-motion";
import { ChevronRight, Home, GraduationCap, Microscope, Heart, Calendar } from "lucide-react";
import Link from "next/link";

export default function BlogClient({ slug, data }: { slug: string; data: any }) {
  if (!data) return null;

  return (
    <div className="bg-white pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium mb-12 text-gray-400">
          <Link href="/" className="flex items-center gap-1 hover:text-nutri-main transition-colors">
            <Home size={16} /> Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/blog" className="hover:text-nutri-main transition-colors">Blog</Link>
          <ChevronRight size={14} />
          <span className="text-nutri-main font-bold truncate">{data.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="bg-[#f8faf9] p-10 rounded-[3rem] border border-gray-100 text-center shadow-sm">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-xl overflow-hidden bg-gray-200">
                <img 
                  src={data.authorImage || `/assets/autores/${slug}.jpg`} 
                  alt={data.author} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{data.author}</h4>
              <p className="text-nutri-main font-bold mt-1">Lic. en Nutrición</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-sm font-medium">
                <GraduationCap size={18} /> {data.school}
              </div>
              <p className="mt-6 text-sm text-gray-500 italic leading-relaxed">
                {data.description}
              </p>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <main className="lg:w-2/3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-[3rem] overflow-hidden mb-10 shadow-2xl border-8 border-white ring-1 ring-gray-100">
              <img src={data.image} alt={data.title} className="w-full h-64 object-cover object-center" />
            </motion.div>
            
            <div className="flex items-center gap-6 mb-8 text-sm font-bold text-gray-500">
              <span className="bg-nutri-light px-5 py-2 rounded-full text-nutri-main uppercase text-xs tracking-widest">{data.tag}</span>
              <span className="flex items-center gap-1.5 text-nutri-orange"><Heart size={16} fill="currentColor" /> {data.likes}+</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">{data.title}</h1>
            <div className="prose prose-lg text-gray-600 max-w-none">
              {data.content}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}