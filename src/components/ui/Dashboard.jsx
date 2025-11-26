import { motion } from 'framer-motion';

const DATA = {
  cloud: {
    title: "CONTACT", // Changed title from KEYFRAME to CONTACT
    subtitle: "INITIATE DIRECT CONNECTION", // New Subtitle
    cards: [ // Using the card structure to cleanly present contact info
      { title: "EMAIL", desc: "PROJECTS & INQUIRIES: YOUR_EMAIL@EXAMPLE.COM", col: "col-span-3" },
      { title: "SCHEDULER", desc: "BOOK A FREE CONSULTATION (Calendly, etc.)", col: "col-span-2" },
      { title: "LINKEDIN", desc: "CONNECT PROFESSIONALLY", col: "col-span-1" }
    ]
  },
  ring: { // STUDIO
    title: "STUDIO",
    subtitle: "PRODUCTION & VFX",
    cards: [
      { title: "The Reel", desc: "**Cine-Grade 4K** Showreel: See the Magic.", detail: "We use a dedicated post-production pipeline to deliver immersive, cinema-quality visuals, ensuring every frame maximizes impact for distribution.", col: "col-span-1 md:col-span-2" },
      { title: "Gear List", desc: "Arri Alexa, **RED Komodo** & Pro Optics", detail: "Our high-end camera packages and lighting kits guarantee technical excellence for any commercial project.", col: "col-span-1" },
      { title: "Sound Design", desc: "**Immersive Dolby Atmos** Mixing & Mastering", detail: "Professional audio is non-negotiable. We craft full soundscapes that drive emotional resonance and meet broadcast standards.", col: "col-span-1" },
      { title: "Color Grading", desc: "**HDR Cinema Finish** using DaVinci Resolve", detail: "We apply a final polish using industry-standard HDR techniques, giving your visuals a premium, distinct cinematic look.", col: "col-span-1 md:col-span-2" },
    ]
  },
  pyramid: { // STRATEGY
    title: "STRATEGY",
    subtitle: "GROWTH ARCHITECTURE",
    cards: [
      { title: "The Blueprint", desc: "**Precision Market Positioning** & Audit", detail: "We define your precise brand coordinates to ensure maximum market penetration and competitive advantage.", col: "col-span-1 md:col-span-2" },
      { title: "Competitor Intel", desc: "Decoding the Market: **Deep-Dive Analysis**", detail: "We analyze competitor campaigns, visual language, and content strategy to find clear pathways for market dominance.", col: "col-span-1" },
      { title: "Growth Sprints", desc: "**Agile KPI Targeting** and Weekly Velocity", detail: "We use weekly targets and measurable key performance indicators (KPIs) to guarantee momentum and ROI.", col: "col-span-1" },
      { title: "Full Funnel", desc: "**Zero-Compromise** Acquisition to Retention", detail: "We build video and web assets designed to capture leads, convert sales, and build lasting customer loyalty.", col: "col-span-1 md:col-span-2" },
    ]
  },
  icosahedron: { // DESIGN
    title: "DESIGN",
    subtitle: "VISUAL EVOLUTION",
    cards: [
      { title: "Identity System", desc: "**Magnetic** Logo, Type & Color Theory", detail: "We craft visual identities that are unique, scalable, and built to stand out in crowded digital spaces.", col: "col-span-1 md:col-span-2" },
      { title: "UI/UX", desc: "Pixel-Perfect **Figma Prototypes** & Flows", detail: "Web and app design focused on intuitive flow and user conversion, delivered with precise documentation.", col: "col-span-1" },
      { title: "Motion Assets", desc: "Lottie & Rive **Dynamic Animations**", detail: "We integrate lightweight, performant motion graphics to enhance engagement and explain complex concepts quickly.", col: "col-span-1" },
      { title: "Brand Guidelines", desc: "The **Definitive Visual Bible**", detail: "A comprehensive document ensuring every touchpoint, from social media to print, is visually consistent and powerful.", col: "col-span-1 md:col-span-2" },
    ]
  },
  sphere: { // GLOBAL
    title: "GLOBAL",
    subtitle: "WORLDWIDE NETWORK",
    cards: [
      { title: "Remote Teams", desc: "Seamless **24/7 Production Cycle**", col: "col-span-2", detail: "Our workflow allows us to utilize global talent, minimizing project downtime and maximizing delivery speed." },
      { title: "Localization", desc: "Multi-language & **Cultural Asset Adaptation**", col: "col-span-1", detail: "We adapt visuals and messaging for specific regional markets, ensuring cultural relevance and maximizing global reach." },
      { title: "Cloud Sync", desc: "Instant **Zero-Latency** Asset Delivery", col: "col-span-1", detail: "All assets are available instantly via cloud sync, speeding up client review and approval cycles." },
      { title: "Partners", desc: "**Elite Global Studio Network** Access", col: "col-span-2", detail: "Access to a vetted network of international collaborators for specialized tasks and large-scale projects." },
    ]
  }
};

// Use Framer Motion on the Cards for better hover interaction
const Card = motion.div;

export default function Dashboard({ shape, onBack }) {
  const content = DATA[shape] || DATA.cloud;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
      
      

<motion.div 
  onClick={(e) => e.stopPropagation()} // <--- ADDED: Stops clicks from closing the modal
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
              // REVERTED: Using simple opacity change for stable hover feedback
              whileHover={{ 
                opacity: 0.95, // Slight transparency change
              }} 
              whileTap={{ scale: 0.98 }}
              className={`${card.col} relative bg-white/5 border border-white/5 p-4 rounded-xl hover:border-neon/30 transition-colors group cursor-pointer`}
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