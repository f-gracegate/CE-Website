import React from "react";
import { Users2, ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface FindBelongingProps {
  onJoinGroup: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  },
};

export default function FindBelonging({ onJoinGroup }: FindBelongingProps) {
  
  // Grid of plus-signs coordinates representing the pattern from Screenshot 2
  const plusSigns = Array.from({ length: 24 });

  return (
    <section id="belonging-section" className="relative py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden border-t border-white/40">
      
      {/* 💠 TOP LEFT ORNAMENT: Diamond array outlined in brand burgundy */}
      <div className="absolute top-[10%] left-[8%] hidden md:grid grid-cols-6 gap-3 opacity-20">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 border border-church-burgundy rotate-45" />
        ))}
      </div>

      <motion.div 
        className="mx-auto max-w-7xl relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Narrative & Call to Action (Screenshot 2 layout) */}
          <motion.div 
            variants={itemVariants}
            className="order-2 md:order-1 md:col-span-6 flex flex-col items-start text-left z-20"
          >
            
            {/* Header with burgundy bar going left to right (from Screenshot 2) */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 w-full mb-6 max-w-lg">
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 shrink-0">
                Find belonging
              </h2>
              {/* Burgundy horizontal bar */}
              <div className="h-[3px] bg-church-burgundy rounded-full w-full opacity-90 hidden sm:block" />
            </motion.div>

            {/* Description Copy */}
            <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-600 leading-relaxed font-sans max-w-md">
              God created us for community, to know and be known by others. In small groups we pursue 
              a relationship with Him, build meaningful connections with others, and compassionately 
              love and serve our communities. Join a group and say hello to your church family.
            </motion.p>

            {/* FIND A GROUP Filled Burgundy Button */}
            <motion.button
              variants={itemVariants}
              onClick={onJoinGroup}
              className="mt-8 group btn-tactile px-6 py-3 text-sm"
            >
              <Users2 className="h-4 w-4" />
              <span>Find a group</span>
              <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>

          </motion.div>

          {/* RIGHT COLUMN: Cozy Fellowship Image & Overlapping Plus Sign Grid */}
          <motion.div 
            variants={itemVariants}
            className="order-1 md:order-2 md:col-span-6 flex justify-center z-10 w-full"
          >
            <div className="relative w-full max-w-md">
              {/* ➕ OVERLAPPING PLUS MATRIX: anchored precisely to the right side of the image container */}
              <div className="absolute -right-3 -bottom-5 hidden sm:grid grid-cols-6 gap-x-6 gap-y-4 text-church-rose/30 font-display text-xs select-none pointer-events-none z-0">
                {plusSigns.map((_, i) => (
                  <div key={i} className="font-light">+</div>
                ))}
              </div>

              {/* Group Bible study / couch connection image inside Neumorphic Bezel Frame */}
              <div className="rounded-[28px] glass p-2 w-full relative z-10 lift">
                <div className="relative">
                  <img
                    src="/images/40-years-collage.webp"
                    alt="Young people worshipping together"
                    className="w-full h-[320px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Cozy tint overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
