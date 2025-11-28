import { useState, Suspense, lazy, useRef, useEffect } from 'react' 
const Portfolio = lazy(() => import('./components/ui/Portfolio')) 
const Clients = lazy(() => import('./components/ui/Clients'))
// NEW: Import the Mobile Portfolio View
const MobilePortfolio = lazy(() => import('./components/ui/MobilePortfolio'))

import { Canvas, useThree, useFrame } from '@react-three/fiber' 
import ParticleBrain from './components/canvas/ParticleBrain'
import PortfolioSpace from './components/canvas/PortfolioSpace' 
import Logo from './components/ui/Logo'
import { AnimatePresence, motion } from 'framer-motion'
import * as THREE from 'three'

const Dashboard = lazy(() => import('./components/ui/Dashboard'))

function CameraRig({ entered, shape, viewPortfolio }) {
  const { camera, size } = useThree() 
  const angleRef = useRef(0) 
  const radiusRef = useRef(6.0) 
  
  const isMobile = size.width < 768

  useFrame(({ clock }, delta) => {
    // 1. ZOOM LOGIC
    let targetRadius = 6.0 
    
    if (entered) {
        targetRadius = 4.5 
    } else if (viewPortfolio) {
        targetRadius = 9.0 
    }

    if (isMobile) {
        if (entered) targetRadius = 7.0 
        else if (viewPortfolio) targetRadius = 13.0 
        else targetRadius = 10.5 
    }

    radiusRef.current = THREE.MathUtils.lerp(radiusRef.current, targetRadius, 4 * delta)

    // 2. ORBIT LOGIC
    let targetAngle = 0
    if (viewPortfolio) {
      targetAngle = Math.PI / 2 
    } else if (!entered && shape === 'cloud') {
      targetAngle = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }

    angleRef.current = THREE.MathUtils.lerp(angleRef.current, targetAngle, 2 * delta)
    
    camera.position.x = Math.sin(angleRef.current) * radiusRef.current
    camera.position.z = Math.cos(angleRef.current) * radiusRef.current
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 2 * delta)
    
    camera.lookAt(0, 0, 0)
  })
  return null
}

function App() {
  const [shape, setShape] = useState('cloud') 
  const [entered, setEntered] = useState(false)
  const [viewClients, setViewClients] = useState(false) 
  const [viewPortfolio, setViewPortfolio] = useState(false)
  
  // NEW: Detect Mobile Screen Size
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleBackgroundClick = () => {
    if (!entered && !viewPortfolio) setShape('cloud');
  }

  return (
    <div 
      className="relative w-full h-screen bg-void-black text-white overflow-hidden cursor-pointer flex flex-col items-center justify-center transform-gpu" 
      onClick={handleBackgroundClick} 
    >
      
      {/* HEADER */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6 md:p-8 pointer-events-none">
        <div className="flex gap-6 pointer-events-auto">
          <button 
            onClick={() => { 
                setShape('cloud'); 
                setViewPortfolio(true); 
                setEntered(false); 
            }}
            disabled={viewPortfolio}
            className={`font-mono text-xs uppercase transition-colors duration-300 ${viewPortfolio ? 'text-neon cursor-default' : 'text-gray-400 hover:text-neon cursor-pointer'}`}
          >
            [ PORTFOLIO ]
          </button>
          
          <button 
            onClick={() => { 
                setShape('cloud'); 
                setEntered(true); 
                setViewPortfolio(false); 
            }}
            disabled={entered}
            className={`font-mono text-xs uppercase transition-colors duration-300 ${entered ? 'text-neon cursor-default' : 'text-gray-400 hover:text-white cursor-pointer'}`}
          >
            [ CONTACT ]
          </button>
        </div>
      </div>
      
      {/* 3D SCENE */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6.0], fov: 45 }}> 
          <Suspense fallback={null}>
            <ParticleBrain shape={shape} />
            
            {/* CONDITIONAL RENDERING: Only show 3D Hologram on Desktop */}
            {!isMobile && (
               <PortfolioSpace isOpen={viewPortfolio} onClose={() => setViewPortfolio(false)} /> 
            )}

            <CameraRig entered={entered} shape={shape} viewPortfolio={viewPortfolio} />
            <ambientLight intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <AnimatePresence>
        {!entered && !viewPortfolio && ( 
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-12 w-full max-w-4xl pointer-events-none"
          >
            <div className="flex justify-center w-full pointer-events-auto">
              <Logo className="w-80 md:w-96 text-white drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]" />
            </div>

            <div className="flex flex-col items-center gap-8 w-full">
                <div 
                  className="pointer-events-auto flex flex-wrap justify-center gap-2 p-2 rounded-full liquid-glass transition-all duration-500 hover:scale-105"
                  onClick={(e) => e.stopPropagation()} 
                >
                    <button onClick={() => setShape('ring')} className={`w-28 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-500 uppercase ${shape === 'ring' ? 'bg-neon text-black shadow-[0_0_20px_rgba(57,255,20,0.4)] scale-105' : 'text-gray-400 hover:text-white'}`}>[ STUDIO ]</button>
                    <button onClick={() => setShape('pyramid')} className={`w-28 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-500 uppercase ${shape === 'pyramid' ? 'bg-neon text-black shadow-[0_0_20px_rgba(57,255,20,0.4)] scale-105' : 'text-gray-400 hover:text-white'}`}>[ STRATEGY ]</button>
                    <button onClick={() => setShape('icosahedron')} className={`w-28 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-500 uppercase ${shape === 'icosahedron' ? 'bg-neon text-black shadow-[0_0_20px_rgba(57,255,20,0.4)] scale-105' : 'text-gray-400 hover:text-white'}`}>[ DESIGN ]</button>
                    <button onClick={() => setShape('sphere')} className={`w-28 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-500 uppercase ${shape === 'sphere' ? 'bg-neon text-black shadow-[0_0_20px_rgba(57,255,20,0.4)] scale-105' : 'text-gray-400 hover:text-white'}`}>[ GLOBAL ]</button>
                </div>

                <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEntered(true);
                    }}
                    disabled={shape === 'cloud'} 
                    className={`pointer-events-auto group relative px-8 py-3 overflow-hidden rounded-lg bg-transparent transition-all duration-300 ${shape === 'cloud' ? 'opacity-0 translate-y-4 pointer-events-none' : 'hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] opacity-100 translate-y-0'}`}
                >
                    <span className="relative z-10 font-mono text-xs text-neon tracking-[0.3em] group-hover:text-black transition-colors duration-300">INITIALIZE_SYSTEM</span>
                    <div className="absolute inset-0 h-full w-full bg-neon/0 group-hover:bg-neon transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neon/50"></div>
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {entered && (
            <div onClick={() => setEntered(false)} className="absolute inset-0 z-50">
                <Suspense fallback={null}> 
                    <Dashboard shape={shape} onBack={() => setEntered(false)} />
                </Suspense>
            </div>
        )}
        
        {viewClients && (
            <div onClick={() => setViewClients(false)} className="absolute inset-0 z-50">
                <Suspense fallback={null}> 
                    <Clients onBack={() => setViewClients(false)} />
                </Suspense>
            </div>
        )}

        {/* NEW: On Mobile, show 2D Portfolio instead of 3D space */}
        {viewPortfolio && isMobile && (
            <div onClick={() => setViewPortfolio(false)} className="absolute inset-0 z-50">
                <Suspense fallback={null}>
                    <MobilePortfolio onBack={() => setViewPortfolio(false)} />
                </Suspense>
            </div>
        )}
      </AnimatePresence>
      
      {!viewPortfolio && (
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-none">
            <button onClick={() => { setShape('cloud'); setViewClients(true); }} className="pointer-events-auto text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] hover:text-neon transition-all duration-300 animate-pulse hover:animate-none">[ TRUST PROTOCOL ]</button>
          </div>
      )}
    </div>
  )
}

export default App