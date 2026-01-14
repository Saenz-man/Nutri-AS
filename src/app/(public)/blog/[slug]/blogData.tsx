import { Zap } from "lucide-react";

export const blogContent: Record<string, any> = {
  "determinacion-probioticos-yogurt": {
    authorImage: "/assets/NutriRomi.png",
    author: "Romany Gonzalez Pacheco",
    school: "UAEH (Hidalgo, México)",
    date: "2023",
    title: "¿Cómo determinar si un yogurt tiene probióticos?",
    tag: "Investigación Láctea",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070",
    likes: "2,568",
    description: "Evaluación técnica de productos lácteos comerciales bajo la normativa NOM-181-SCFI-2010.",
    content: (
      <>
        <p className="text-xl font-medium mb-8 leading-relaxed text-gray-700">
          El yogurt es un producto lácteo fermentado producido por la acción de bacterias lácticas, principalmente <em>Lactobacillus delbrueckii bulgaricus</em> y <em>Streptococcus thermophilus</em>. Para que confiera beneficios reales, debe contener <strong>probióticos viables</strong> en dosis adecuadas.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 text-nutri-main">Marco Normativo: NOM-181-SCFI-2010</h2>
        <p className="mb-6">
          En México, esta normativa establece que el yogurt comercial debe contener un mínimo de 10⁷ UFC/g de cultivos lácticos. Si se incluyen cultivos alternativos, estos deben estar en valores mínimos de <strong>1x10⁶ UFC/g</strong> viables.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 my-10">
          <div className="bg-[#1e3a2f] text-white p-8 rounded-[3rem] shadow-xl">
            <span className="text-4xl font-black text-nutri-accent block mb-2">64.8%</span>
            <p className="text-sm font-bold uppercase tracking-wider mb-4">Incumplimiento</p>
            <p className="text-gray-300 text-sm italic">De los productos evaluados no especifican cantidad ni cepa en su etiquetado.</p>
          </div>
          <div className="bg-nutri-light/20 p-8 rounded-[3rem] border border-nutri-light">
            <span className="text-4xl font-black text-nutri-main block mb-2">35.2%</span>
            <p className="text-sm font-bold uppercase tracking-wider mb-4">Cumplimiento</p>
            <p className="text-gray-600 text-sm italic">Solo este porcentaje cuenta con la declaración de UFC mínima requerida por la normativa.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-8 text-nutri-main">Análisis de Cepas y Beneficios Clínicos</h2>
        <div className="space-y-4">
          {[
            { name: "L. casei Shirota", info: "Regula la función intestinal, reduce la inflamación y fortalece el sistema inmunitario." },
            { name: "Lactobacillus johnsonii", info: "Estimula la respuesta inmune local y combate patógenos como Helicobacter pylori." },
            { name: "Lactobacillus rhamnosus", info: "Equilibra la microbiota y posee actividad antimicrobiana contra Salmonella y E. coli." },
            { name: "Lactobacillus acidophilus", info: "Disminuye el riesgo de infecciones gastrointestinales y diarrea." },
            { name: "Lactobacillus plantarum", info: "Ayuda a regular el tránsito intestinal y protege el epitelio." },
            { name: "Lactobacillus helveticus", info: "Alivia síntomas de colon irritable al normalizar la flora intestinal." },
            { name: "Lactobacillus reuteri", info: "Reduce el tiempo de llanto en cólicos del lactante e intensidad del dolor en SII." },
            { name: "Streptococcus thermophilus", info: "Inhibe el crecimiento de bacterias patógenas mediante efectos antimicrobianos." },
            { name: "Lactococcus lactis", info: "Aporta actividad antioxidante y efectos antimicrobianos comprobados." }
          ].map((cepa, idx) => (
            <div key={idx} className="flex gap-4 p-6 bg-gray-50 rounded-2xl border-l-8 border-nutri-main">
               <div>
                 <h4 className="font-black text-gray-900 italic text-lg">{cepa.name}</h4>
                 <p className="text-gray-600 leading-relaxed text-sm">{cepa.info}</p>
               </div>
            </div>
          ))}
        </div>
      </>
    )
  },
  "metformina-microbiota-sindrome-metabolico": {
    authorImage: "/assets/NutriLiz.jpg",
    author: "Liz Velázquez",
    school: "UAEM (Morelos, México)",
    date: "2021",
    title: "Efecto de la metformina en la microbiota intestinal",
    tag: "Síndrome Metabólico",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080",
    likes: "1,842",
    description: "Análisis del impacto farmacológico en la abundancia bacteriana y reducción de la inflamación sistémica.",
    content: (
      <>
        <p className="text-xl font-medium mb-8 leading-relaxed text-gray-700">
          La metformina, más allá de su papel clásico en la regulación de la glucosa sérica, se ha consolidado como un modulador potente del ecosistema microbiano intestinal.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 text-nutri-main">Mecanismos de Acción Indirectos</h2>
        <p className="mb-6">
          Investigaciones realizadas sugieren que la metformina favorece la abundancia de bacterias productoras de ácidos grasos de cadena corta (AGCC), fundamentales para la integridad de la barrera intestinal y reducir la endotoxemia metabólica.
        </p>
      </>
    )
  },
  "actualizacion-smae-5ta-edicion": {
    author: "UnDesarrolloMas",
    school: "Software Team",
    date: "2024",
    title: "Actualización: Motor de cálculos con SMAE 5ta Edición",
    tag: "Software",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2022",
    likes: "94",
    description: "Ingeniería de software aplicada a la precisión nutricional.",
    content: (
      <div className="bg-gray-900 p-10 rounded-[3rem] text-white flex items-center gap-6">
        <Zap className="text-nutri-accent" size={40} />
        <p className="font-bold text-lg">Asignación de equivalentes y desglose de macros al instante.</p>
      </div>
    )
  }
};