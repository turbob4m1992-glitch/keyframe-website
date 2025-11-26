import { useState, Suspense, lazy } from 'react' 
import { Canvas, useThree, useFrame } from '@react-three/fiber' 
import ParticleBrain from './components/canvas/ParticleBrain'
import Logo from './components/ui/Logo'
import { AnimatePresence, motion } from 'framer-motion'
import * as THREE from 'three'

// Dynamically import Dashboard to optimize initial load (Code Splitting)
const Dashboard = lazy(() => import('./components/ui/Dashboard'))

function CameraRig({ entered, shape }) {
  const { camera } = useThree()
  
  useFrame(({ clock }, delta) => {
    const targetZ = entered ? 2.5 : 5.5 
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 4 * delta) 
    
    if (!entered) {
      if (shape === 'cloud') {
        const t = clock.getElapsedTime()
        camera.position.x = Math.sin(t * 0.08) * 0.7 
        camera.position.y = Math.cos(t * 0.08) * 0.3
      } else {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.05)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.05)
      }
    }
  })
  return null
}

function App() {
  const [shape, setShape] = useState('cloud') 
  const [entered, setEntered] = useState(false)

  const handleBackgroundClick = () => {
    if (!entered) setShape('cloud');
  }

  return (
    <div 
      className="relative w-full h-screen bg-void-black text-white overflow-hidden cursor-pointer flex flex-col items-center justify-center transform-gpu" 
      onClick={handleBackgroundClick} 
    >
      
      {/* **** NEW: PERSISTENT HEADER/NAV BAR (Z-20) **** */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6 md:p-8 pointer-events-none">
        

        {/* Contact/Portfolio Links */}
        <div className="flex gap-6 pointer-events-auto">
          {/* Portfolio Link (Crucial for finding new clients) */}
          <a href="#portfolio" className="text-gray-400 font-mono text-xs uppercase hover:text-neon transition-colors duration-300">
            [ PORTFOLIO ]
          </a>
          
          {/* Contact Trigger (Opens the dashboard) */}
          <button 
            onClick={() => { setShape('cloud'); setEntered(true); }}
            className="text-neon font-mono text-xs uppercase hover:text-white transition-colors duration-300"
          >
            <button 
  onClick={() => { setShape('cloud'); setEntered(true); }}
  className="text-neon font-mono text-xs uppercase hover:text-white transition-colors duration-300"
>
  [ CONTACT ]
</button>
          </button>
        </div>

      </div>
      {/* **** END NEW HEADER/NAV BAR **** */}
      
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
          <Suspense fallback={null}>
            <ParticleBrain shape={shape} />
            <CameraRig entered={entered} shape={shape} />
            <ambientLight intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <AnimatePresence>
        {!entered && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-12 w-full max-w-4xl pointer-events-none"
          >
            
            {/* LOGO (Central Logo is now larger, redundant with the new header) 
               * Note: We'll keep this central logo for the initial view's aesthetic, 
               * but the link is now in the header.
            */}
            <div className="flex justify-center w-full pointer-events-auto">
              <Logo className="w-80 md:w-96 text-white drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]" />
            </div>

            <div className="flex flex-col items-center gap-8 w-full">
                
                {/* CONTROLLER PILL */}
                <div 
                  className="pointer-events-auto flex flex-wrap justify-center gap-2 p-2 rounded-full liquid-glass transition-all duration-500 hover:scale-105"
                  onClick={(e) => e.stopPropagation()} 
                >
                    
                    {/* 1. STUDIO (Ring) */}
                    <button 
                        onClick={() => setShape('ring')}
                        className={`w-28 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-500 uppercase 
                        ${shape === 'ring' ? 'bg-neon text-black shadow-[0_0_20px_rgba(57,255,20,0.4)] scale-105' : 'text-gray-400 hover:text-white'}`}
                    >
                        [ STUDIO ]
                    </button>
                    
                    {/* 2. STRATEGY (Pyramid) */}
                    <button 
                        onClick={() => setShape('pyramid')}
                        className={`w-28 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-500 uppercase 
                        ${shape === 'pyramid' ? 'bg-neon text-black shadow-[0_0_20px_rgba(57,255,20,0.4)] scale-105' : 'text-gray-400 hover:text-white'}`}
                    >
                        [ STRATEGY ]
                    </button>
                    
                    {/* 3. DESIGN (Icosahedron) */}
                    <button 
                        onClick={() => setShape('icosahedron')}
                        className={`w-28 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-500 uppercase 
                        ${shape === 'icosahedron' ? 'bg-neon text-black shadow-[0_0_20px_rgba(57,255,20,0.4)] scale-105' : 'text-gray-400 hover:text-white'}`}
                    >
                        [ DESIGN ]
                    </button>

                    {/* 4. GLOBAL (Sphere) */}
                    <button 
                        onClick={() => setShape('sphere')}
                        className={`w-28 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-500 uppercase 
                        ${shape === 'sphere' ? 'bg-neon text-black shadow-[0_0_20px_rgba(57,255,20,0.4)] scale-105' : 'text-gray-400 hover:text-white'}`}
                    >
                        [ GLOBAL ]
                    </button>

                </div>

                {/* TRIGGER */}
                <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEntered(true);
                    }}
                    disabled={shape === 'cloud'} 
                    className={`pointer-events-auto group relative px-8 py-3 overflow-hidden rounded-lg bg-transparent transition-all duration-300 
                    ${shape === 'cloud' ? 'opacity-0 translate-y-4 cursor-default' : 'hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] opacity-100 translate-y-0'}`}
                >
                    <span className="relative z-10 font-mono text-xs text-neon tracking-[0.3em] group-hover:text-black transition-colors duration-300">
                        INITIALIZE_SYSTEM
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-neon/0 group-hover:bg-neon transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neon/50"></div>
                </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {entered && (
            <div 
                // NEW: Clicking this outer area now closes the modal
                onClick={() => setEntered(false)} 
                className="absolute inset-0 z-50"
            >
                <Suspense fallback={null}> 
                    {/* Dashboard handles its own closing via the 'X' button if needed */}
                    <Dashboard shape={shape} onBack={() => setEntered(false)} />
                </Suspense>
            </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default App