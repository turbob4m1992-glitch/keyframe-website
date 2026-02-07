import React from 'react'
import ParticleBackground from './components/legal/ParticleBackground'
import Header from './components/legal/Header'
import Hero from './components/legal/Hero'
import UseCaseGrid from './components/legal/UseCaseGrid'
import CommandCenter from './components/legal/CommandCenter'

export default function LegalServicesApp() {
  return (
    <div className="relative min-h-screen bg-void-black text-white font-sans overflow-x-hidden selection:bg-electric-cyan selection:text-black">
      <ParticleBackground />
      <Header />

      <main className="relative z-10 flex flex-col items-center w-full pt-12 md:pt-0">
        <Hero />
        <UseCaseGrid />
        <CommandCenter />
      </main>

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none z-20 bg-radial-gradient from-transparent to-black/80" style={{ background: 'radial-gradient(circle, transparent 60%, black 100%)' }} />

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </div>
  )
}
