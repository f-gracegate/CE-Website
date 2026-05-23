import React, { useState } from "react";
import { Play, MapPin, ChevronRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroSectionProps {
  onOpenModal: (type: "locations" | "login" | "give") => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [isPlayingSermon, setIsPlayingSermon] = useState(false);

  // Decorative vector Diamond list
  const diamondGrid = [
    { top: "12%", left: "10%", size: "w-3 h-3 hover:scale-135", opacity: "opacity-20 text-church-burgundy" },
    { top: "25%", left: "85%", size: "w-4.5 h-4.5 hover:rotate-45", opacity: "opacity-35 text-church-rose" },
    { top: "45%", left: "42%", size: "w-3.5 h-3.5", opacity: "opacity-15 text-slate-300" },
    { top: "68%", left: "8%", size: "w-4 h-4", opacity: "opacity-25 text-church-rose" },
    { top: "72%", left: "45%", size: "w-3 h-3", opacity: "opacity-20 text-church-burgundy" },
    { top: "18%", left: "48%", size: "w-3.5 h-3.5", opacity: "opacity-10 text-slate-200" }
  ];

  return (
    <div id="hero-section" className="relative min-h-[92vh] overflow-hidden bg-[#EDE6E2] font-sans pb-32">
      
      {/* 🌟 NEUMORPHIC GLOW BACKGROUND STYLES */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Radial spotlights simulating heavenly presence */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(138,30,37,0.06),rgba(210,115,125,0.04),transparent_60%)] animate-pulse-slow" />
        <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] rounded-full bg-rose-500/5 blur-[120px]" />
        
        {/* Subtle coordinate horizontal lines & matrix overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `
              linear-gradient(to right, #8a1e25 1px, transparent 1px),
              linear-gradient(to bottom, #8a1e25 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* Floating Animated Diamond Accents */}
      {diamondGrid.map((dia, idx) => (
        <div
          key={idx}
          className={`absolute pointer-events-auto transition-transform duration-500 hover:text-church-burgundy select-none ${dia.top ? "" : "hidden"}`}
          style={{ top: dia.top, left: dia.left }}
        >
          <div className={`${dia.size} ${dia.opacity} border border-current rotate-45 flex items-center justify-center`}>
            {idx % 3 === 0 && <span className="w-1 h-1 bg-current rounded-full" />}
          </div>
        </div>
      ))}

      {/* Hero Core Layout */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* LEFT COLUMN: Texts & Description (Woodside Inspired Layout) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-20">
            
            {/* Soft highlight micro indicator in rose & burgundy */}
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-100 px-3 py-1 text-[11px] font-extrabold tracking-widest text-[#8a1e25] uppercase">
              <span className="flex h-2 w-2 rounded-full bg-[#d2737d] animate-ping" />
              <span>Sermon Series live</span>
            </div>

            {/* Title stacked with distinctive brand styling */}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl uppercase leading-[0.95]">
              welcome
            </h1>
            
            {/* "to more" inside filled bold box from logo colors */}
            <div className="mt-2 bg-[#8a1e25] px-5 py-2.5 rounded-sm shadow-lg shadow-rose-900/10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <h2 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl uppercase leading-none">
                to more
              </h2>
            </div>

            {/* Subtitle supporting copy exact wording */}
            <p className="mt-8 text-sm md:text-base text-slate-600 leading-relaxed font-sans max-w-sm font-normal">
              There’s more to life than your good deeds or successes, your regrets or mistakes. 
              The answer is right in front of you. Let’s discover what God has in store.
            </p>

            {/* FIND A LOCATION outlined pill button exact design with hover fill */}
            <button
              onClick={() => onOpenModal("locations")}
              className="mt-8 group flex items-center gap-2 rounded-full border border-church-burgundy/40 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-widest text-church-burgundy hover:bg-[#8a1e25] hover:text-white hover:border-church-burgundy transition-all duration-300 cursor-pointer shadow-md"
            >
              <MapPin className="h-4 w-4" />
              <span>FIND A LOCATION</span>
              <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

          {/* RIGHT COLUMN: Stage/Sermon Cinematic Media (Woodside layout) */}
          <div className="lg:col-span-7 relative z-10 w-full group">
            
            {/* Background design accents */}
            <div className="absolute -right-6 -bottom-10 grid grid-cols-5 gap-3 opacity-20 pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-2 h-2 border border-church-burgundy rotate-45" />
              ))}
            </div>
            
            <div className="absolute -left-6 -top-4 grid grid-cols-3 gap-3 opacity-15 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-2 h-2 border border-church-rose rotate-45" />
              ))}
            </div>

            {/* Immersive Video frame container */}
            <div className="relative overflow-hidden rounded-2xl border border-[#E0D5CF] bg-[#FAF8F6] shadow-2xl transition-transform duration-500 hover:scale-[1.01] hover:shadow-rose-900/10">
              
              {/* Blue/Cyan dramatic church stage lighting photo background */}
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&h=700&q=80"
                alt="Charismatic Praise Worship Stage"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-[16/10] object-cover filter brightness-[0.75]"
              />

              {/* Crimson overlay screen recreating church feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-rose-950/20 to-transparent mix-blend-multiply" />

              {/* Live Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded bg-[#8a1e25] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                <span>REC LIVE</span>
              </div>

              {/* Speaker Overlay text */}
              <div className="absolute bottom-6 left-6 text-left">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#d2737d] font-semibold">
                  Sermon Series — The Gospel of More
                </p>
                <h3 className="font-display text-lg font-bold text-white uppercase mt-0.5 max-w-xs sm:max-w-md">
                  Chains Broken by Grace
                </h3>
              </div>

              {/* Interactive Play Circle floating over background */}
              <button
                onClick={() => setIsPlayingSermon(true)}
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 hover:bg-[#8a1e25] hover:scale-110 border border-white/20 hover:border-transparent text-white shadow-2xl backdrop-blur-xs transition-all duration-300 cursor-pointer"
                aria-label="Play sample sermon video"
              >
                <Play className="h-7 w-7 fill-current ml-0.5" />
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* Mouse Scroll Down Indicator bottom center */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center select-none text-slate-400 font-sans z-20 pointer-events-none">
        <div className="flex h-8 w-5 justify-center rounded-full border border-slate-200 p-1 mb-1">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-1.5 w-1.5 rounded-full bg-[#8a1e25]"
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
          scroll down
        </span>
      </div>

      {/* 📐 DIAGONAL WAVY / SLOPE CUT SEPARATOR PATH */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[100px] text-white fill-current"
        >
          {/* Exact steep diagonal slope dividing line */}
          <path d="M0,80 L1200,120 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Full Screen Cinematic Embeddable TV Sermon Modal */}
      <AnimatePresence>
        {isPlayingSermon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md">
            <button
              onClick={() => setIsPlayingSermon(false)}
              className="absolute top-4 right-4 text-white hover:text-church-burgundy rounded bg-white/5 p-2 transition-colors z-50"
            >
              Close Broadcast [X]
            </button>
            <div className="relative w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden shadow-2xl shadow-rose-900/20">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Charismatic Sunday Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
