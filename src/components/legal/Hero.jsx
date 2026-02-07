/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const text = "> INITIALIZING CORPORATE PROTOCOL..."
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-4 pt-24 text-center pointer-events-none select-none">
      <div className="mb-8 min-h-[4rem] flex items-center justify-center">
        <h1 className="font-mono text-xl md:text-3xl lg:text-4xl text-white tracking-tighter drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">
          <span className="text-electric-cyan mr-2">{displayedText.substring(0, 1)}</span>
          {displayedText.substring(1)}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-5 md:w-3 md:h-8 bg-electric-cyan ml-2 align-middle shadow-[0_0_10px_#00f2ff]"
          />
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="pointer-events-auto"
      >
        <h2 className="font-sans text-base md:text-xl text-gray-400 tracking-wide font-light max-w-2xl mx-auto leading-relaxed">
          Autonomous Legal Intelligence for <span className="text-white font-medium border-b border-electric-cyan/30 pb-1">Qatar</span>.
          <br />
          <span className="text-sm md:text-base text-gray-500 mt-2 block">Optimizing governance through algorithmic precision.</span>
        </h2>
      </motion.div>
    </section>
  )
}
