import React, { useState } from "react";
import { Heart, Landmark, GraduationCap, Soup, Footprints, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function SpreadHope() {
  const [activeOutreachIndex, setActiveOutreachIndex] = useState<number | null>(null);

  const outreachProjects = [
    {
      title: "West End Community Soup Kitchen",
      action: "Serving meals & distributing hygiene kits",
      time: "Saturdays 8:30 AM — 1:00 PM",
      lead: "Evelyn Jones & Deacon Thomas",
      icon: Soup,
      color: "border-church-burgundy text-church-burgundy bg-church-burgundy/5"
    },
    {
      title: "Charismatic Youth Homework Club",
      action: "Free mentoring and snacks for inner-city teens",
      time: "Tuesdays & Thursdays 4:00 PM — 6:30 PM",
      lead: "Gabriella Silva",
      icon: GraduationCap,
      color: "border-church-rose text-church-rose bg-church-rose/5"
    },
    {
      title: "Elderly Companionship & Care Walks",
      action: "Visiting care homes and singing classic hymns",
      time: "Sundays 3:00 PM — 5:00 PM",
      lead: "Pastor Brenda Campbell",
      icon: Footprints,
      color: "border-rose-400 text-rose-500 bg-rose-500/5"
    }
  ];

  return (
    <section id="hope-section" className="relative bg-[#FAF8F6] py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden border-b border-[#E0D5CF]">
      
      {/* 🟢 BOTTOM LEFT ORNAMENT: Small dot grids */}
      <div className="absolute bottom-[10%] left-[5%] hidden md:grid grid-cols-5 gap-2 opacity-15 pointer-events-none z-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-church-burgundy" />
        ))}
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Food Packing/Volunteer Photo */}
          <div className="md:col-span-6 relative flex justify-center z-10 w-full mb-6 md:mb-0">
            {/* Outline box behind under volunteer image */}
            <div className="absolute -left-4 -top-4 w-28 h-28 bg-church-burgundy/10 rounded-xl z-0" />
            
            <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-2xl z-10 border border-slate-100 transform hover:scale-[1.01] transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd2457b26b20?auto=format&fit=crop&w=800&h=550&q=80"
                alt="Volunteers Packing outreach food baskets in high faith"
                className="w-full h-[320px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-rose-950/10 mix-blend-color" />
              {/* Joyful Serve Tag */}
              <div className="absolute bottom-3 right-3 bg-church-burgundy text-white font-display text-[9px] font-extrabold py-1.5 px-3 uppercase rounded shadow-lg transform rotate-1">
                Serving Hope Locally
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Header (with leading line), Body Prose, & Interactive Outreach Accordion */}
          <div className="md:col-span-6 flex flex-col items-start text-left z-20">
            
            {/* Header: line leading into header "spread hope" */}
            <div className="flex items-center gap-4 w-full mb-6 max-w-lg">
              {/* Leading burgundy bar */}
              <div className="h-[3px] bg-church-burgundy rounded-full w-20 opacity-90 hidden sm:block" />
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 uppercase shrink-0">
                spread hope
              </h2>
            </div>

            {/* Prose copy with exact and expanded inspiring text (from Screenshot 2) */}
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-sans max-w-md">
              In the goodness of God, He calls us to consider others above ourselves. 
              He commands us to serve one another humbly, in love. He reminds us it’s 
              more blessed to give than to receive. And He models for us genuine kindness, 
              compassionate justice, and sacrificial love. In His name, we serve our 
              neighbors locally and globally, spreading the hope of Jesus to people in need. 
              And you can, too.
            </p>

            {/* Interactive Section for outreach engagement */}
            <div className="mt-8 w-full max-w-md">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#8a1e25] font-extrabold mb-3">
                JOIN AN OUTREACH INITIATIVE THIS WEEK
              </h4>
              <div className="space-y-2">
                {outreachProjects.map((proj, idx) => {
                  const Icon = proj.icon;
                  const isOpen = activeOutreachIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-[#E0D5CF]/80 bg-[#FCFAF9] rounded-xl overflow-hidden shadow-xs hover:border-church-burgundy transition-all"
                    >
                      <button
                        onClick={() => setActiveOutreachIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-3 text-left focus:outline-none cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg border ${proj.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-xs md:text-sm font-bold text-slate-900 tracking-tight">
                            {proj.title}
                          </span>
                        </div>
                        <ArrowRight className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-90 text-church-burgundy" : ""}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="px-3.5 pb-3 pt-1 border-t border-[#E0D5CF]/40 bg-rose-50/10"
                          >
                            <p className="text-xs text-slate-600 font-sans leading-relaxed">
                              <span className="font-bold text-slate-800">What:</span> {proj.action}
                            </p>
                            <p className="text-xs text-slate-500 font-sans mt-1">
                              <span className="font-bold text-slate-800">When:</span> {proj.time}
                            </p>
                            <p className="text-xs text-slate-500 font-mono mt-1 text-church-burgundy font-semibold">
                              Leader: {proj.lead}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
