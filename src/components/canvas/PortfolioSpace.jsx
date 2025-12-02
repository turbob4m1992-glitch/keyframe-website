import { Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

const PROJECTS = [
  { 
    title: "VIDEO PRODUCTION", 
    type: "POST-PRODUCTION", 
    image: "/portfolio-final-cut.webp",
    desc: "High-end narrative architecture. A zero-latency workflow managing complex 4K/8K timelines, HDR color science, and immersive audio mastering.",
    longDesc: "This service pushes the boundaries of visual storytelling. We utilize industry-standard Final Cut Pro workflows combined with advanced motion graphics and sound design to create seamless, high-energy visual experiences that retain audience attention.",
    deliverables: ["4K Master Render", "Social Media Cuts", "Sound Design & Mixing", "Color Grading"],
    color: "#FF0055" 
  },
  { 
    title: "CORPORATE BRANDING", 
    type: "VISUAL SYSTEMS", 
    image: "/portfolio-catalog.webp",
    desc: "Strategic corporate design. Translating complex business capabilities into sleek, modern digital and print profiles for international stakeholders.",
    longDesc: "This service elevates your market presence through cohesive design. We utilize precision typography and grid systems to create authoritative company profiles, catalogs, and brand assets that establish immediate trust with your clients.",
    deliverables: ["Brand Guidelines", "Company Profile (PDF)", "Print-Ready Assets", "Digital Stationery"],
    color: "#00E0FF" 
  },
  { 
    title: "STRATEGY & GROWTH", 
    type: "DATA INTELLIGENCE", 
    image: "/portfolio-strategy.webp",
    desc: "Data-driven creative architecture. Leveraging real-time analytics and user behavior heatmaps to engineer high-conversion visual systems.",
    longDesc: "We don't just make things look good; we make them perform. By integrating proprietary behavioral modeling protocols, we track user engagement down to the millisecond, allowing us to iterate creative assets in real-time for maximum market penetration.",
    deliverables: ["Growth Strategy Roadmap", "User Behavior Analytics", "Conversion Optimization", "ROI Performance Reports"],
    color: "#FFB800" 
  },
  { 
    title: "DIGITAL ARCHITECTURE", 
    type: "SYSTEM DESIGN", 
    image: null, 
    desc: "The interface you are navigating is the ultimate demonstration. A bespoke digital ecosystem engineered for zero-latency interaction.",
    longDesc: "Static screenshots cannot capture the weight of a true digital experience. We reject templates to engineer living, breathing web environments from the ground up. This platform is a testament to what happens when visual design meets uncompromising code architecture.",
    deliverables: ["Bespoke Web Architecture", "Spatial UI Design", "Performance Engineering", "SEO Optimization"],
    color: "#D400FF" 
  }
];

export default function PortfolioSpace({ isOpen, onClose }) {
  const { size } = useThree()
  const isMobile = size.width < 768
  const wrapperRef = useRef()
  
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setSelectedProject(null)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    function handleClickOutside(event) {
      if (isMobile) return 

      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (onClose) onClose()
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isOpen, onClose, isMobile])

  return (
    <group 
      position={isMobile ? [0, 0, 0] : [3, 0, 0]} 
      rotation={[0, Math.PI / 2, 0]} 
      scale={1} 
    > 
      <Html 
        transform 
        distanceFactor={isMobile ? 1.5 : 3}
        zIndexRange={[100, 0]} 
        style={{ 
          width: isMobile ? '90vw' : '900px', 
          height: isMobile ? '80vh' : '650px',
          opacity: isOpen ? 1 : 0.08, 
          filter: isOpen ? 'blur(0px)' : 'blur(4px)',
          pointerEvents: isOpen ? 'auto' : 'none', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.8s ease-in-out',
        }}
      >
        
        {/* MAIN WRAPPER: Transparent */}
        <div 
            ref={wrapperRef}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerMove={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent flex flex-col relative"
        >
            
            {/* CLOSE BUTTON */}
            <button 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors font-mono text-xl z-[60] p-4 bg-black/40 rounded-full backdrop-blur-md cursor-pointer border border-white/10"
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
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar p-4 md:p-12"
                    >
                        
                        {/* 1. DARK THEME CONTAINER (Header + 3 Main Cards) */}
                        {/* UPDATED: bg-[#0d0d0d]/85 as requested */}
                        <div className="bg-[#0d0d0d]/85 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 mb-6 shadow-2xl">
                            
                            {/* HEADER */}
                            <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4 flex-shrink-0">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">
                                    PORTFOLIO
                                    </h2>
                                    <p className="text-neon font-mono text-[10px] md:text-xs tracking-[0.3em]">
                                    /// SELECTED SERVICES
                                    </p>
                                </div>
                            </div>

                            {/* GRID FOR CARDS 1-3 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {PROJECTS.slice(0, 3).map((project, i) => (
                                    <div 
                                        key={i} 
                                        onClick={(e) => { e.stopPropagation(); setSelectedProject({ ...project, index: i }); }}
                                        className="relative rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer shadow-lg aspect-video border border-white/10 hover:border-neon/50 bg-black"
                                    >
                                        <img 
                                            src={project.image} 
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                                            loading="eager"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10"></div>
                                        <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end z-20">
                                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter mb-1 drop-shadow-md">{project.title}</h3>
                                            <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest mb-2" style={{ color: project.color }}>
                                                /// {project.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. TRANSPARENT CONTAINER (Card 4) */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); setSelectedProject({ ...PROJECTS[3], index: 3 }); }}
                            className="w-full border border-white/40 hover:border-white transition-all duration-300 rounded-3xl p-8 md:p-12 cursor-pointer group relative overflow-hidden bg-transparent min-h-[250px] flex flex-col justify-between"
                        >
                            {/* CENTER TEXT - PUSHED UP */}
                            <div className="absolute inset-0 flex items-center justify-center z-0 pb-32">
                                <h3 className="text-2xl md:text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors tracking-tighter italic select-none text-center px-4">
                                "PROOF OF PERFORMANCE"
                                </h3>
                            </div>

                            {/* BOTTOM OVERLAY */}
                            <div className="relative z-10 mt-auto">
                                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">
                                    DIGITAL ARCHITECTURE
                                </h3>
                                <span 
                                    className="inline-block px-2 py-1 border rounded text-[10px] md:text-xs font-mono font-bold tracking-widest"
                                    style={{ color: "#D400FF", borderColor: "rgba(212, 0, 255, 0.3)" }}
                                >
                                    /// SYSTEM DESIGN
                                </span>
                            </div>
                        </div>

                    </motion.div>
                ) : (
                    // --- DETAIL VIEW ---
                    <motion.div 
                        key="detail"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 z-40 bg-transparent flex flex-col"
                    >
                        <div 
                            className="w-full h-full overflow-y-auto relative custom-scrollbar"
                            style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}
                        >
                            
                            {/* IMAGE AREA */}
                            <div className={`sticky top-0 left-0 w-full z-0 aspect-video max-h-[60vh] flex items-center justify-center overflow-hidden ${selectedProject.image ? 'bg-black' : 'bg-transparent'}`}>
                                {selectedProject.image ? (
                                    <>
                                        <img 
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            className="w-full h-full object-cover opacity-80"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent z-10"></div>
                                    </>
                                ) : (
                                    // LOGO WATERMARK
                                    <div className="w-full h-full flex items-center justify-center relative">
                                        <img 
                                            src="/logo.svg" 
                                            alt="Keyframe Logo" 
                                            className="w-48 md:w-64 opacity-20"
                                        />
                                    </div>
                                )}

                                <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                                    className="absolute top-6 left-6 bg-black/40 hover:bg-neon hover:text-black text-white border border-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all font-mono text-xs tracking-widest flex items-center gap-2 z-50 cursor-pointer"
                                >
                                    ← BACK
                                </button>
                            </div>

                            {/* TEXT CONTENT */}
                            <div className="relative z-20 -mt-24 md:-mt-6 px-4 md:px-0 pb-12">
                                <div className="bg-[#0d0d0d]/80 backdrop-blur-xl border-t border-white/10 rounded-t-3xl p-6 md:p-12 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]">
                                    
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-white/10 pb-6 mb-6">
                                        <div>
                                            <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter mb-2">
                                                {selectedProject.title}
                                            </h1>
                                            <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono tracking-widest" style={{ color: selectedProject.color }}>
                                                /// {selectedProject.type}
                                            </span>
                                        </div>
                                        <div className="text-right hidden md:block">
                                            <span className="text-white/30 font-mono text-sm block">AVAILABLE</span>
                                            <span className="text-white font-mono text-sm">2025</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="md:col-span-2">
                                            <h3 className="text-white/50 text-xs font-mono tracking-widest mb-4">SERVICE DESCRIPTION</h3>
                                            <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-light">
                                                {selectedProject.desc} 
                                                <br/><br/>
                                                {selectedProject.longDesc}
                                            </p>
                                        </div>
                                        
                                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 h-fit">
                                            <h3 className="text-white/50 text-xs font-mono tracking-widest mb-4">DELIVERABLES</h3>
                                            <ul className="text-gray-400 text-sm space-y-2 font-mono">
                                                {selectedProject.deliverables.map((item, index) => (
                                                    <li key={index}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
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