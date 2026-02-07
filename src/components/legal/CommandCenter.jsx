/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ActivityLog = () => {
  const [logs, setLogs] = useState([
    { id: 1, time: "14:20:05", msg: "INITIALIZING_QFC_REGISTRY_Handshake" },
    { id: 2, time: "14:20:08", msg: "VERIFYING_IDENTITY_HASH_256" },
    { id: 3, time: "14:20:12", msg: "DEPLOYING_SMART_CONTRACT_0x7f...3a" },
  ])

  useEffect(() => {
    const messages = [
        "Analyzing Case Precedents...",
        "Optimizing Contract Variables...",
        "Syncing with Ministry of Justice API...",
        "Encrypting Client Data Packet...",
        "Validating digital signature...",
        "Updating Compliance Protocols...",
    ]

    const interval = setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
        const newMsg = messages[Math.floor(Math.random() * messages.length)];

        setLogs(prev => {
            const newLogs = [...prev, { id: Date.now(), time: timeString, msg: newMsg }];
            if (newLogs.length > 4) return newLogs.slice(newLogs.length - 4);
            return newLogs;
        });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] md:text-xs text-electric-cyan/70 space-y-3 h-32 overflow-hidden relative">
      <AnimatePresence mode='popLayout'>
      {logs.map((log) => (
        <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            layout
            className="flex gap-4 border-b border-electric-cyan/10 pb-1"
        >
            <span className="opacity-50 text-gray-400">[{log.time} AST]</span>
            <span className="truncate">{log.msg}</span>
        </motion.div>
      ))}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </div>
  )
}

const ProgressRing = ({ progress = 84 }) => {
  const radius = 60;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="rotate-[-90deg] drop-shadow-[0_0_10px_rgba(0,242,255,0.3)]"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          <circle
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke="#00f2ff"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
             <span className="font-mono text-2xl font-bold text-white tracking-tighter">{progress}%</span>
             <span className="text-[8px] text-gray-400 uppercase tracking-widest mt-1">Optimization</span>
        </div>
    </div>
  )
}

export default function CommandCenter() {
  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-20 mt-12">
        <div className="relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
            <div className="bg-black/80 backdrop-blur-xl rounded-xl border border-white/5 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">

                {/* Left: Progress */}
                <div className="flex-shrink-0">
                    <ProgressRing />
                </div>

                {/* Right: Logs */}
                <div className="flex-grow w-full">
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                        <h3 className="font-sans text-sm font-medium text-white uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 bg-electric-cyan rounded-full animate-pulse shadow-[0_0_8px_#00f2ff]" />
                            Live System Monitor
                        </h3>
                        <span className="font-mono text-[10px] text-gray-500">v.2.4.0-alpha</span>
                    </div>
                    <ActivityLog />
                </div>

            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-electric-cyan rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-electric-cyan rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-electric-cyan rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-electric-cyan rounded-br-lg" />
        </div>
    </section>
  )
}
