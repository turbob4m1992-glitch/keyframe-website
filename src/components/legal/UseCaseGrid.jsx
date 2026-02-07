/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ title, status, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover="hover"
      className="relative group p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer backdrop-blur-xl hover:border-electric-cyan/30 transition-colors duration-500"
    >
      {/* Scanning Line */}
      <motion.div
        variants={{
            hover: { top: "100%" }
        }}
        initial={{ top: "-100%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-electric-cyan/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none w-full -z-10"
        style={{ top: "-20%" }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2 rounded bg-white/5 border border-white/10 group-hover:border-electric-cyan/50 transition-colors duration-300">
                <div className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-electric-cyan shadow-[0_0_8px_#00f2ff] animate-pulse' : 'bg-gray-600'}`} />
            </div>
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest group-hover:text-electric-cyan transition-colors duration-300">
                SYS_0{index + 1}
            </span>
          </div>

          <div>
            <h3 className="font-sans text-xl font-medium text-white mb-3 group-hover:text-electric-cyan transition-colors duration-300">
              {title}
            </h3>

            <p className="text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {description}
            </p>
          </div>
      </div>

      {/* Bottom Border Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric-cyan/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
    </motion.div>
  )
}

export default function UseCaseGrid() {
  const cases = [
    { title: "QFC Company Formation", status: "active", description: "Automated entity structuring and compliance checks for Qatar Financial Centre regulations." },
    { title: "Smart Contract Logic", status: "active", description: "Self-executing agreements with cryptographic verification and immutable audit trails." },
    { title: "Dispute Resolution Dashboard", status: "active", description: "AI-driven mediation dashboard for rapid conflict settlement and case management." },
  ]

  return (
    <section className="relative z-10 px-4 py-12 md:py-24 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cases.map((c, i) => (
           <Card key={i} {...c} index={i} />
        ))}
      </div>
    </section>
  )
}
