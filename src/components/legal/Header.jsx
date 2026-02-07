/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-white font-mono text-sm md:text-base tracking-widest pointer-events-auto cursor-default select-none"
      >
        <span className="text-electric-cyan mr-2">[</span>
        LEGAL_SYSTEM_QA
        <span className="text-electric-cyan ml-2">]</span>
      </motion.div>

      <nav className="flex gap-4 md:gap-8 pointer-events-auto">
        {['PROTOCOL', 'STATUS', 'ACCESS'].map((item, i) => (
           <motion.button
             key={item}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
             className="text-[10px] md:text-xs font-mono text-gray-500 hover:text-electric-cyan transition-colors duration-300 uppercase tracking-widest"
           >
             {item}
           </motion.button>
        ))}
      </nav>
    </header>
  )
}
