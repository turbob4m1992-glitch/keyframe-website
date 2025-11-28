import { motion } from 'framer-motion';

// DATA FROM PORTFOLIO SPACE
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

export default function MobilePortfolio({ onBack }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
      
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        // Liquid Glass Style (Matching Clients.jsx)
        className="relative w-full max-w-4xl max-h-[85vh] bg-[#0d0d0d]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl flex flex-col" 
      >
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6 flex-shrink-0">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter mb-2">
              PORTFOLIO
            </h2>
            <p className="text-neon font-mono text-[10px] tracking-[0.3em]">
              /// SELECTED WORKS
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
        <div className="overflow-y-auto pr-2 custom-scrollbar space-y-6">
          
          {/* PROJECT LIST */}
          <div className="grid grid-cols-1 gap-4">
            {PROJECTS.map((project, i) => (
              <div 
                key={i} 
                className="bg-white/5 backdrop-blur-md p-6 border-l-2 border-white/10 rounded-r-lg hover:border-neon/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold text-lg tracking-tight">{project.title}</h3>
                    <span className="font-mono text-[10px] tracking-widest" style={{ color: project.color }}>
                        [{project.type}]
                    </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.desc}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-white/20 font-mono text-[10px]">REF_0{i+1}</span>
                    <span className="text-neon/50 text-[10px] font-mono uppercase">View Case Study -&gt;</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </motion.div>
    </div>
  );
}