import React from "react";
import { Users2, ArrowRight } from "lucide-react";

interface FindBelongingProps {
  onJoinGroup: () => void;
}

export default function FindBelonging({ onJoinGroup }: FindBelongingProps) {
  
  // Grid of plus-signs coordinates representing the pattern from Screenshot 2
  const plusSigns = Array.from({ length: 24 });

  return (
    <section id="belonging-section" className="relative bg-[#EDE6E2] py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden border-t border-[#E0D5CF]">
      
      {/* 💠 TOP LEFT ORNAMENT: Diamond array outlined in brand burgundy */}
      <div className="absolute top-[10%] left-[8%] hidden md:grid grid-cols-6 gap-3 opacity-20">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 border border-church-burgundy rotate-45" />
        ))}
      </div>

      <div className="mx-auto max-w-7xl relative">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Narrative & Call to Action (Screenshot 2 layout) */}
          <div className="order-2 md:order-1 md:col-span-6 flex flex-col items-start text-left z-20">
            
            {/* Header with burgundy bar going left to right (from Screenshot 2) */}
            <div className="flex items-center gap-4 w-full mb-6 max-w-lg">
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 uppercase shrink-0">
                find belonging
              </h2>
              {/* Burgundy horizontal bar */}
              <div className="h-[3px] bg-church-burgundy rounded-full w-full opacity-90 hidden sm:block" />
            </div>

            {/* Description Copy */}
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-sans max-w-md">
              God created us for community, to know and be known by others. In Groups, we pursue 
              a relationship with Him, build meaningful connections with others, and compassionately 
              love and serve our communities. Join a Group today and say hello to your church family.
            </p>

            {/* FIND A GROUP Filled Burgundy Button */}
            <button
              onClick={onJoinGroup}
              className="mt-8 group flex items-center gap-2.5 rounded bg-church-burgundy px-6 py-3 text-xs font-extrabold uppercase tracking-widest text-white hover:bg-[#a1232c] transition-all cursor-pointer shadow-lg shadow-rose-950/10"
            >
              <Users2 className="h-4 w-4" />
              <span>FIND A GROUP</span>
              <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

          {/* RIGHT COLUMN: Cozy Fellowship Image & Overlapping Plus Sign Grid */}
          <div className="order-1 md:order-2 md:col-span-6 relative flex justify-center z-10 w-full">
            
            {/* ➕ OVERLAPPING PLUS MATRIX: on the right side of the image */}
            <div className="absolute right-[-10px] bottom-[-20px] hidden sm:grid grid-cols-6 gap-x-6 gap-y-4 text-church-rose/30 font-display text-xs select-none pointer-events-none z-0">
              {plusSigns.map((_, i) => (
                <div key={i} className="font-light">+</div>
              ))}
            </div>

            {/* Group Bible study / couch connection image with shadow and rounded corners */}
            <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-2xl z-10 border border-slate-100 transform hover:scale-[1.01] transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&h=550&q=80"
                alt="Church Small Group Bible Study Circle"
                className="w-full h-[320px] object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Cozy tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
