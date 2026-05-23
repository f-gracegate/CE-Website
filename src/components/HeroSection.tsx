import React, { useState } from "react";
import { Play, MapPin, ChevronRight, HelpCircle, FileText, Clock, Calendar, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CHURCH_LOCATIONS } from "../data";

interface ServiceDate {
  day: number; // 0 for Sunday, 3 for Wednesday
  hour: number;
  minute: number;
  label: string;
}

const getLocationServices = (locationId: string): ServiceDate[] => {
  switch (locationId) {
    case "london-central":
      return [
        { day: 0, hour: 9, minute: 30, label: "Sunday 9:30 AM" },
        { day: 0, hour: 11, minute: 30, label: "Sunday 11:30 AM" },
        { day: 0, hour: 18, minute: 0, label: "Sunday 6:00 PM (Youth)" }
      ];
    case "birmingham":
      return [
        { day: 0, hour: 10, minute: 0, label: "Sunday 10:00 AM" },
        { day: 0, hour: 12, minute: 0, label: "Sunday 12:00 PM" }
      ];
    case "manchester":
      return [
        { day: 0, hour: 9, minute: 0, label: "Sunday 9:00 AM" },
        { day: 0, hour: 11, minute: 0, label: "Sunday 11:00 AM" },
        { day: 0, hour: 17, minute: 0, label: "Sunday 5:00 PM" }
      ];
    case "online-global":
      return [
        { day: 0, hour: 11, minute: 30, label: "Sunday 11:30 AM GMT" },
        { day: 3, hour: 19, minute: 30, label: "Wednesday 7:30 PM (Prayer)" }
      ];
    default:
      return [
        { day: 0, hour: 9, minute: 0, label: "Sunday 9:00 AM" }
      ];
  }
};

const getNextOccurrence = (now: Date, service: ServiceDate): Date => {
  const result = new Date(now);
  result.setHours(service.hour, service.minute, 0, 0);
  
  const currentDay = now.getDay();
  let daysUntil = service.day - currentDay;
  
  if (daysUntil < 0) {
    daysUntil += 7;
  } else if (daysUntil === 0) {
    if (now.getTime() > result.getTime()) {
      daysUntil = 7;
    }
  }
  
  result.setDate(now.getDate() + daysUntil);
  return result;
};

const getNextService = (now: Date, locationId: string) => {
  const services = getLocationServices(locationId);
  let nextServiceDate: Date | null = null;
  let nextServiceLabel = "";
  let minDiff = Infinity;
  
  services.forEach((srv) => {
    const occ = getNextOccurrence(now, srv);
    const diff = occ.getTime() - now.getTime();
    if (diff > 0 && diff < minDiff) {
      minDiff = diff;
      nextServiceDate = occ;
      nextServiceLabel = srv.label;
    }
  });
  
  return { date: nextServiceDate, label: nextServiceLabel };
};

interface HeroSectionProps {
  onOpenModal: (type: "locations" | "login" | "give") => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [isPlayingSermon, setIsPlayingSermon] = useState(false);
  const [selectedCampusId, setSelectedCampusId] = useState<string>("london-central");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    label: ""
  });

  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const { date: targetDate, label } = getNextService(now, selectedCampusId);
      
      if (!targetDate) return;
      
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, label });
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      
      setCountdown({ days, hours, minutes, seconds, label });
    };
    
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [selectedCampusId]);

  const handleDownloadStudyGuide = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Length 320 >>
stream
BT
/F1 18 Tf
50 720 Td
(CHARISMATIC EVANGELICALS CHURCH) Tj
/F1 13 Tf
0 -40 Td
(SERMON GUIDE: CHAINS BROKEN BY GRACE) Tj
/F1 10 Tf
0 -30 Td
(Sermon Series: The Gospel of More) Tj
0 -20 Td
(Scripture Focus: Romans 8:1-4 & Galatians 5:1) Tj
0 -35 Td
(Sunday Reflection & Small Group Questions:) Tj
0 -20 Td
(1. What does 'no condemnation' mean for you this week?) Tj
0 -18 Td
(2. Where have you been striving in alignment to rules rather than grace?) Tj
0 -18 Td
(3. In what areas of life is God breaking your internal chains?) Tj
0 -35 Td
(Action Focus & Covenant Prayer:) Tj
0 -18 Td
(Lord, we surrender our limitations. Release us to live and love in grace.) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000240 00000 n 
0000000305 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
675
%%EOF`;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Chains_Broken_By_Grace_Study_Guide.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
    <div id="hero-section" className="relative min-h-[92vh] overflow-hidden bg-[#f4eae2] font-sans pb-32">
      
      {/* 🌟 NEUMORPHIC GLOW BACKGROUND STYLES */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Radial spotlights simulating heavenly presence */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(138,30,37,0.08),rgba(210,115,125,0.05),transparent_60%)] animate-pulse-slow" />
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
            
            {/* Soft highlight micro indicator in rose & burgundy (Neumorphic style badge) */}
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#f4eae2] border border-white/60 px-3 py-1.5 text-[9px] font-extrabold tracking-widest text-[#8a1e25] uppercase shadow-neu-flat-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#8a1e25] animate-pulse" />
              <span>Sermon Series live</span>
            </div>

            {/* Title stacked with distinctive brand styling */}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl uppercase leading-[0.95]">
              welcome
            </h1>
            
            {/* "to more" inside filled bold box from logo colors with extruded shadow */}
            <div className="mt-3 bg-[#8a1e25] px-6 py-3 rounded-[16px] shadow-[6px_6px_15px_#d3c3b8,-3px_-3px_15px_#ffffff] border border-white/10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
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
              className="mt-8 group flex items-center gap-2 rounded-full bg-[#f4eae2] border border-white/60 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-church-burgundy shadow-neu-flat hover:shadow-neu-inset transition-all duration-300 cursor-pointer"
            >
              <MapPin className="h-4 w-4" />
              <span>FIND A LOCATION</span>
              <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>

            {/* 🕰️ NEXT SERVICE COUNTDOWN TIMER WIDGET (Fully Neumorphic) */}
            <div className="mt-10 w-full max-w-sm bg-[#f4eae2] border border-white/60 rounded-[28px] p-5 shadow-neu-flat relative overflow-hidden">
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-black/5 pb-3 mb-3.5">
                <div className="flex items-center gap-2 text-[#8a1e25]">
                  <Clock className="h-4 w-4 animate-pulse-slow" />
                  <span className="text-[10px] font-black uppercase tracking-widest">NEXT SERVICE</span>
                </div>
                
                {/* Campus Selector drop-down inside a neumorphic frame */}
                <div className="relative inline-block">
                  <select
                    value={selectedCampusId}
                    onChange={(e) => setSelectedCampusId(e.target.value)}
                    className="appearance-none bg-[#f4eae2] hover:bg-white/40 border border-white/60 rounded-xl py-1.5 pl-3.5 pr-8 text-[10px] font-bold text-slate-750 hover:text-church-burgundy focus:outline-none transition-colors cursor-pointer uppercase tracking-wider shadow-neu-flat-sm"
                  >
                    {CHURCH_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name.split(" ")[0]} {loc.name.includes("Online") ? "Online" : "Campus"}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center justify-center text-slate-500">
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Target Service Label Info */}
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-4 flex items-center gap-1.5 font-bold">
                <Calendar className="h-3.5 w-3.5 text-church-burgundy/50" />
                Next Service: <span className="text-church-burgundy font-black">{countdown.label}</span>
              </p>

              {/* Countdown Digits Matrix (Concave Pill Sockets) */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#f4eae2] rounded-[16px] p-2.5 shadow-neu-inset border border-white/20">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#1f0b0c] tracking-tighter leading-none">
                    {String(countdown.days).padStart(2, "0")}
                  </div>
                  <div className="text-[7px] font-black text-slate-450 uppercase tracking-wider mt-1.5">days</div>
                </div>
                <div className="bg-[#f4eae2] rounded-[16px] p-2.5 shadow-neu-inset border border-white/20">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#1f0b0c] tracking-tighter leading-none">
                    {String(countdown.hours).padStart(2, "0")}
                  </div>
                  <div className="text-[7px] font-black text-slate-450 uppercase tracking-wider mt-1.5">hours</div>
                </div>
                <div className="bg-[#f4eae2] rounded-[16px] p-2.5 shadow-neu-inset border border-white/20">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#1f0b0c] tracking-tighter leading-none">
                    {String(countdown.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-[7px] font-black text-slate-450 uppercase tracking-wider mt-1.5">mins</div>
                </div>
                <div className="bg-[#f4eae2] rounded-[16px] p-2.5 shadow-neu-inset border border-white/20">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#8a1e25] tracking-tighter leading-none animate-pulse">
                    {String(countdown.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-[7px] font-black text-[#8a1e25]/80 uppercase tracking-wider mt-1.5">secs</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Stage/Sermon Cinematic Media with Double Bezel Neumorphic Framing */}
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

            {/* Thick Double Neumorphic Frame Bezel */}
            <div className="p-4 rounded-[36px] bg-[#f4eae2] border border-white/60 shadow-neu-flat">
              <div className="relative overflow-hidden rounded-[24px] border border-white/40 bg-[#f4eae2] shadow-inner">
                
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
                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-[#8a1e25] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                  <span>REC LIVE</span>
                </div>
  
                {/* Speaker Overlay text */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left z-30">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#d2737d] font-semibold">
                      Sermon Series — The Gospel of More
                    </p>
                    <h3 className="font-display text-lg font-bold text-white uppercase mt-0.5 max-w-xs sm:max-w-md">
                      Chains Broken by Grace
                    </h3>
                  </div>
                  
                  {/* Neumorphic Outset Study Guide Button */}
                  <button
                    onClick={handleDownloadStudyGuide}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#f4eae2] hover:bg-white text-slate-800 hover:text-church-burgundy border border-white px-5 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-neu-flat-sm hover:shadow-neu-inset select-none"
                    title="Download Chains Broken by Grace Study Guide PDF"
                  >
                    <FileText className="h-4 w-4" />
                    <span>DOWNLOAD STUDY GUIDE</span>
                  </button>
                </div>
  
                {/* Interactive Play Circle floating over background with Neumorphic 3D button feel */}
                <button
                  onClick={() => setIsPlayingSermon(true)}
                  className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f4eae2] hover:bg-white border-2 border-white/60 text-[#8a1e25] shadow-neu-flat hover:scale-105 transition-all duration-300 cursor-pointer"
                  aria-label="Play sample sermon video"
                >
                  <Play className="h-7 w-7 fill-current ml-1" />
                </button>
              </div>
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
