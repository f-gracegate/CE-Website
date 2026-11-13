import React, { useState, useRef, useEffect } from "react";
import { WHO_WE_ARE_TABS } from "../data";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

export default function WhoWeAre() {
  const [activeTabId, setActiveTabId] = useState("who-we-are");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Hook into scroll state over the container's intersection range
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Calculate subtle offset movements for a beautiful multi-layered look
  const yBehind = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yFront = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const currentTab = WHO_WE_ARE_TABS.find((t) => t.id === activeTabId) || WHO_WE_ARE_TABS[0];

  return (
    <section 
      id="who-we-are-section" 
      ref={sectionRef}
      className="relative bg-[#f4eae2] py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden border-t border-white/40"
    >
      
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
          
          {/* LEFT SIDE: OVERLAPPING IMAGES COLLAGE with Neumorphic framing */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            {/* Dots array backing the overlapping stack */}
            <div className="absolute -left-4 top-10 grid grid-cols-6 gap-2 opacity-15">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-church-rose" />
              ))}
            </div>

            {/* Behind/Top-Right Image Frame */}
            <motion.div 
              style={{ y: yBehind }}
              className="relative w-4/5 ml-auto rounded-2xl bg-white p-2 shadow-neu-flat z-10"
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="/images/youth-camp-kids.webp"
                  alt="Children at the Students and Youth Camp"
                  className="w-full h-auto aspect-[12/5] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
              </div>
            </motion.div>

            {/* Overlapping Bottom-Left Image Frame */}
            <motion.div 
              style={{ y: yFront }}
              className="relative w-3/5 mr-auto -mt-16 rounded-2xl bg-white p-2 shadow-neu-flat z-20"
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="/images/40-years.webp"
                  alt="Charismatic Evangelicals: 40 years of rescuing the youth"
                  className="w-full aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />
                                {/* Little Water Splash Accent Tag */}
              </div>
            </motion.div>

            {/* 🟢 EXACT ACCENT RED LINE: runs behind baptism, heading to the right (from Screenshot 1) */}
            <div className="absolute left-[30%] bottom-[8%] w-[65%] h-1 bg-church-burgundy rounded-full z-15 hidden md:block opacity-80" />

          </div>

          {/* RIGHT SIDE: INTERACTIVE TABS & COPY with Tactile Neumorphic Controls */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left z-20">
            
            {/* Soft sliding segment selector wrapper */}
            <div className="flex flex-wrap items-center gap-1.5 bg-black/[0.04] p-1 rounded-full max-w-max">
              {WHO_WE_ARE_TABS.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`px-4.5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white text-church-burgundy shadow-neu-flat-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
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
                <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  {currentTab.title}
                </h3>

                {/* Elaborate Description */}
                <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed font-sans max-w-xl">
                  {currentTab.content}
                </p>

                {/* Bullets lists */}
                <div className="mt-6 space-y-3">
                  {currentTab.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 max-w-lg">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-1 text-[#8a1e25]" />
                      <span className="text-sm text-slate-700">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
