import { motion } from 'framer-motion';

const DATA = {
  cloud: {
    title: "KEYFRAME",
    subtitle: "SELECT A PROTOCOL",
    cards: []
  },
  ring: { // STUDIO
    title: "STUDIO",
    subtitle: "PRODUCTION & VFX",
    cards: [
      { title: "The Reel", desc: "4K Cinematic Showreel", col: "col-span-1 md:col-span-2" },
      { title: "Gear List", desc: "RED Komodo / Arri Alexa", col: "col-span-1" },
      { title: "Sound Design", desc: "Dolby Atmos Mixing", col: "col-span-1" },
      { title: "Color Grading", desc: "DaVinci Resolve HDR", col: "col-span-1 md:col-span-2" },
    ]
  },
  pyramid: { // STRATEGY
    title: "STRATEGY",
    subtitle: "GROWTH ARCHITECTURE",
    cards: [
      { title: "The Blueprint", desc: "Market Positioning Audit", col: "col-span-1 md:col-span-2" },
      { title: "Competitor Intel", desc: "Deep-dive Analysis", col: "col-span-1" },
      { title: "Growth Sprints", desc: "Weekly KPI Targets", col: "col-span-1" },
      { title: "Full Funnel", desc: "Acquisition to Retention", col: "col-span-1 md:col-span-2" },
    ]
  },
  icosahedron: { // DESIGN
    title: "DESIGN",
    subtitle: "VISUAL EVOLUTION",
    cards: [
      { title: "Identity System", desc: "Logo, Type, Color Theory", col: "col-span-1 md:col-span-2" },
      { title: "UI/UX", desc: "Figma Prototypes", col: "col-span-1" },
      { title: "Motion Assets", desc: "Lottie & Rive Animation", col: "col-span-1" },
      { title: "Brand Guidelines", desc: "The Visual Bible", col: "col-span-1 md:col-span-2" },
    ]
  },
  sphere: { // GLOBAL
    title: "GLOBAL",
    subtitle: "WORLDWIDE NETWORK",
    cards: [
      { title: "Remote Teams", desc: "24/7 Production Cycle", col: "col-span-2" },
      { title: "Localization", desc: "Multi-language Assets", col: "col-span-1" },
      { title: "Cloud Sync", desc: "Instant Asset Delivery", col: "col-span-1" },
      { title: "Partners", desc: "Global Studio Network", col: "col-span-2" },
    ]
  }
};

export default function Dashboard({ shape, onBack }) {
  const content = DATA[shape] || DATA.cloud;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-3xl liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl bg-black/80"
      >
        
        <button 
          onClick={onBack}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors group"
        >
          <span className="text-gray-500 group-hover:text-neon font-mono text-xl">✕</span>
        </button>

        <div className="mb-8 border-b border-white/10 pb-6">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
            {content.title}
          </h2>
          <p className="text-neon font-mono text-xs md:text-sm tracking-[0.3em]">
            /// {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {content.cards && content.cards.map((card, i) => (
            <div
              key={i}
              className={`${card.col} bg-white/5 border border-white/5 p-6 rounded-xl hover:border-neon/30 transition-colors group cursor-pointer`}
            >
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-neon transition-colors">{card.title}</h3>
              <p className="text-gray-400 font-mono text-[10px] leading-relaxed">{card.desc}</p>
            </div>
          ))}
          
          {content.cards && content.cards.length === 0 && (
             <div className="col-span-3 text-center py-12 text-gray-500 font-mono text-xs">
                PLEASE SELECT A MODULE FROM THE CONTROLLER
             </div>
          )}
        </div>

      </motion.div>
    </div>
  );
}