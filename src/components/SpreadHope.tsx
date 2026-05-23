import React, { useState, useEffect } from "react";
import { Heart, Landmark, GraduationCap, Soup, Footprints, ArrowRight, ArrowLeft, BookOpen, Quote, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Prominent, diverse, and inspiring Bible verses spanning Genesis through Revelation (30 in total)
const ALL_VERSES = [
  {
    text: "In the beginning, God created the heavens and the earth.",
    ref: "Genesis 1:1",
    tag: "THE CREATION",
    sparkle: "🌎"
  },
  {
    text: "The Lord will fight for you; you need only to be still.",
    ref: "Exodus 14:14",
    tag: "DIVINE PROTECTION",
    sparkle: "🛡️"
  },
  {
    text: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.",
    ref: "Deuteronomy 31:6",
    tag: "COURAGE & FAITH",
    sparkle: "🦁"
  },
  {
    text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    ref: "Joshua 1:9",
    tag: "DIVINE STRENGTH",
    sparkle: "⚡"
  },
  {
    text: "The Lord is my shepherd, I lack nothing.",
    ref: "Psalm 23:1",
    tag: "GOOD SHEPHERD",
    sparkle: "🐑"
  },
  {
    text: "God is our refuge and strength, an ever-present help in trouble.",
    ref: "Psalm 46:1",
    tag: "REFUGE & HELP",
    sparkle: "🏰"
  },
  {
    text: "Your word is a lamp for my feet, a light on my path.",
    ref: "Psalm 119:105",
    tag: "GUIDANCE & WORD",
    sparkle: "🕯️"
  },
  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    ref: "Proverbs 3:5-6",
    tag: "TRUST & GUIDANCE",
    sparkle: "🛤️"
  },
  {
    text: "For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.",
    ref: "Isaiah 9:6",
    tag: "PRINCE OF PEACE",
    sparkle: "👑"
  },
  {
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    ref: "Isaiah 40:31",
    tag: "RENEWED EAGLES",
    sparkle: "🦅"
  },
  {
    text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    ref: "Isaiah 41:10",
    tag: "UPHOLDING GRACE",
    sparkle: "✊"
  },
  {
    text: "For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.",
    ref: "Jeremiah 29:11",
    tag: "FUTURE & HOPE",
    sparkle: "🌾"
  },
  {
    text: "Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
    ref: "Lamentations 3:22-23",
    tag: "MORNING MERCY",
    sparkle: "🌅"
  },
  {
    text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.",
    ref: "Micah 6:8",
    tag: "WALK HUMBLY",
    sparkle: "👣"
  },
  {
    text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    ref: "Matthew 6:33",
    tag: "SEEK FIRST",
    sparkle: "💎"
  },
  {
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    ref: "Matthew 11:28",
    tag: "HEAVENLY REST",
    sparkle: "🍃"
  },
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    ref: "John 3:16",
    tag: "ETERNAL LIFE",
    sparkle: "❤️"
  },
  {
    text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    ref: "SURPASSING PEACE",
    sparkle: "🕊️"
  },
  {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    ref: "Romans 8:28",
    tag: "PROVIDENCE",
    sparkle: "🧩"
  },
  {
    text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will.",
    ref: "Romans 12:2",
    tag: "TRANSFORMATION",
    sparkle: "💭"
  },
  {
    text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
    ref: "Romans 15:13",
    tag: "OVERFLOW HOPE",
    sparkle: "✨"
  },
  {
    text: "And now these three remain: faith, hope and love. But the greatest of these is love.",
    ref: "1 Corinthians 13:13",
    tag: "GREATEST IS LOVE",
    sparkle: "💖"
  },
  {
    text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.",
    ref: "Galatians 5:22-23",
    tag: "FRUIT OF SPIRIT",
    sparkle: "🍎"
  },
  {
    text: "By grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.",
    ref: "Ephesians 2:8-9",
    tag: "SAVED BY GRACE",
    sparkle: "🎁"
  },
  {
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    ref: "Philippians 4:6-7",
    tag: "ANXIOUS TO PEACE",
    sparkle: "🙏"
  },
  {
    text: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.",
    ref: "Colossians 3:17",
    tag: "DO ALL FOR HIM",
    sparkle: "✍️"
  },
  {
    text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
    ref: "Hebrews 11:1",
    tag: "ASSURED FAITH",
    sparkle: "⚓"
  },
  {
    text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
    ref: "James 1:5",
    tag: "ASK WISDOM",
    sparkle: "🎓"
  },
  {
    text: "Cast all your anxiety on him because he cares for you.",
    ref: "1 Peter 5:7",
    tag: "DIVINE CARE",
    sparkle: "🎈"
  },
  {
    text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
    ref: "Revelation 21:4",
    tag: "NEW CREATION",
    sparkle: "⛅"
  }
];

// Helper to shuffle a numeric selection array securely
function shuffleIndices(array: number[]): number[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Format the calendar date uniquely for timezone independence
function getLocalDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function SpreadHope() {
  const [activeOutreachIndex, setActiveOutreachIndex] = useState<number | null>(null);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<"next" | "prev" | "none">("none");
  
  // Default selection is the first 5 verses, then updated dynamically inside mounting useEffect
  const [currentSelection, setCurrentSelection] = useState<number[]>([0, 1, 2, 3, 4]);

  // Handle daily shuffle storage cycle natively in React
  useEffect(() => {
    const today = getLocalDateString();
    const lastDate = localStorage.getItem("bible_verses_last_shown_date");
    const storedSelection = localStorage.getItem("bible_verses_current_daily_selection");
    const storedRemaining = localStorage.getItem("bible_verses_remaining_indices");

    let currentSelectionIndices: number[] = [];
    let remainingIndices: number[] = [];

    // Attempt to read remaining pool
    if (storedRemaining) {
      try {
        remainingIndices = JSON.parse(storedRemaining);
      } catch (e) {
        remainingIndices = [];
      }
    }

    // Attempt to read today's selection
    if (storedSelection) {
      try {
        currentSelectionIndices = JSON.parse(storedSelection);
      } catch (e) {
        currentSelectionIndices = [];
      }
    }

    const allIndices = Array.from({ length: ALL_VERSES.length }, (_, i) => i);

    const isNewDay = lastDate !== today;
    const isMalformed = currentSelectionIndices.length !== 5 || currentSelectionIndices.some(
      idx => idx < 0 || idx >= ALL_VERSES.length
    );

    if (isNewDay || isMalformed) {
      // Must draw 5 new indices
      let nextSelection: number[] = [];

      if (remainingIndices.length < 5) {
        // Carry forward any leftover elements
        const leftOver = [...remainingIndices];

        // Replenish the pool with all 30 elements
        let pool = [...allIndices];

        // Prevent immediate duplicates on this rollover day by filtering leftovers initially
        pool = pool.filter(idx => !leftOver.includes(idx));

        const shuffledPool = shuffleIndices(pool);

        // Fill out remaining slots to make exactly 5 selection items
        const needed = 5 - leftOver.length;
        nextSelection = [...leftOver, ...shuffledPool.slice(0, needed)];
        remainingIndices = shuffledPool.slice(needed);
      } else {
        // Pool has abundant numbers: draw 5
        nextSelection = remainingIndices.slice(0, 5);
        remainingIndices = remainingIndices.slice(5);
      }

      currentSelectionIndices = nextSelection;

      // Update local storage
      localStorage.setItem("bible_verses_last_shown_date", today);
      localStorage.setItem("bible_verses_current_daily_selection", JSON.stringify(currentSelectionIndices));
      localStorage.setItem("bible_verses_remaining_indices", JSON.stringify(remainingIndices));
    }

    setCurrentSelection(currentSelectionIndices);
  }, []);

  const totalVerses = 5;
  const nextVerseIndex = (currentVerseIndex + 1) % totalVerses;
  const nextNextVerseIndex = (currentVerseIndex + 2) % totalVerses;

  // Resolve loaded scripture metadata safely, falling back to safe initial indices
  const activeVerse = ALL_VERSES[currentSelection[currentVerseIndex]] || ALL_VERSES[0];
  const nextVerse = ALL_VERSES[currentSelection[nextVerseIndex]] || ALL_VERSES[1];
  const nextNextVerse = ALL_VERSES[currentSelection[nextNextVerseIndex]] || ALL_VERSES[2];

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
    <section id="hope-section" className="relative bg-[#f4eae2] py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden border-b border-white/40">
      
      {/* 🟢 BOTTOM LEFT ORNAMENT: Small dot grids */}
      <div className="absolute bottom-[10%] left-[5%] hidden md:grid grid-cols-5 gap-2 opacity-15 pointer-events-none z-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-church-burgundy" />
        ))}
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: TACTILE, SWIPABLE DAILY BIBLE VERSES WITH SLANTED STACK */}
          <div className="md:col-span-6 flex flex-col items-center justify-center z-10 w-full mb-10 md:mb-0">
            <div className="relative w-full max-w-sm h-[390px] flex items-center justify-center select-none">
              
              {/* Soft beveled backplate beneath the stack to ground the physical design */}
              <div className="absolute -left-4 -top-4 w-32 h-32 rounded-[32px] bg-[#f4eae2] border border-white/65 shadow-neu-flat-sm z-0 pointer-events-none" />
              <div className="absolute -right-3 -bottom-3 w-24 h-24 rounded-3xl border border-[#8a1e25]/15 z-0 pointer-events-none" />

              {/* CARD 3: Bottom-most card (Slanted nicely to the right) */}
              <div 
                className="absolute w-full h-[340px] rounded-[32px] bg-[#f4eae2] border border-white/45 p-6 shadow-neu-flat-sm flex flex-col justify-between transform rotate-4 translate-x-3 translate-y-3 z-0 opacity-40 transition-all duration-300 pointer-events-none"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#8a1e25]/60 font-black">
                    {nextNextVerse.tag}
                  </span>
                  <span className="text-[10px]">{nextNextVerse.sparkle}</span>
                </div>
                <div className="my-auto pr-2">
                  <p className="font-serif font-semibold italic text-slate-700/60 text-xs md:text-sm leading-relaxed text-left line-clamp-4">
                    "{nextNextVerse.text}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-black/5 pt-3">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400 font-bold">
                    {nextNextVerse.ref}
                  </span>
                  <BookOpen className="h-3 w-3 text-[#8a1e25]/30" />
                </div>
              </div>

              {/* CARD 2: Middle card (Slanted nicely to the left) */}
              <div 
                className="absolute w-full h-[340px] rounded-[32px] bg-[#f4eae2] border border-white/55 p-7 shadow-neu-flat flex flex-col justify-between transform -rotate-3 -translate-x-2.5 translate-y-1.5 z-10 opacity-75 transition-all duration-300 pointer-events-none"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#8a1e25]/80 font-black">
                    {nextVerse.tag}
                  </span>
                  <span className="text-[10px]">{nextVerse.sparkle}</span>
                </div>
                <div className="my-auto pr-2">
                  <p className="font-serif font-semibold italic text-slate-700/80 text-xs md:text-sm leading-relaxed text-left line-clamp-4">
                    "{nextVerse.text}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-black/5 pt-3.5">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500 font-bold">
                    {nextVerse.ref}
                  </span>
                  <BookOpen className="h-3 w-3 text-[#8a1e25]/60" />
                </div>
              </div>

              {/* CARD 1: Top Interactive swipable Card (fully animated, drag-ready) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVerseIndex}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 70) {
                      setSlideDir("prev");
                      setCurrentVerseIndex((prev) => (prev - 1 + totalVerses) % totalVerses);
                    } else if (info.offset.x < -70) {
                      setSlideDir("next");
                      setCurrentVerseIndex((prev) => (prev + 1) % totalVerses);
                    }
                  }}
                  whileDrag={{ scale: 1.02, rotate: 0 }}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.94, 
                    x: slideDir === "prev" ? -140 : slideDir === "next" ? 140 : -100, 
                    rotate: slideDir === "prev" ? -12 : slideDir === "next" ? 12 : -5 
                  }}
                  animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.92, 
                    x: slideDir === "prev" ? 160 : slideDir === "next" ? -160 : 125, 
                    rotate: slideDir === "prev" ? 14 : slideDir === "next" ? -14 : 10 
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute w-full h-[340px] rounded-[32px] bg-[#f4eae2] border border-white/75 p-8 shadow-neu-flat flex flex-col justify-between z-20 cursor-grab active:cursor-grabbing relative overflow-hidden"
                >
                  {/* Absolute watermark reflection highlight */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[32px]" />
                  
                  {/* Subtle quote icon background for deep theological aesthetic */}
                  <div className="absolute top-12 right-6 opacity-[0.04] pointer-events-none text-[#8a1e25] z-0">
                    <Quote className="h-28 w-28 stroke-[3]" />
                  </div>

                  {/* Header decoration inside top card */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f4eae2] border border-white/60 px-3 py-1 text-[8px] font-black tracking-widest text-[#8a1e25] uppercase shadow-neu-flat-sm">
                      <Sparkles className="h-3 w-3 text-[#8a1e25]" />
                      <span>{activeVerse.tag}</span>
                    </div>
                    <span className="text-xs filter drop-shadow-sm select-none">{activeVerse.sparkle}</span>
                  </div>

                  {/* Main Scripture Text section inside top card */}
                  <div className="my-auto relative z-10 py-2">
                    <Quote className="h-4.5 w-4.5 text-[#8a1e25]/40 mb-2 leading-none" />
                    <p className="font-serif font-bold italic text-slate-800 text-sm md:text-base leading-relaxed text-left">
                      {activeVerse.text}
                    </p>
                  </div>

                  {/* Footer section inside top card */}
                  <div className="flex items-center justify-between border-t border-black/5 pt-4 relative z-10">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#8a1e25] font-black">
                      {activeVerse.ref}
                    </span>
                    <div className="flex items-center gap-1 text-[8px] font-mono font-bold text-slate-400 font-sans">
                      <span>SWIPE</span>
                      <ArrowRight className="h-3 w-3 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* NEUMORPHIC CARD CONTROLS: Cycle manually */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => {
                  setSlideDir("prev");
                  setCurrentVerseIndex((prev) => (prev - 1 + totalVerses) % totalVerses);
                }}
                aria-label="Previous daily scripture"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4eae2] border border-white/60 text-slate-700 hover:text-[#8a1e25] shadow-neu-flat hover:shadow-neu-inset transition-all active:scale-90 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              
              <div className="flex items-center gap-1 bg-[#f4eae2] px-3.5 py-1.5 rounded-full shadow-neu-inset border border-white/30 text-[9px] font-mono font-black text-[#8a1e25] tracking-widest">
                <span>{currentVerseIndex + 1}</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-500">{totalVerses}</span>
              </div>

              <button
                onClick={() => {
                  setSlideDir("next");
                  setCurrentVerseIndex((prev) => (prev + 1) % totalVerses);
                }}
                aria-label="Next daily scripture"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4eae2] border border-white/60 text-slate-700 hover:text-[#8a1e25] shadow-neu-flat hover:shadow-neu-inset transition-all active:scale-90 cursor-pointer"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
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
              <div className="space-y-4">
                {outreachProjects.map((proj, idx) => {
                  const Icon = proj.icon;
                  const isOpen = activeOutreachIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className={`border border-white/40 bg-[#f4eae2] rounded-2xl overflow-hidden transition-all duration-300 ${
                        isOpen ? "shadow-neu-inset" : "shadow-neu-flat-sm"
                      }`}
                    >
                      <button
                        onClick={() => setActiveOutreachIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4.5 text-left focus:outline-none cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-[#f4eae2] shadow-neu-flat-sm border border-white/50 text-[#8a1e25]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-xs md:text-sm font-bold text-slate-900 tracking-tight">
                            {proj.title}
                          </span>
                        </div>
                        <ArrowRight className={`h-4 w-4 text-[#8a1e25] transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="px-5 pb-4 pt-1 border-t border-black/5"
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
