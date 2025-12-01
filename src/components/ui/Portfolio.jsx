import { motion } from 'framer-motion';

// REAL PORTFOLIO DATA
const PROJECTS = [
  { 
    title: "VISUAL ENGINEERING", 
    type: "WORKFLOW", 
    image: "/portfolio-final-cut.webp",
    desc: "Orchestrating complex narrative architecture. A zero-latency workflow managing 50+ layers of 4K RAW footage, HDR color science, and immersive Dolby Atmos soundscapes.",
    color: "#CCFF00" 
  },
  { 
    title: "SAFARIN STEEL", 
    type: "CORPORATE IDENTITY", 
    image: "/portfolio-catalog.webp",
    desc: "Industrial sector re-branding. A complete visual overhaul translating heavy manufacturing capabilities into a sleek, modern digital profile for international stakeholders.",
    color: "#00E0FF" 
  }
];

export default function Portfolio({ onBack }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
      
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        // LIQUID GLASS STYLE (Matching Clients.jsx)
        className="relative w-full max-w-5xl max-h-[85vh] bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col" 
      >
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6 flex-shrink-0">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">
              PORTFOLIO
            </h2>
            <p className="text-neon font-mono text-xs tracking-[0.3em]">
              /// SELECTED WORKS 2023-2025
            </p>
          </div>
          
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/10 transition-colors group"
          >
            <span className="text-gray-500 group-hover:text-neon font-mono text-xl">X</span> 
          </button>
        </div>

        {/* CONTENT SCROLL AREA */}
        <div className="overflow-y-auto pr-2 custom-scrollbar space-y-12">
          
          {/* PROJECT GRID */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project, i) => (
                <div 
                  key={i} 
                  className="bg-black/40 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden hover:border-neon/30 transition-all group cursor-pointer flex flex-col h-64 relative"
                >
                  {/* ACTUAL IMAGE */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>

                  <div className="flex-grow relative z-20 p-6 flex flex-col justify-end">
                     
                     {/* Floating Tag */}
                     <div className="absolute top-4 right-4">
                        <span className="text-white/40 font-mono text-[10px] border border-white/10 px-2 py-1 rounded backdrop-blur-sm">
                          REF_0{i+1}
                        </span>
                     </div>

                     <h3 className="text-2xl font-black text-white tracking-tighter mb-1">{project.title}</h3>
                     <span className="text-xs font-mono font-bold tracking-widest mb-2" style={{ color: project.color }}>
                        /// {project.type}
                     </span>
                     <p className="text-gray-400 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                       {project.desc}
                     </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

      </motion.div>
    </div>
  );
}