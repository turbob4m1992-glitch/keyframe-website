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

export default function PortfolioSpace({ isOpen, onClose }) {
  const { size } = useThree()
  const isMobile = size.width < 768
  const wrapperRef = useRef()
  
  const [selectedProject, setSelectedProject] = useState(null)

  // Reset to main grid when portfolio is closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setSelectedProject(null)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Handle Click Outside
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
        
        {/* UI CONTAINER */}
        <div 
            ref={wrapperRef}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerMove={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="w-full h-full bg-[#0d0d0d]/90 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col ring-1 ring-white/5 relative"
        >
            
            {/* CLOSE BUTTON */}
            <button 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors font-mono text-xl z-[60] p-4 bg-black/20 rounded-full backdrop-blur-md cursor-pointer"
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
                        className="flex flex-col h-full p-4 md:p-12"
                    >
                        {/* HEADER */}
                        <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4 flex-shrink-0">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">
                                PORTFOLIO
                                </h2>
                                <p className="text-neon font-mono text-[10px] md:text-xs tracking-[0.3em]">
                                /// SELECTED SERVICES
                                </p>
                            </div>
                        </div>

                        {/* SCROLLABLE GRID */}
                        <div 
                            className="overflow-y-auto pr-2 custom-scrollbar flex-grow"
                            style={{ 
                                touchAction: 'pan-y', 
                                WebkitOverflowScrolling: 'touch' 
                            }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-4">
                                {PROJECTS.map((project, i) => (
                                    <div 
                                        key={i} 
                                        onClick={(e) => { e.stopPropagation(); setSelectedProject({ ...project, index: i }); }}
                                        className="relative rounded-xl overflow-hidden border border-white/10 hover:border-neon/50 transition-all duration-300 group cursor-pointer aspect-video shadow-lg bg-black"
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
                    </motion.div>
                ) : (
                    // --- DETAIL VIEW (PARALLAX SCROLL) ---
                    <motion.div 
                        key="detail"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 z-40 bg-[#0d0d0d] flex flex-col"
                    >
                        {/* Scroll Container */}
                        <div 
                            className="w-full h-full overflow-y-auto relative custom-scrollbar"
                            style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}
                        >
                            
                            {/* 1. STICKY IMAGE HEADER */}
                            {/* Sticky ensures it stays at the top while text scrolls over it */}
                            <div className="sticky top-0 left-0 w-full z-0 aspect-video max-h-[60vh] bg-black">
                                <img 
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    // 'object-cover' ensures full bleed, 'aspect-video' ensures correct shape
                                    className="w-full h-full object-cover opacity-80"
                                />
                                
                                {/* The "Black Fade" Overlay (Visible at bottom of image) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent z-10"></div>

                                {/* BACK BUTTON (Fixed position relative to image) */}
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                                    className="absolute top-6 left-6 bg-black/40 hover:bg-neon hover:text-black text-white border border-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all font-mono text-xs tracking-widest flex items-center gap-2 z-50 cursor-pointer"
                                >
                                    ← BACK
                                </button>
                            </div>

                            {/* 2. TEXT CONTENT (Scrolls UP over the image) */}
                            {/* Negative margin pulls it up to overlap the image initially */}
                            <div className="relative z-20 -mt-24 md:-mt-4 px-4 md:px-0 pb-12">
                                
                                {/* Text Container Background */}
                                <div className="bg-[#0d0d0d]/35 backdrop-blur-xl border-t border-white/10 rounded-t-3xl p-6 md:p-12 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]">
                                    
                                    {/* Content Header */}
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

                                    {/* Text Grid */}
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