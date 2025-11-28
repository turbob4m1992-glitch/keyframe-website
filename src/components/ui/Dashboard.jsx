import { motion } from 'framer-motion';

const DATA = {
  cloud: {
    title: "CONTACT",
    subtitle: "INITIATE DIRECT CONNECTION",
    cards: [
      { title: "EMAIL", desc: "PROJECTS & INQUIRIES: YOUR_EMAIL@EXAMPLE.COM", col: "col-span-3" },
      { title: "SCHEDULER", desc: "BOOK A FREE CONSULTATION", col: "col-span-2" },
      { title: "LINKEDIN", desc: "CONNECT PROFESSIONALLY", col: "col-span-1" }
    ]
  },
  ring: { // STUDIO
    title: "STUDIO",
    subtitle: "PRODUCTION & VFX",
    cards: [
      { title: "The Reel", desc: "Cine-Grade 4K Showreel", detail: "Immersive, cinema-quality visuals.", col: "col-span-1 md:col-span-2" },
      { title: "Gear List", desc: "Arri Alexa, RED Komodo", detail: "High-end camera packages.", col: "col-span-1" },
      { title: "Sound Design", desc: "Dolby Atmos Mixing", detail: "Full soundscapes that drive emotion.", col: "col-span-1" },
      { title: "Color Grading", desc: "HDR Cinema Finish", detail: "Premium, distinct cinematic looks.", col: "col-span-1 md:col-span-2" },
    ]
  },
  pyramid: { // STRATEGY
    title: "STRATEGY",
    subtitle: "GROWTH ARCHITECTURE",
    cards: [
      { title: "The Blueprint", desc: "Precision Market Positioning", detail: "Maximum market penetration.", col: "col-span-1 md:col-span-2" },
      { title: "Competitor Intel", desc: "Deep-Dive Analysis", detail: "Decoding the market.", col: "col-span-1" },
      { title: "Growth Sprints", desc: "Agile KPI Targeting", detail: "Weekly velocity.", col: "col-span-1" },
      { title: "Full Funnel", desc: "Acquisition to Retention", detail: "Assets that capture leads.", col: "col-span-1 md:col-span-2" },
    ]
  },
  icosahedron: { // DESIGN
    title: "DESIGN",
    subtitle: "VISUAL EVOLUTION",
    cards: [
      { title: "Identity System", desc: "Magnetic Logo & Type", detail: "Unique, scalable visual identities.", col: "col-span-1 md:col-span-2" },
      { title: "UI/UX", desc: "Figma Prototypes", detail: "Intuitive flow and user conversion.", col: "col-span-1" },
      { title: "Motion Assets", desc: "Lottie & Rive", detail: "Lightweight, performant motion.", col: "col-span-1" },
      { title: "Brand Guidelines", desc: "Definitive Visual Bible", detail: "Consistent touchpoints.", col: "col-span-1 md:col-span-2" },
    ]
  },
  sphere: { // GLOBAL
    title: "GLOBAL",
    subtitle: "WORLDWIDE NETWORK",
    cards: [
      { title: "Remote Teams", desc: "24/7 Production Cycle", col: "col-span-2", detail: "Utilize global talent for speed." },
      { title: "Localization", desc: "Cultural Adaptation", col: "col-span-1", detail: "Regional market relevance." },
      { title: "Cloud Sync", desc: "Zero-Latency Delivery", col: "col-span-1", detail: "Instant asset delivery." },
      { title: "Partners", desc: "Elite Network Access", col: "col-span-2", detail: "Vetted international collaborators." },
    ]
  }
};

const Card = motion.div;

export default function Dashboard({ shape, onBack }) {
  const content = DATA[shape] || DATA.cloud;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
      
      <motion.div 
        onClick={(e) => e.stopPropagation()} 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5 }}
        // FIXED: Used bg-black/40 to ensure translucency (Liquid Glass)
        className="relative w-full max-w-3xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl" 
      >
        
        <button 
          onClick={onBack}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors group"
        >
          <span className="text-gray-500 group-hover:text-neon font-mono text-xl">X</span> 
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
            <Card
              key={i}
              whileHover={{ opacity: 0.8 }} 
              whileTap={{ scale: 0.98 }}
              className={`${card.col} relative bg-white/5 backdrop-blur-md border border-white/5 p-4 rounded-xl hover:border-neon/30 transition-colors group cursor-pointer`}
            >
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-neon transition-colors">{card.title}</h3>
              <p className="text-gray-400 font-mono text-[10px] leading-relaxed">{card.desc}</p>
            </Card>
          ))}
          
          {content.cards && content.cards.length === 0 && (
             <div className="col-span-3 text-center py-12 text-neon/80 font-mono text-xs tracking-widest animate-pulse">
                // SELECT A MODULE FROM THE CORE TO BEGIN //
             </div>
          )}
        </div>

      </motion.div>
    </div>
  );
}