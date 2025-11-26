import { motion } from 'framer-motion';

// MOCK DATA - Replace with your actual work later
const PROJECTS = [
  { title: "Neon Runner", category: "COMMERCIAL", type: "video" },
  { title: "Apex Architecture", category: "WEB DESIGN", type: "image" },
  { title: "Cyber Brew", category: "BRANDING", type: "image" },
  { title: "Velocity 2.0", category: "MOTION GRAPHICS", type: "video" },
  { title: "Echo Fashion", category: "CAMPAIGN", type: "video" },
  { title: "Orbital Tech", category: "UI/UX", type: "image" }
];

const Card = motion.div;

export default function Portfolio({ onBack }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
      
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-5xl h-[80vh] liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl bg-black/80 flex flex-col" 
      >
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6 flex-shrink-0">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
              PORTFOLIO
            </h2>
            <p className="text-neon font-mono text-xs md:text-sm tracking-[0.3em]">
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

        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar flex-grow">
          {PROJECTS.map((project, i) => (
            <Card
              key={i}
              whileHover={{ opacity: 0.8 }}
              className="relative aspect-video bg-white/5 border border-white/5 rounded-xl overflow-hidden group cursor-pointer"
            >
              {/* Placeholder for Media */}
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 group-hover:bg-neutral-800 transition-colors">
                 <span className="text-gray-600 font-mono text-xs">{project.type === 'video' ? '▶ VIDEO' : '🖼 IMAGE'}</span>
              </div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <p className="text-neon font-mono text-[10px] tracking-widest">{project.category}</p>
              </div>
            </Card>
          ))}
        </div>

      </motion.div>
    </div>
  );
}