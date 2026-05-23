import React, { useState } from "react";
import { WHO_WE_ARE_TABS } from "../data";
import { ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function WhoWeAre() {
  const [activeTabId, setActiveTabId] = useState("who-we-are");

  const currentTab = WHO_WE_ARE_TABS.find((t) => t.id === activeTabId) || WHO_WE_ARE_TABS[0];

  return (
    <section id="who-we-are-section" className="relative bg-[#FAF8F6] py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden border-t border-[#E0D5CF]">
      
      {/* Decorative Ornaments from Screenshot 1 & 2 */}
      <div className="absolute top-10 left-10 opacity-10 pointer-events-none">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-church-burgundy" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
          
          {/* LEFT SIDE: OVERLAPPING IMAGES COLLAGE (Exactly like Screenshot 1) */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            {/* Dots array backing the overlapping stack */}
            <div className="absolute -left-4 top-10 grid grid-cols-6 gap-2 opacity-15">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-church-rose" />
              ))}
            </div>

            {/* Behind/Top-Right Image: Crowd lobby entering church */}
            <div className="relative w-4/5 ml-auto rounded-xl overflow-hidden shadow-xl border border-rose-50 z-10 transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&h=500&q=80"
                alt="Charismatic Church Lobby Crowd"
                className="w-full h-[260px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>

            {/* Overlapping Bottom-Left Image: Authentic church baptism submersion */}
            <div className="relative w-3/4 mr-auto -mt-20 rounded-xl overflow-hidden shadow-2xl border-4 border-white z-20 transform hover:scale-[1.03] transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&h=500&q=80"
                alt="Baptism Submersion"
                className="w-full h-[240px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-rose-950/10 mix-blend-overlay" />
              {/* Little Water Splash Accent Tag */}
              <div className="absolute bottom-3 left-3 bg-church-burgundy/95 text-white font-mono text-[9px] font-bold py-1 px-2 uppercase rounded tracking-widest backdrop-blur-xs">
                Grace Redeemed
              </div>
            </div>

            {/* 🟢 EXACT ACCENT RED LINE: runs behind baptism, heading to the right (from Screenshot 1) */}
            <div className="absolute left-[30%] bottom-[8%] w-[65%] h-1 bg-church-burgundy rounded-full z-15 hidden md:block opacity-80" />

          </div>

          {/* RIGHT SIDE: INTERACTIVE TABS & COPY (Exactly like Screenshot 1) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left z-20">
            
            {/* Tabs List Navigation */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rose-100 pb-3">
              {WHO_WE_ARE_TABS.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className="relative pb-2 text-[11px] font-black tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    <span className={isActive ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}>
                      {tab.label}
                    </span>
                    {/* Active Underline exactly like Woodside */}
                    {isActive && (
                      <motion.div
                        layoutId="whoWeAreUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-church-burgundy"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Switching with motion fade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="mt-8"
              >
                {/* Title exactly from data */}
                <h3 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
                  {currentTab.title}
                </h3>

                {/* Elaborate Description */}
                <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed font-sans max-w-xl">
                  {currentTab.content}
                </p>

                {/* Bullets lists */}
                <div className="mt-6 space-y-3">
                  {currentTab.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 max-w-lg">
                      <CheckCircle2 className="h-4.5 w-4.5 text-church-burgundy shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm text-slate-700 font-sans font-medium">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quick stats panel */}
                {currentTab.stats && (
                  <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-rose-100/80 pt-6">
                    {currentTab.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="flex flex-col">
                        <span className="font-display text-2xl md:text-3xl font-black text-slate-950">
                          {stat.value}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 mt-1">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
