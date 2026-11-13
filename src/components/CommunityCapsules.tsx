import React, { useState } from "react";
import { COMMUNITY_MEMBERS } from "../data";
import { ArrowUpRight } from "lucide-react";
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

            {/* Title (Screenshot 5 inspired bold uppercase display) */}
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.05] max-w-md">
              Fellowship is just <span className="text-church-burgundy">the beginning</span>
            </h2>

            {/* Description pitch */}
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-sm">
              Small groups and prayer meetings help you grow in faith with people who know you by name, not just a face in the crowd.
            </p>

            {/* Two Action buttons styled in Neumorphism */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={onJoinGroup}
                className="rounded-lg bg-[#8a1e25] hover:bg-[#6f171d] text-white font-semibold text-sm px-6 py-3 transition-colors text-center cursor-pointer"
              >
                Join a small group
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById("grace-hub-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-lg bg-white border border-church-burgundy/30 hover:border-church-burgundy text-church-burgundy font-semibold text-sm px-6 py-3 transition-colors text-center cursor-pointer"
              >
                See this week
              </button>
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
                    className={`relative ${member.height} ${offsetClass} ${
                      isHovered ? "z-30" : "z-10"
                    } transition-all duration-500`}
                  >
                    <motion.div
                      onMouseEnter={() => setHoveredMemberId(member.id)}
                      onMouseLeave={() => setHoveredMemberId(null)}
                      onClick={() => onOpenTestimony(member)}
                      whileHover={{
                        y: -8,
                                              }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="relative w-full h-full rounded-full p-1 bg-[#f4eae2] border border-white/45 cursor-pointer group shadow-neu-flat-sm"
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
                            <p className="text-[10px] sm:text-[11px] font-semibold text-white tracking-tight truncate">
                              {member.name.split(" ")[0]}
                            </p>
                            <p className="text-[9px] sm:text-[10px] text-[#f0b4ba] truncate mt-0.5">
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
                    </motion.div>
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
