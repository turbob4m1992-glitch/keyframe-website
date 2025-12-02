import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const DATA = {
  cloud: {
    title: "CONTACT",
    subtitle: "INITIATE DIRECT CONNECTION",
    type: "link", 
    color: "#CCFF00", // Neon Green
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
        title: "DIRECT LINE", 
        label: "PRIORITY ACCESS", 
        linkDisplay: "+962 791 6565 55", 
        url: "tel:+962791656555", 
        col: "col-span-1" 
      }
    ]
  },
  ring: { // STUDIO
    title: "STUDIO",
    subtitle: "PRODUCTION & VFX",
    type: "configurator", 
    color: "#FF0055", // Neon Crimson
    baseSubject: "Inquiry: Studio Services",
    cards: [
      { id: "narrative", title: "Narrative Post", desc: "Story-Driven Editing", detail: "Precision cutting that shapes the narrative arc.", col: "col-span-1 md:col-span-2" },
      { id: "vfx", title: "Visual Effects", desc: "Seamless Compositing", detail: "High-fidelity digital enhancements & cleanups.", col: "col-span-1" },
      { id: "color", title: "Color Grading", desc: "Cinematic Finishing", detail: "Distinct color science for mood and impact.", col: "col-span-1" },
      { id: "sound", title: "Sound Design", desc: "Immersive Audio", detail: "Sonic texturing that drives emotional response.", col: "col-span-1 md:col-span-2" },
    ]
  },
  pyramid: { // STRATEGY
    title: "STRATEGY",
    subtitle: "GROWTH ARCHITECTURE",
    type: "configurator",
    color: "#FFB800", // Neon Amber
    baseSubject: "Inquiry: Strategy & Growth",
    cards: [
      { id: "positioning", title: "Brand Positioning", desc: "Market Distinction", detail: "Defining your unique voice in the noise.", col: "col-span-1 md:col-span-2" },
      { id: "roadmap", title: "Content Roadmaps", desc: "Asset Deployment", detail: "Strategic planning for long-term engagement.", col: "col-span-1" },
      { id: "intel", title: "Audience Intel", desc: "Data-Driven Insights", detail: "Deep decoding of your target customer base.", col: "col-span-1" },
      { id: "sprints", title: "Campaign Sprints", desc: "High-Velocity Plans", detail: "Rapid execution frameworks for quick wins.", col: "col-span-1 md:col-span-2" },
    ]
  },
  icosahedron: { // DESIGN
    title: "DESIGN",
    subtitle: "VISUAL EVOLUTION",
    type: "configurator",
    color: "#00E0FF", // Neon Cyan
    baseSubject: "Inquiry: Design Project",
    cards: [
      { id: "web", title: "Web Architecture", desc: "Interactive Experiences", detail: "Code-driven, responsive digital environments.", col: "col-span-1 md:col-span-2" },
      { id: "identity", title: "Visual Identity", desc: "Brand Systems", detail: "Logo marks and typography that define brands.", col: "col-span-1" },
      { id: "uiux", title: "UI/UX Prototypes", desc: "User Flow", detail: "Intuitive interfaces designed for conversion.", col: "col-span-1" },
      { id: "motion", title: "Motion Graphics", desc: "Kinetic Assets", detail: "Dynamic animation for modern storytelling.", col: "col-span-1 md:col-span-2" },
    ]
  },
  sphere: { // GLOBAL
    title: "GLOBAL",
    subtitle: "WORLDWIDE NETWORK",
    type: "configurator",
    color: "#D400FF", // Electric Purple
    baseSubject: "Inquiry: Global Network",
    cards: [
      { id: "scaling", title: "Remote Scaling", desc: "24/7 Cycles", detail: "Distributed teams for non-stop production.", col: "col-span-1 md:col-span-2" },
      { id: "local", title: "Localization", desc: "Cultural Adaptation", detail: "Translating assets for regional relevance.", col: "col-span-1" },
      { id: "cloud", title: "Cloud Workflows", desc: "Zero-Latency", detail: "Instant asset synchronization and delivery.", col: "col-span-1" },
      { id: "staff", title: "Staff Augmentation", desc: "Elite Talent", detail: "Injecting vetted experts into your workflow.", col: "col-span-1 md:col-span-2" },
    ]
  }
};

export default function Dashboard({ shape, onBack }) {
  const content = DATA[shape] || DATA.cloud;
  const isConfigurator = content.type === "configurator";
  
  // STATE: Track selected items
  const [selected, setSelected] = useState([]);

  // Reset selection when opening a new shape
  useEffect(() => {
    setSelected([]);
  }, [shape]);

  // Toggle Function
  const toggleSelection = (itemTitle) => {
    if (selected.includes(itemTitle)) {
      setSelected(selected.filter(i => i !== itemTitle));
    } else {
      setSelected([...selected, itemTitle]);
    }
  };

  // Generate Dynamic Mailto Link
  const getDynamicCta = () => {
    if (!isConfigurator) return null;

    const count = selected.length;
    let buttonText = `START ${content.title}`;
    let mailBody = `Hi Keyframe,%0D%0A%0D%0AI'm interested in ${content.title} services.`;

    if (count > 0) {
      buttonText = `START ${content.title} (${count}) →`;
      const items = selected.join(', ');
      mailBody = `Hi Keyframe,%0D%0A%0D%0AI am interested in starting a project involving the following modules:%0D%0A- ${items}%0D%0A%0D%0AMy estimated timeline is:%0D%0A`;
    }

    const mailLink = `mailto:yousef@keyframeglobal.com?subject=${content.baseSubject}&body=${mailBody}`;
    return { text: buttonText, link: mailLink };
  };

  const dynamicCta = getDynamicCta();

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
      
      <motion.div 
        onClick={(e) => e.stopPropagation()} 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5 }}
        // UPDATED: bg-[#0d0d0d]/75 to match Portfolio container
        className="relative w-full max-w-3xl bg-[#0d0d0d]/55 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col max-h-[90vh]" 
      >
        
        <button 
          onClick={onBack}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors group z-20"
        >
          <span className="text-gray-500 group-hover:text-white font-mono text-xl">X</span> 
        </button>

        <div className="mb-8 border-b border-white/10 pb-6 shrink-0">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
            {content.title}
          </h2>
          <p className="font-mono text-xs md:text-sm tracking-[0.3em]" style={{ color: content.color }}>
            /// {content.subtitle}
          </p>
        </div>

        {/* GRID CONTENT - ADDED PADDING (p-2) TO FIX CLIPPING */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto p-2 custom-scrollbar pb-4">
          {content.cards && content.cards.map((card, i) => {
            const isSelected = selected.includes(card.title);
            const CardComponent = !isConfigurator ? motion.a : motion.div;
            
            return (
              <CardComponent
                key={i}
                href={!isConfigurator ? card.url : undefined}
                target={!isConfigurator && card.url ? (card.title === "EMAIL" ? "_self" : "_blank") : undefined}
                rel={!isConfigurator && card.url ? "noopener noreferrer" : undefined}
                onClick={isConfigurator ? () => toggleSelection(card.title) : undefined}
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.98 }}
                
                // ORIGINAL BACKGROUND STYLE: bg-white/5 backdrop-blur-md
                className={`
                  ${card.col} relative p-4 rounded-xl border transition-all duration-300 group cursor-pointer block hover:z-10 backdrop-blur-md
                  ${isSelected 
                    ? `shadow-[0_0_20px_rgba(255,255,255,0.05)]` 
                    : "bg-white/5 border-white/5 hover:border-white/30"
                  }
                `}
                // Inline style for active color
                style={isSelected ? { borderColor: content.color, backgroundColor: `${content.color}15` } : {}}
              >
                <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-lg font-bold transition-colors ${isSelected ? "text-white" : "text-white group-hover:text-white"}`}>
                        {card.title}
                    </h3>
                    {/* Selection Dot */}
                    {isConfigurator && (
                        <div 
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-30"}`}
                            style={{ backgroundColor: content.color, boxShadow: `0 0 10px ${content.color}` }}
                        />
                    )}
                </div>
                
                {!isConfigurator ? (
                  // Contact Links
                  <>
                    <p className="text-xs text-gray-500 font-mono mb-2">{card.label}</p>
                    <span 
                        className="text-[10px] md:text-xs font-mono border-b pb-0.5 transition-colors"
                        style={{ color: content.color, borderColor: `${content.color}40` }}
                    >
                        {card.linkDisplay}
                    </span>
                  </>
                ) : (
                  // Configurator Items
                  <>
                     <p className="font-medium text-sm mb-1 transition-colors" style={{ color: isSelected ? content.color : 'rgba(255,255,255,0.8)' }}>
                        {card.desc}
                    </p>
                    <p className="text-gray-500 font-mono text-[10px] leading-relaxed">{card.detail}</p>
                  </>
                )}
              </CardComponent>
            );
          })}
        </div>

        {/* DYNAMIC CTA BUTTON */}
        {isConfigurator && (
            <div className="mt-6 pt-6 border-t border-white/10 flex justify-center shrink-0">
                <motion.a 
                    href={dynamicCta.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                        group relative px-8 py-3 rounded-full font-mono text-sm tracking-widest uppercase transition-all flex items-center gap-3 border
                        ${selected.length > 0 
                            ? "text-black" // Active Text
                            : "bg-transparent text-white/40 border-white/10"
                        }
                    `}
                    style={selected.length > 0 ? { 
                        backgroundColor: content.color, 
                        borderColor: content.color,
                        boxShadow: `0 0 20px ${content.color}60`
                    } : {}}
                >
                    <span>{dynamicCta.text}</span>
                    <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                </motion.a>
            </div>
        )}

      </motion.div>
    </div>
  );
}