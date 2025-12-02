import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const { active, progress } = useProgress()
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    // 1. INSTANT UNLOCK: As soon as loading stops or hits 100%
    if (!active || progress === 100) {
      setFinished(true)
    }
  }, [active, progress])

  useEffect(() => {
    // 2. FAILSAFE: Force open after 1 second max (prevents getting stuck)
    const safetyTimer = setTimeout(() => {
      setFinished(true)
    }, 1000)

    return () => clearTimeout(safetyTimer)
  }, [])

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d0d] pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="flex flex-col items-center gap-4"
          >
            <img 
              src="/logo.svg" 
              alt="Loading" 
              className="w-32 md:w-48 opacity-80"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}