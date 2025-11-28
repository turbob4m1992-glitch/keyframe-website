import { motion } from 'framer-motion';

// REAL PORTFOLIO DATA
const PROJECTS = [
  { 
    title: "NEON RUNNER", 
    type: "VIDEO", 
    desc: "High-octane commercial spot featuring dynamic motion tracking and neon aesthetics.",
    color: "#CCFF00" 
  },
  { 
    title: "APEX ARCH", 
    type: "WEB", 
    desc: "Minimalist architectural portfolio website with WebGL interactions.",
    color: "#00E0FF" 
  },
  { 
    title: "CYBER BREW", 
    type: "BRAND", 
    desc: "Complete brand identity for a cyberpunk-themed coffee chain.",
    color: "#FF0055" 
  },
  { 
    title: "VELOCITY 2.0", 
    type: "MOTION", 
    desc: "Explainer video using 2.5D animation techniques for a tech startup.",
    color: "#CCFF00" 
  },
  { 
    title: "ECHO FASHION", 
    type: "CAMPAIGN", 
    desc: "Social media campaign driving 300% engagement increase.",
    color: "#00E0FF" 
  },
  { 
    title: "ORBITAL TECH", 
    type: "UI/UX", 
    desc: "Dashboard design for a satellite tracking SaaS platform.",
    color: "#FF0055" 
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
                  className="bg-white/5 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden hover:border-neon/30 transition-colors group cursor-pointer flex flex-col h-64"
                >
                  {/* Image Placeholder (Dark gradient for now, can replace with <img>) */}
                  <div className="flex-grow bg-gradient-to-t from-black via-white/5 to-transparent relative p-6 flex flex-col justify-end">
                     
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
                     <p className="text-gray-400 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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