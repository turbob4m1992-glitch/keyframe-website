import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
      
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        // Dark Liquid Glass Style (Matches Desktop)
        className="relative w-full h-full max-h-[85vh] bg-[#0d0d0d]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col" 
      >
        
        {/* CLOSE BUTTON (Top Right) */}
        <button 
            onClick={onBack}
            className="absolute top-4 right-4 z-50 p-3 bg-black/40 rounded-full border border-white/10 backdrop-blur-md text-white/50 hover:text-white transition-colors"
        >
            X
        </button>

        <AnimatePresence mode="wait">
            {!selectedProject ? (
                // --- GRID VIEW ---
                <motion.div 
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col h-full p-6"
                >
                    {/* HEADER */}
                    <div className="mb-6 border-b border-white/10 pb-4 flex-shrink-0">
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-2">
                            PORTFOLIO
                        </h2>
                        <p className="text-neon font-mono text-[10px] tracking-[0.3em]">
                            /// SELECTED WORKS
                        </p>
                    </div>

                    {/* SCROLLABLE GRID */}
                    <div className="overflow-y-auto pr-1 custom-scrollbar flex-grow space-y-4">
                        {PROJECTS.map((project, i) => (
                            <div 
                                key={i} 
                                onClick={() => setSelectedProject({ ...project, index: i })}
                                className="relative h-48 rounded-xl overflow-hidden border border-white/10 shadow-lg group shrink-0"
                            >
                                {/* Background Image */}
                                <img 
                                    src={`https://picsum.photos/id/${i + 80}/600/400`} 
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
                                    loading="lazy"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10"></div>
                                
                                {/* Content */}
                                <div className="absolute inset-0 p-5 flex flex-col justify-end z-20">
                                    <h3 className="text-xl font-black text-white tracking-tighter mb-1">{project.title}</h3>
                                    <span className="text-[10px] font-mono font-bold tracking-widest text-neon" style={{ color: project.color }}>
                                        /// {project.type}
                                    </span>
                                </div>

                                {/* Tag */}
                                <div className="absolute top-3 right-3 z-20">
                                    <span className="text-white/60 font-mono text-[10px] bg-black/50 border border-white/20 px-2 py-1 rounded backdrop-blur-md">
                                        REF_0{i+1}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                // --- DETAIL VIEW (EXPANDED) ---
                <motion.div 
                    key="detail"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex flex-col h-full w-full bg-[#0d0d0d] absolute inset-0 z-40"
                >
                    {/* BIG IMAGE AREA */}
                    <div className="w-full h-[45%] relative flex-shrink-0 bg-black">
                        <img 
                            src={`https://picsum.photos/id/${selectedProject.index + 80}/600/400`} 
                            alt={selectedProject.title}
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
                        
                        {/* BACK BUTTON */}
                        <button 
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 left-4 bg-black/40 hover:bg-neon hover:text-black text-white border border-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all font-mono text-xs tracking-widest flex items-center gap-2 z-50"
                        >
                            ← BACK
                        </button>
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="flex-grow p-6 -mt-6 relative z-10 overflow-y-auto">
                        <div className="border-b border-white/10 pb-4 mb-4">
                            <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
                                {selectedProject.title}
                            </h1>
                            <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono tracking-widest" style={{ color: selectedProject.color }}>
                                /// {selectedProject.type} PROJECT
                            </span>
                        </div>

                        <div className="space-y-6 pb-8">
                            <div>
                                <h3 className="text-white/50 text-xs font-mono tracking-widest mb-2">DESCRIPTION</h3>
                                <p className="text-gray-300 text-sm leading-relaxed font-light">
                                    {selectedProject.desc} 
                                    <br/><br/>
                                    This project pushed the boundaries of {selectedProject.type.toLowerCase()} production. 
                                    We utilized advanced rendering techniques combined with real-time motion capture.
                                </p>
                            </div>
                            
                            <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                                <h3 className="text-white/50 text-xs font-mono tracking-widest mb-3">DELIVERABLES</h3>
                                <ul className="text-gray-400 text-xs space-y-2 font-mono">
                                    <li>• 4K Master Render</li>
                                    <li>• Social Media Cuts</li>
                                    <li>• Source Files</li>
                                    <li>• Brand Guidelines</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}