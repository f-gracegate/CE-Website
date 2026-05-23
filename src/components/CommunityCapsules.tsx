import React, { useState } from "react";
import { COMMUNITY_MEMBERS } from "../data";
import { Sparkles, MessageSquareHeart, Check, Calendar, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CommunityMember } from "../types";

interface CommunityCapsulesProps {
  onJoinGroup: () => void;
  onOpenTestimony: (member: CommunityMember) => void;
}

export default function CommunityCapsules({ onJoinGroup, onOpenTestimony }: CommunityCapsulesProps) {
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

  // Staggered absolute/translate specs to recreate the lovely overlaps of Screenshot 5
  const layoutSpecs: Record<string, string> = {
    sarah: "translate-y-0 sm:translate-y-4 shadow-amber-500/10",
    elijah: "translate-y-8 sm:translate-y-12 shadow-violet-500/10",
    gabriella: "translate-y-[-10px] sm:translate-y-[-20px] shadow-emerald-500/10",
    "pastor-thomas": "translate-y-10 sm:translate-y-6 shadow-rose-500/10",
    clara: "translate-y-0 sm:translate-y-14 shadow-sky-500/10"
  };

  return (
    <section id="community-section" className="relative bg-[#f4eae2] py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden border-t border-white/40">
      
      {/* Background radial lighting effects with rose branding */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-20 left-10 w-[450px] h-[450px] rounded-full bg-rose-500/5 blur-[150px]" />
        <div className="absolute top-[20%] right-[10%] w-[380px] h-[380px] rounded-full bg-rose-500/5 blur-[120px]" />
        
        {/* Subtle decorative dot array */}
        <div className="absolute top-10 right-10 opacity-10 grid grid-cols-4 gap-2 text-church-burgundy">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-current" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT COLUMN: Regs-style Titles, Description & Interactive action lines */}
          <div className="lg:col-span-12 xl:col-span-5 text-left flex flex-col items-start z-20">
            
            {/* Round Neon capsule tag */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f4eae2] border border-white/60 px-3.5 py-1.5 text-[9px] font-black tracking-widest text-[#8a1e25] uppercase shadow-neu-flat-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Vibrant Fellowship</span>
            </div>

            {/* Title (Screenshot 5 inspired bold uppercase display) */}
            <h2 className="mt-6 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 uppercase leading-[0.95] max-w-md">
              Deep Fellowship Is Just The <br className="hidden sm:inline" />
              <span className="text-church-burgundy">Beginning</span>
            </h2>

            {/* Description pitch */}
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-sm">
              We help you build life-changing spiritual habits through interactive home groups, 
              intimate small gatherings, and dynamic prayer circles where you aren't just a face in the crowd.
            </p>

            {/* Two Action buttons styled in Neumorphism */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={onJoinGroup}
                className="rounded-full bg-[#8a1e25] hover:bg-[#a1232c] text-white font-black text-xs tracking-widest px-6 py-4.5 transition-all text-center shadow-[4px_4px_10px_#d3c3b8,-4px_-4px_10px_#ffffff] active:scale-95 cursor-pointer uppercase border border-[#8a1e25]"
              >
                Join a Gathering
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById("hero-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full bg-[#f4eae2] border border-white/60 text-church-burgundy hover:text-rose-600 font-black text-xs tracking-widest px-6 py-4.5 transition-all text-center shadow-neu-flat hover:shadow-neu-inset active:scale-95 cursor-pointer uppercase"
              >
                Watch Service Live
              </button>
            </div>

            {/* Quote bubble tag at bottom left with Neumorphic card */}
            <div className="mt-12 p-4 bg-[#f4eae2] border border-white/60 rounded-[24px] flex items-center gap-3.5 max-w-sm group shadow-neu-flat">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4eae2] text-church-burgundy border border-white/35 shadow-neu-inset group-hover:scale-105 transition-transform">
                <MessageSquareHeart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#1f0b0c] tracking-tight">
                  Over 180 Home Circles Live
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-normal font-sans">
                  Happening weekly in London, Birmingham, Manchester & Online.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Spectacular staggered vertical capsule grid */}
          <div className="lg:col-span-12 xl:col-span-7 relative z-10 w-full pt-10 sm:pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 md:gap-4.5 items-end">
              {COMMUNITY_MEMBERS.map((member) => {
                const isHovered = hoveredMemberId === member.id;
                const offsetClass = layoutSpecs[member.id] || "";
                
                return (
                  <div
                    key={member.id}
                    onMouseEnter={() => setHoveredMemberId(member.id)}
                    onMouseLeave={() => setHoveredMemberId(null)}
                    onClick={() => onOpenTestimony(member)}
                    className={`relative rounded-full p-1 bg-[#f4eae2] border border-white/45 transition-all duration-500 cursor-pointer group ${member.height} ${offsetClass} ${
                      isHovered 
                        ? "scale-[1.05] z-[25] -translate-y-3 shadow-neu-flat" 
                        : "shadow-neu-flat-sm z-10"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      {/* Background colorful container backing clipping of people */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/80" />
  
                      {/* Image of person popping up inside */}
                      <img
                        src={member.image}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 origin-bottom filter object-top"
                      />
  
                      {/* Glowing particle hover accent */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-transparent opacity-90" />
  
                      {/* Details: Name, role and icon positioned on hover */}
                      <div className="absolute bottom-5 inset-x-2 text-center flex flex-col items-center">
                        <div className="bg-slate-950/90 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-slate-800/80 mb-1 max-w-[90%] transition-colors duration-300 group-hover:border-[#d2737d]/40">
                          <p className="text-[10px] sm:text-[11px] font-black text-white tracking-tight truncate">
                            {member.name.split(" ")[0]}
                          </p>
                          <p className="text-[8px] sm:text-[9px] text-[#d2737d] font-mono tracking-wider font-semibold truncate uppercase mt-0.5">
                            {member.role}
                          </p>
                        </div>
  
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8a1e25] text-white shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform"
                        >
                          <ArrowUpRight className="h-3 w-3 stroke-[3]" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Light border reflection */}
                    <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-full" />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
