import { motion } from 'framer-motion';

// REGIONAL PRESENCE (6 STRATEGIC LOCATIONS)
const CLIENTS = [
  { name: "USA", industry: "MARKET" },
  { name: "QATAR", industry: "MARKET" },
  { name: "KSA", industry: "MARKET" },
  { name: "SWEDEN", industry: "MARKET" },
  { name: "LEBANON", industry: "MARKET" },
  { name: "JORDAN", industry: "HQ" }
];

// SELECTED 5-STAR REVIEWS (Validation of Speed & Quality)
const REVIEWS = [
  { text: "Yousef is a true professional. He understood our vision immediately and delivered high-end results that exceeded our expectations. The communication was seamless.", author: "Client via Freelancer.com", role: "5.0 ★★★★★" },
  { text: "Incredible attention to detail and very fast turnaround. He doesn't just execute; he adds creative value that improves the final product.", author: "Corporate Client", role: "5.0 ★★★★★" },
  { text: "Exceptional quality. We have worked with many freelancers, but Keyframe Global stands out for their technical precision and business logic.", author: "Verified Review", role: "5.0 ★★★★★" }
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
        className="relative w-full max-w-4xl max-h-[85vh] bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col" 
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
          
          {/* SECTION 1: GLOBAL FOOTPRINT */}
          <section>
            <h3 className="text-white/50 font-mono text-xs mb-6 uppercase tracking-widest">Global Footprint</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CLIENTS.map((client, i) => (
                <div key={i} className="h-24 bg-white/5 backdrop-blur-md rounded-lg flex flex-col items-center justify-center border border-white/5 hover:border-neon/30 hover:bg-white/10 transition-all cursor-default group">
                  <span className="text-white font-black text-xl group-hover:text-neon transition-colors tracking-wider">{client.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-[0.2em]">{client.industry}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: TESTIMONIALS */}
          <section>
            <h3 className="text-white/50 font-mono text-xs mb-6 uppercase tracking-widest">Incoming Transmissions</h3>
            <div className="grid grid-cols-1 gap-6">
              {REVIEWS.map((review, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md p-6 border-l-2 border-neon/50 rounded-r-lg hover:bg-white/10 transition-colors">
                  <p className="text-gray-300 italic mb-4 leading-relaxed">"{review.text}"</p>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">{review.author}</span>
                    <span className="text-neon font-mono text-[10px] tracking-wider">{review.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: VERIFICATION LINK */}
          <section className="flex justify-center pt-4 pb-4">
             <a 
               href="https://www.freelancer.com/u/YousefBa/Keyframe-Global" 
               target="_blank" 
               rel="noopener noreferrer"
               className="group flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
             >
                <div className="text-gray-400 font-mono text-[10px] tracking-[0.2em] group-hover:text-neon transition-colors">
                    [ ACCESS ENCRYPTED ARCHIVES ]
                </div>
                <div className="flex items-center gap-2 border-b border-neon/30 pb-1">
                    <span className="text-white font-bold text-sm">READ ALL 47+ 5-STAR REVIEWS ON FREELANCER.COM</span>
                    <svg className="w-3 h-3 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </div>
             </a>
          </section>

        </div>

      </motion.div>
    </div>
  );
}