import { motion } from 'framer-motion';

// MOCK DATA - Replace with real client info later
const CLIENTS = [
  { name: "TechNova", industry: "SaaS" },
  { name: "Velocorp", industry: "Automotive" },
  { name: "Al-Binaa", industry: "Construction" },
  { name: "Pure Flow", industry: "Beverage" },
  { name: "Jordan Start", industry: "Incubator" },
  { name: "Hyperion", industry: "Logistics" }
];

const REVIEWS = [
  { text: "Keyframe Global transformed our vague idea into a visual masterpiece. The ROI on the video ad was immediate.", author: "Sarah J., CEO of TechNova", role: "SERIES A STARTUP" },
  { text: "Professional, sharp, and incredibly fast. They don't just edit; they understand business strategy.", author: "Omar K., Marketing Director", role: "CORPORATE" },
  { text: "The branding package gave us the credibility we needed to pitch to international investors.", author: "Layla M., Founder", role: "ECOMMERCE" }
];

export default function Clients({ onBack }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
      
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl max-h-[85vh] liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl bg-black/90 flex flex-col border-t border-neon/20" 
      >
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6 flex-shrink-0">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">
              NETWORK
            </h2>
            <p className="text-neon font-mono text-xs tracking-[0.3em]">
              /// ALLIES & TRANSMISSIONS
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
          
          {/* SECTION 1: CLIENT LOGOS (Using text placeholders for now) */}
          <section>
            <h3 className="text-white/50 font-mono text-xs mb-6 uppercase tracking-widest">Deployments</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CLIENTS.map((client, i) => (
                <div key={i} className="h-24 bg-white/5 rounded-lg flex items-center justify-center border border-white/5 hover:border-neon/30 hover:bg-white/10 transition-all cursor-default group">
                  <span className="text-gray-400 font-bold group-hover:text-white transition-colors">{client.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: TESTIMONIALS */}
          <section>
            <h3 className="text-white/50 font-mono text-xs mb-6 uppercase tracking-widest">Incoming Transmissions</h3>
            <div className="grid grid-cols-1 gap-6">
              {REVIEWS.map((review, i) => (
                <div key={i} className="bg-gradient-to-r from-white/5 to-transparent p-6 border-l-2 border-neon/50">
                  <p className="text-gray-300 italic mb-4">"{review.text}"</p>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">{review.author}</span>
                    <span className="text-neon font-mono text-[10px] tracking-wider">{review.role}</span>
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