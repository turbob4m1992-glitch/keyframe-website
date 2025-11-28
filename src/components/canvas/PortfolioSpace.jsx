import { Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

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

export default function PortfolioSpace({ isOpen, onClose }) {
  const { size } = useThree()
  const isMobile = size.width < 768
  const wrapperRef = useRef()
  
  const [selectedProject, setSelectedProject] = useState(null)

  // Handle Click Outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (onClose) onClose()
        setTimeout(() => setSelectedProject(null), 300) 
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <group position={[3, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={isMobile ? 0.7 : 0.9}> 
      
      <Html 
        transform 
        distanceFactor={isMobile ? 4 : 3} 
        style={{ 
          width: isMobile ? '360px' : '900px', 
          height: isMobile ? '550px' : '650px',
          opacity: isOpen ? 1 : 0.08, 
          filter: isOpen ? 'blur(0px)' : 'blur(4px)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'all 0.8s ease-in-out',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        
        {/* LIQUID GLASS UI */}
        <div 
            ref={wrapperRef}
            className="w-full h-full bg-[#0d0d0d]/70 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col ring-1 ring-white/5 relative"
        >
            
            {/* CLOSE BUTTON */}
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white/30 hover:text-white/100 transition-colors font-mono text-xl z-50 p-2 bg-black/20 rounded-full backdrop-blur-md"
            >
                X
            </button>

            <AnimatePresence mode="wait">
                {!selectedProject ? (
                    <motion.div 
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full p-6 md:p-12"
                    >
                        {/* HEADER */}
                        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4 flex-shrink-0">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">
                                PORTFOLIO
                                </h2>
                                <p className="text-neon font-mono text-[10px] md:text-xs tracking-[0.3em]">
                                /// SELECTED WORKS 2023-2025
                                </p>
                            </div>
                        </div>

                        {/* SCROLLABLE GRID */}
                        <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-4">
                                {PROJECTS.map((project, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setSelectedProject({ ...project, index: i })}
                                        className="relative rounded-xl overflow-hidden border border-white/10 hover:border-neon/50 transition-all duration-300 group cursor-pointer h-48 md:h-64 shadow-lg bg-black"
                                    >
                                        {/* OPTIMIZATION: Using a consistent image size/ID to ensure cache hit */}
                                        <img 
                                            src={`https://picsum.photos/id/${i + 80}/600/400`} 
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
                                            loading="eager"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10"></div>
                                        <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end z-20">
                                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter mb-1 drop-shadow-md">{project.title}</h3>
                                            <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest mb-2" style={{ color: project.color }}>
                                                /// {project.type}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4 z-30">
                                            <span className="text-white font-mono text-[10px] bg-black/50 border border-white/20 px-2 py-1 rounded backdrop-blur-md">
                                            REF_0{i+1}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* --- DETAIL VIEW (EXPANDED) --- */
                    <motion.div 
                        key="detail"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full w-full bg-[#0d0d0d] absolute inset-0 z-40"
                    >
                        {/* Big Image Area */}
                        <div className="w-full h-[55%] relative flex-shrink-0">
                            {/* OPTIMIZATION: Using EXACT SAME URL as grid to load from cache instantly */}
                            <img 
                                src={`https://picsum.photos/id/${selectedProject.index + 80}/600/400`} 
                                alt={selectedProject.title}
                                className="w-full h-full object-cover opacity-80"
                            />
                            {/* Gradient to blend image into dark background */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
                            
                            {/* BACK BUTTON */}
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 left-6 bg-black/40 hover:bg-neon hover:text-black text-white border border-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all font-mono text-xs tracking-widest flex items-center gap-2 z-50"
                            >
                                ← BACK
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-grow p-8 md:p-12 -mt-10 relative z-10 overflow-y-auto">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-white/10 pb-6 mb-6">
                                <div>
                                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
                                        {selectedProject.title}
                                    </h1>
                                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono tracking-widest" style={{ color: selectedProject.color }}>
                                        /// {selectedProject.type} PROJECT
                                    </span>
                                </div>
                                <div className="text-right hidden md:block">
                                     <span className="text-white/30 font-mono text-sm block">DATE</span>
                                     <span className="text-white font-mono text-sm">OCT 2024</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
                                <div className="md:col-span-2">
                                    <h3 className="text-white/50 text-xs font-mono tracking-widest mb-4">DESCRIPTION</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed font-light">
                                        {selectedProject.desc} 
                                        <br/><br/>
                                        This project pushed the boundaries of {selectedProject.type.toLowerCase()} production. 
                                        We utilized advanced rendering techniques combined with real-time motion capture.
                                    </p>
                                </div>
                                
                                <div className="bg-white/5 rounded-xl p-6 border border-white/5 h-fit">
                                    <h3 className="text-white/50 text-xs font-mono tracking-widest mb-4">DELIVERABLES</h3>
                                    <ul className="text-gray-400 text-sm space-y-2 font-mono">
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

        </div>
      </Html>
    </group>
  )
}