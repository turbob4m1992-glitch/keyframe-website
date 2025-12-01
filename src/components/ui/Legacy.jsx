import { motion } from 'framer-motion';

export default function Legacy({ onBack }) {
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
              OUR LEGACY
            </h2>
            <p className="text-neon font-mono text-xs tracking-[0.3em] uppercase">
              /// Driven by Loyalty. Guided by Logic.
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
        <div className="overflow-y-auto pr-4 custom-scrollbar space-y-10 text-gray-300">
          
          {/* INTRO */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-lg border border-white/5">
            <p className="leading-relaxed">
              For KEYFRAME, loyalty is not just a sentiment—it is a business strategy. After spending over a decade operating at the highest levels of the Gulf market, our leadership made a deliberate choice to return to Jordan.
            </p>
            <p className="mt-4 leading-relaxed">
              The mission was clear: to transplant <span className="text-white font-bold">"Global Standards"</span> directly into the Jordanian industrial sector. We are not here for a temporary project; we are here to build long-term infrastructure for businesses that demand perfection. We bring the discipline of the corporate world and the precision of the scientific method to a creative industry often driven by guesswork.
            </p>
          </div>

          {/* SECTION: CORPORATE FOUNDATION */}
          <section>
            <h3 className="text-white/50 font-mono text-xs mb-4 uppercase tracking-widest border-b border-neon/30 pb-2 inline-block">
              The Corporate Foundation
            </h3>
            <p className="mb-4">KEYFRAME was forged in the high-pressure retail and luxury markets of Qatar. Our strategic approach comes from managing entire brand ecosystems, not just making "nice posts."</p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white/5 p-4 rounded border-l-2 border-neon/50">
                <h4 className="text-white font-bold text-sm mb-2">Group Marketing Leadership</h4>
                <p className="text-sm text-gray-400">Our founder served as Group Marketing Manager for United Village Food (Qatar), orchestrating the strategy for a massive portfolio including Wooden Bakery, Bun Al Ameed (Al Abed Roastery), and Village Markets.</p>
              </div>
              <div className="bg-white/5 p-4 rounded border-l-2 border-neon/50">
                <h4 className="text-white font-bold text-sm mb-2">Luxury Standards</h4>
                <p className="text-sm text-gray-400">We hold a track record of executing high-end visual production for BMW and Maserati, delivering content that meets the strictest global brand guidelines.</p>
              </div>
            </div>
          </section>

          {/* SECTION: INFRASTRUCTURE & ENTERTAINMENT */}
          <section>
            <h3 className="text-white/50 font-mono text-xs mb-4 uppercase tracking-widest border-b border-neon/30 pb-2 inline-block">
              Major Infrastructure & Entertainment
            </h3>
            <p className="mb-4">Beyond retail, our history includes managing the digital and visual identity for large-scale logistics and entertainment entities.</p>
            
            <ul className="space-y-4">
              <li className="flex flex-col md:flex-row gap-2 md:gap-4">
                <span className="text-neon font-mono text-xs whitespace-nowrap pt-1">:: PROJECT 01</span>
                <div>
                  <strong className="text-white block">Smith's Drive-In Movie Theater</strong>
                  <span className="text-sm">Spearheaded the comprehensive digital, website build and visual presence for Smith's Drive-In Movie Theater, California, USA, bridging the gap between physical event operations and digital user engagement.</span>
                </div>
              </li>
              <li className="flex flex-col md:flex-row gap-2 md:gap-4">
                <span className="text-neon font-mono text-xs whitespace-nowrap pt-1">:: PROJECT 02</span>
                <div>
                  <strong className="text-white block">Confidential International Entity</strong>
                  <span className="text-sm">Retained as a strategic partner for a high-profile international entertainment brand (Name withheld under NDA). This role involves managing sensitive intellectual property and delivering assets for global distribution.</span>
                </div>
              </li>
            </ul>
          </section>

          {/* SECTION: GLOBAL VALIDATION */}
          <section>
            <h3 className="text-white/50 font-mono text-xs mb-4 uppercase tracking-widest border-b border-neon/30 pb-2 inline-block">
              Global Validation
            </h3>
            <div className="bg-gradient-to-r from-neon/10 to-transparent p-6 rounded-lg border border-neon/20">
              <p className="text-white text-lg font-light">
                Our methodology is verified on a global scale. We rank in the <span className="text-neon font-bold">Top 3% Worldwide on Freelancer.com</span> with a perfect 5-Star Rating, having successfully delivered complex projects for international clients across Qatar, the USA, and Lebanon.
              </p>
            </div>
          </section>

          {/* SECTION: TECHNICAL EDGE */}
          <section>
            <h3 className="text-white/50 font-mono text-xs mb-4 uppercase tracking-widest border-b border-neon/30 pb-2 inline-block">
              The Technical Edge: Data Over Perception
            </h3>
            <p className="mb-4">
              Trained by National Geographic and Canon experts during his tenure at CNA-Q, our founder developed a disciplined eye for composition—but our agency's unique strength lies in a scientific approach to color.
            </p>
            
            <div className="bg-black/40 p-6 rounded-lg border border-white/10">
              <h4 className="text-white font-bold mb-2">The Scientific Method</h4>
              <p className="mb-4 text-sm">We bypass subjective perception entirely. Instead, we rely on Data.</p>
              <p className="italic text-neon/80 pl-4 border-l-2 border-neon">
                "We don't trust our eyes; we trust the data. We build brand identities using precise hexadecimal codes and mathematical color theory. This ensures your brand looks structurally perfect across every medium, every time."
              </p>
            </div>
          </section>

          {/* SECTION: LEADERSHIP */}
          <section>
            <h3 className="text-white/50 font-mono text-xs mb-4 uppercase tracking-widest border-b border-neon/30 pb-2 inline-block">
              A History of Leadership
            </h3>
            <p className="mb-4">
              Our standards were developed in an academic environment of excellence. As the former leadership behind the CNA-Q Photography Club, we established a training curriculum that produced national award winners.
            </p>

            {/* NEW ADDITION: SCHOLARSHIP STORY */}
            <div className="bg-white/5 p-5 rounded border border-white/10 mb-4">
              <h4 className="text-neon font-mono text-xs uppercase mb-2">:: Art for Impact</h4>
              <p className="text-sm text-gray-300">
                We believe talent should serve the community. During our time at CNA-Q, we organized photography exhibits to sell printed works, directing the proceeds to fund scholarships for high-GPA students facing financial hardship. It was an early lesson in converting creative assets into tangible support for deserving talent.
              </p>
            </div>

            <p className="mt-4 font-bold text-white">
              That same culture of mentorship, discipline, and award-winning rigor is the DNA of KEYFRAME. We don't just deliver work; we engineer success.
            </p>
          </section>

        </div>

      </motion.div>
    </div>
  );
}