import { motion } from 'framer-motion';

const DATA = {
  cloud: {
    title: "CONTACT",
    subtitle: "INITIATE DIRECT CONNECTION",
    // No main CTA for cloud, as the cards are the links
    cards: [
      { 
        title: "EMAIL", 
        label: "PROJECTS & INQUIRIES", 
        linkDisplay: "yousef@keyframeglobal.com", 
        url: "mailto:yousef@keyframeglobal.com", 
        col: "col-span-1 md:col-span-3" 
      },
      { 
        title: "SCHEDULER", 
        label: "BOOK A FREE CONSULTATION", 
        linkDisplay: "calendly.com/keyframeglobal", 
        url: "https://calendly.com/keyframeglobal/30min", 
        col: "col-span-1 md:col-span-2" 
      },
      { 
        title: "FREELANCER", 
        label: "CONNECT PROFESSIONALLY", 
        linkDisplay: "freelancer.com/u/YousefBa", 
        url: "https://www.freelancer.com/u/YousefBa/Keyframe-Global", 
        col: "col-span-1" 
      }
    ]
  },
  ring: { // STUDIO
    title: "STUDIO",
    subtitle: "PRODUCTION & VFX",
    cta: {
      text: "START PRODUCTION",
      link: "mailto:yousef@keyframeglobal.com?subject=Inquiry: Studio Services"
    },
    cards: [
      { title: "Narrative Post", desc: "Story-Driven Editing", detail: "Precision cutting that shapes the narrative arc.", col: "col-span-1 md:col-span-2" },
      { title: "Visual Effects", desc: "Seamless Compositing", detail: "High-fidelity digital enhancements & cleanups.", col: "col-span-1" },
      { title: "Color Grading", desc: "Cinematic Finishing", detail: "Distinct color science for mood and impact.", col: "col-span-1" },
      { title: "Sound Design", desc: "Immersive Audio", detail: "Sonic texturing that drives emotional response.", col: "col-span-1 md:col-span-2" },
    ]
  },
  pyramid: { // STRATEGY
    title: "STRATEGY",
    subtitle: "GROWTH ARCHITECTURE",
    cta: {
      text: "BUILD STRATEGY",
      link: "mailto:yousef@keyframeglobal.com?subject=Inquiry: Strategy & Growth"
    },
    cards: [
      { title: "Brand Positioning", desc: "Market Distinction", detail: "Defining your unique voice in the noise.", col: "col-span-1 md:col-span-2" },
      { title: "Content Roadmaps", desc: "Asset Deployment", detail: "Strategic planning for long-term engagement.", col: "col-span-1" },
      { title: "Audience Intel", desc: "Data-Driven Insights", detail: "Deep decoding of your target customer base.", col: "col-span-1" },
      { title: "Campaign Sprints", desc: "High-Velocity Plans", detail: "Rapid execution frameworks for quick wins.", col: "col-span-1 md:col-span-2" },
    ]
  },
  icosahedron: { // DESIGN
    title: "DESIGN",
    subtitle: "VISUAL EVOLUTION",
    cta: {
      text: "START DESIGN",
      link: "mailto:yousef@keyframeglobal.com?subject=Inquiry: Design Project"
    },
    cards: [
      { title: "Web Architecture", desc: "Interactive Experiences", detail: "Code-driven, responsive digital environments.", col: "col-span-1 md:col-span-2" },
      { title: "Visual Identity", desc: "Brand Systems", detail: "Logo marks and typography that define brands.", col: "col-span-1" },
      { title: "UI/UX Prototypes", desc: "User Flow", detail: "Intuitive interfaces designed for conversion.", col: "col-span-1" },
      { title: "Motion Graphics", desc: "Kinetic Assets", detail: "Dynamic animation for modern storytelling.", col: "col-span-1 md:col-span-2" },
    ]
  },
  sphere: { // GLOBAL
    title: "GLOBAL",
    subtitle: "WORLDWIDE NETWORK",
    cta: {
      text: "JOIN NETWORK",
      link: "mailto:yousef@keyframeglobal.com?subject=Inquiry: Global Network"
    },
    cards: [
      { title: "Remote Scaling", desc: "24/7 Cycles", detail: "Distributed teams for non-stop production.", col: "col-span-1 md:col-span-2" },
      { title: "Localization", desc: "Cultural Adaptation", detail: "Translating assets for regional relevance.", col: "col-span-1" },
      { title: "Cloud Workflows", desc: "Zero-Latency", detail: "Instant asset synchronization and delivery.", col: "col-span-1" },
      { title: "Staff Augmentation", desc: "Elite Talent", detail: "Injecting vetted experts into your workflow.", col: "col-span-1 md:col-span-2" },
    ]
  }
};

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
        className="relative w-full max-w-3xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col max-h-[90vh]" 
      >
        
        <button 
          onClick={onBack}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors group z-20"
        >
          <span className="text-gray-500 group-hover:text-neon font-mono text-xl">X</span> 
        </button>

        <div className="mb-8 border-b border-white/10 pb-6 shrink-0">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
            {content.title}
          </h2>
          <p className="text-neon font-mono text-xs md:text-sm tracking-[0.3em]">
            /// {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {content.cards && content.cards.map((card, i) => {
            // Logic: If it has a URL, it's a link (motion.a), otherwise a div (motion.div)
            const CardComponent = card.url ? motion.a : motion.div;
            
            return (
              <CardComponent
                key={i}
                href={card.url || undefined}
                target={card.url ? (card.title === "EMAIL" ? "_self" : "_blank") : undefined}
                rel={card.url ? "noopener noreferrer" : undefined}
                whileHover={{ opacity: 0.8 }} 
                whileTap={{ scale: 0.98 }}
                className={`${card.col} relative bg-white/5 backdrop-blur-md border border-white/5 p-4 rounded-xl hover:border-neon/30 transition-colors group cursor-pointer block`}
              >
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-neon transition-colors">{card.title}</h3>
                
                {/* Conditional Content Rendering: Contact Links vs Standard Cards */}
                {card.url ? (
                  <>
                    <p className="text-xs text-gray-500 font-mono mb-2">{card.label}</p>
                    <span className="text-neon text-[10px] md:text-xs font-mono border-b border-neon/30 pb-0.5">{card.linkDisplay}</span>
                  </>
                ) : (
                  <>
                    <p className="text-white/80 font-medium text-sm mb-1">{card.desc}</p>
                    <p className="text-gray-500 font-mono text-[10px] leading-relaxed">{card.detail}</p>
                  </>
                )}
              </CardComponent>
            );
          })}
          
          {content.cards && content.cards.length === 0 && (
             <div className="col-span-3 text-center py-12 text-neon/80 font-mono text-xs tracking-widest animate-pulse">
                // SELECT A MODULE FROM THE CORE TO BEGIN //
             </div>
          )}
        </div>

        {/* BOTTOM CTA BUTTON - Only renders if the section has a CTA object */}
        {content.cta && (
            <div className="mt-6 pt-6 border-t border-white/10 flex justify-center shrink-0">
                <motion.a 
                    href={content.cta.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-3 bg-neon/10 hover:bg-neon/20 border border-neon/50 rounded-full text-neon font-mono text-sm tracking-widest uppercase transition-all flex items-center gap-3"
                >
                    <span>{content.cta.text}</span>
                    <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                </motion.a>
            </div>
        )}

      </motion.div>
    </div>
  );
}