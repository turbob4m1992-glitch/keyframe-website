import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  { 
    title: "VIDEO PRODUCTION", 
    type: "POST-PRODUCTION", 
    image: "/portfolio-final-cut.webp",
    desc: "High-end narrative architecture. A zero-latency workflow managing complex 4K/8K timelines, HDR color science, and immersive audio mastering.",
    longDesc: "This service pushes the boundaries of visual storytelling. We utilize industry-standard Final Cut Pro workflows combined with advanced motion graphics and sound design to create seamless, high-energy visual experiences that retain audience attention.",
    deliverables: ["4K Master Render", "Social Media Cuts", "Sound Design & Mixing", "Color Grading"],
    color: "#CCFF00" 
  },
  { 
    title: "CORPORATE BRANDING", 
    type: "VISUAL SYSTEMS", 
    image: "/portfolio-catalog.webp",
    desc: "Strategic corporate design. Translating complex business capabilities into sleek, modern digital and print profiles for international stakeholders.",
    longDesc: "This service elevates your market presence through cohesive design. We utilize precision typography and grid systems to create authoritative company profiles, catalogs, and brand assets that establish immediate trust with your clients.",
    deliverables: ["Brand Guidelines", "Company Profile (PDF)", "Print-Ready Assets", "Digital Stationery"],
    color: "#00E0FF" 
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
        className="relative w-full h-full max-h-[85vh] bg-[#0d0d0d]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col" 
      >
        
        {/* CLOSE BUTTON */}
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
                    <div className="mb-6 border-b border-white/10 pb-4 flex-shrink-0">
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-2">
                            PORTFOLIO
                        </h2>
                        <p className="text-neon font-mono text-[10px] tracking-[0.3em]">
                            /// SELECTED SERVICES
                        </p>
                    </div>

                    <div className="overflow-y-auto pr-1 custom-scrollbar flex-grow space-y-4">
                        {PROJECTS.map((project, i) => (
                            <div 
                                key={i} 
                                onClick={() => setSelectedProject({ ...project, index: i })}
                                className="relative h-48 rounded-xl overflow-hidden border border-white/10 shadow-lg group shrink-0"
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10"></div>
                                <div className="absolute inset-0 p-5 flex flex-col justify-end z-20">
                                    <h3 className="text-xl font-black text-white tracking-tighter mb-1">{project.title}</h3>
                                    <span className="text-[10px] font-mono font-bold tracking-widest text-neon" style={{ color: project.color }}>
                                        /// {project.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                // --- DETAIL VIEW ---
                <motion.div 
                    key="detail"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex flex-col h-full w-full bg-[#0d0d0d] absolute inset-0 z-40"
                >
                    <div className="w-full h-[45%] relative flex-shrink-0 bg-black">
                        <img 
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
                        <button 
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 left-4 bg-black/40 hover:bg-neon hover:text-black text-white border border-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all font-mono text-xs tracking-widest flex items-center gap-2 z-50"
                        >
                            ← BACK
                        </button>
                    </div>

                    <div className="flex-grow p-6 -mt-6 relative z-10 overflow-y-auto">
                        <div className="border-b border-white/10 pb-4 mb-4">
                            <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
                                {selectedProject.title}
                            </h1>
                            <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono tracking-widest" style={{ color: selectedProject.color }}>
                                /// {selectedProject.type}
                            </span>
                        </div>

                        <div className="space-y-6 pb-8">
                            <div>
                                <h3 className="text-white/50 text-xs font-mono tracking-widest mb-2">SERVICE DESCRIPTION</h3>
                                <p className="text-gray-300 text-sm leading-relaxed font-light">
                                    {selectedProject.desc} 
                                    <br/><br/>
                                    {selectedProject.longDesc}
                                </p>
                            </div>
                            
                            <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                                <h3 className="text-white/50 text-xs font-mono tracking-widest mb-3">DELIVERABLES</h3>
                                <ul className="text-gray-400 text-xs space-y-2 font-mono">
                                    {selectedProject.deliverables.map((item, index) => (
                                        <li key={index}>• {item}</li>
                                    ))}
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