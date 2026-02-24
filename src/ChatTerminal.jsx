import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURATION ---
const SCRIPT = {
  start: {
    text: "KEYFRAME SYSTEM ONLINE. SELECT PROTOCOL:",
    options: [
      { label: "START PROJECT", next: "project" },
      { label: "SERVICES", next: "services" },
      { label: "CONTACT HUMAN", next: "contact" }
    ]
  },
  project: {
    text: "ACKNOWLEDGED. WHAT IS THE PROJECT SCOPE?",
    options: [
      { label: "WEB DESIGN", next: "web" },
      { label: "VIDEO PRODUCTION", next: "video" },
      { label: "FULL BRANDING", next: "brand" }
    ]
  },
  services: {
    text: "WE SPECIALIZE IN HIGH-IMPACT VISUALS. WEB. VIDEO. STRATEGY. WE DO NOT DO MEDIOCRE.",
    options: [
      { label: "BACK TO START", next: "start" },
      { label: "SEE PRICING", next: "pricing" }
    ]
  },
  web: {
    text: "REACT, 3D, & IMMERSIVE EXPERIENCES. ESTIMATED TIMELINE: 2-4 WEEKS.",
    options: [
      { label: "BOOK A CALL", next: "contact" },
      { label: "BACK", next: "start" }
    ]
  },
  video: {
    text: "CINEMATIC EDITING & MOTION GRAPHICS. FCPX EXPERTS.",
    options: [
      { label: "BOOK A CALL", next: "contact" },
      { label: "BACK", next: "start" }
    ]
  },
  brand: {
    text: "FULL IDENTITY OVERHAUL. LOGO, VOICE, VISUALS. WE BUILD LEGACIES, NOT JUST LOGOS.",
    options: [
      { label: "BOOK A CALL", next: "contact" },
      { label: "BACK", next: "start" }
    ]
  },
  contact: {
    text: "INITIALIZING MAIL PROTOCOL... SEND BRIEF TO: YOUSEF@KEYFRAMEGLOBAL.COM OR WHATSAPP DIRECT.",
    options: [
        { label: "OPEN WHATSAPP", action: "whatsapp" },
        { label: "RESET SYSTEM", next: "start" }
    ]
  },
  pricing: {
      text: "PREMIUM SERVICES FOR PREMIUM CLIENTS. PROJECTS START AT $1K.",
      options: [
          { label: "I HAVE BUDGET", next: "contact" },
          { label: "JUST BROWSING", next: "start" }
      ]
  }
};

// --- TYPEWRITER COMPONENT (Silent Version) ---
const Typewriter = ({ text, onComplete }) => {
    const [displayed, setDisplayed] = useState('');
    const index = useRef(0);

    useEffect(() => {
        index.current = 0;
        setDisplayed('');
        
        const interval = setInterval(() => {
            if (index.current < text.length) {
                setDisplayed((prev) => prev + text.charAt(index.current));
                index.current++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, 20); // Speed: 20ms per letter
        
        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayed}</span>;
};

export default function ChatTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([{ type: 'bot', text: "SYSTEM READY." }]);
  const [currentStep, setCurrentStep] = useState('start');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history, isTyping]);

  const toggleOpen = () => {
      setIsOpen(!isOpen);
  };

  const handleOption = (option) => {
    setHistory(prev => [...prev, { type: 'user', text: `> ${option.label}` }]);
    
    if (option.action === 'whatsapp') {
        window.open('https://wa.me/962791656555', '_blank'); 
        return;
    }

    setIsTyping(true);
    setTimeout(() => {
      const nextStepData = SCRIPT[option.next];
      setHistory(prev => [...prev, { type: 'bot', text: nextStepData.text }]);
      setCurrentStep(option.next);
      setIsTyping(false); 
    }, 400);
  };

  return (
    // UPDATED POSITION LOGIC:
    // 'bottom-20' -> Only applies to Mobile (lifts it up)
    // 'md:bottom-5' -> Applies to Desktop (keeps it low)
    <div className="fixed bottom-20 md:bottom-5 right-5 z-50 font-mono text-xs md:text-sm">
      
      {/* MINIMIZED ICON */}
      {!isOpen && (
        <button 
          onClick={toggleOpen}
          className="bg-black border border-[#39FF14] text-[#39FF14] w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:scale-110 transition-transform animate-pulse"
        >
          {'>_'}
        </button>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="crt-screen w-80 h-96 bg-black/95 backdrop-blur-md border border-[#39FF14] flex flex-col shadow-2xl rounded-lg overflow-hidden transform transition-all duration-300 origin-bottom-right">
          
          {/* HEADER */}
          <div className="bg-[#39FF14] text-black p-2 font-bold flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
            <span className="tracking-widest">TERMINAL V1.0</span>
            <span>[X]</span>
          </div>

          {/* MESSAGES AREA */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
             {history.map((msg, idx) => (
               <div key={idx} className={`${msg.type === 'user' ? 'text-right text-white/50 italic' : 'text-[#39FF14]'}`}>
                 {msg.type === 'bot' ? (
                     (idx === history.length - 1 && !isTyping) ? <Typewriter text={msg.text} /> : msg.text
                 ) : msg.text}
               </div>
             ))}
             <div className="text-[#39FF14] mt-2">
                <span className="cursor-blink">█</span>
             </div>
          </div>

          {/* OPTIONS AREA */}
          <div className="p-3 border-t border-white/10 bg-white/5 min-h-[60px]">
             <div className="flex flex-wrap gap-2 justify-end">
               {(!isTyping) && SCRIPT[currentStep].options.map((opt, i) => (
                 <button 
                   key={i}
                   onClick={() => handleOption(opt)}
                   className="border border-[#39FF14] text-[#39FF14] px-3 py-1 hover:bg-[#39FF14] hover:text-black transition-colors uppercase text-[10px]"
                 >
                   [{opt.label}]
                 </button>
               ))}
             </div>
          </div>

        </div>
      )}
    </div>
  );
}