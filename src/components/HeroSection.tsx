"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MapPin, ChevronRight, ChevronLeft, Clock, ChevronDown, Heart, ArrowRight, CalendarDays } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CHURCH_LOCATIONS } from "../data";

const DAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Parse "Sun 10:30 AM GMT" / "Wed 6:30 PM (Midweek)" into a weekday and time (Ghana time = GMT). */
function parseServiceTime(text: string) {
  const m = text.match(/^(\w{3})\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m || DAYS[m[1]] === undefined) return null;
  let hour = Number(m[2]) % 12;
  if (m[4].toUpperCase() === "PM") hour += 12;
  const note = text.match(/\(([^)]+)\)/)?.[1];
  return { day: DAYS[m[1]], hour, minute: Number(m[3]), note };
}

type Upcoming = { date: Date; day: string; time: string; title: string; campus: string; campusId: string };

function upcomingServices(now: Date, campusIds?: string[]): Upcoming[] {
  const out: Upcoming[] = [];
  for (const c of CHURCH_LOCATIONS) {
    if (campusIds && !campusIds.includes(c.id)) continue;
    for (const t of c.serviceTimes) {
      const s = parseServiceTime(t);
      if (!s) continue;
      const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), s.hour, s.minute));
      let add = (s.day - now.getUTCDay() + 7) % 7;
      if (add === 0 && d.getTime() <= now.getTime()) add = 7;
      d.setUTCDate(d.getUTCDate() + add);
      const time = `${((s.hour + 11) % 12) + 1}:${String(s.minute).padStart(2, "0")} ${s.hour < 12 ? "AM" : "PM"}`;
      const title =
        s.note === "Prayer" ? "Prayer meeting" : s.note === "Midweek" ? "Midweek service" : s.day === 0 ? "Sunday service" : "Service";
      out.push({ date: d, day: DAY_NAMES[s.day], time, title, campus: c.name, campusId: c.id });
    }
  }
  return out.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function timeUntil(ms: number) {
  const mins = Math.max(0, Math.floor(ms / 60000));
  const days = Math.floor(mins / 1440);
  const hours = Math.floor((mins % 1440) / 60);
  if (days > 0) return `in ${days} day${days > 1 ? "s" : ""}`;
  if (hours > 0) return `in ${hours} hr${hours !== 1 ? "s" : ""}`;
  return mins > 0 ? `in ${mins} min` : "now";
}

const SLIDES = [
  {
    image: "/images/youth-camp-2026.webp",
    alt: "Youth Camp 2026 flyer: Is there not a Cause? 1 Samuel 17:29b. 19 to 23 December 2026 at Our Lady of Grace Senior High School. Camp fee GH₵150.",
    title: ["Youth", "Camp 2026"],
    caption: "19–23 December · Our Lady of Grace SHS",
    color: "#8a1e25",
    accent: "#a83a42",
  },
  {
    image: "/images/40-years.webp",
    alt: "Charismatic Evangelicals: 40 years of rescuing the youth",
    title: ["40", "years"],
    caption: "Of rescuing the youth",
    color: "#a94a54",
    accent: "#c0646d",
  },
  {
    image: "/images/youth-camp-kids.webp",
    alt: "Children at the Students and Youth Camp",
    title: ["Every", "generation"],
    caption: "Children, students and youth",
    color: "#5e141a",
    accent: "#7c2a31",
  },
];

interface HeroSectionProps {
  onOpenModal: (type: "locations" | "give") => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [campusId, setCampusId] = useState(CHURCH_LOCATIONS[0].id);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const comingUp = useMemo(() => (now ? upcomingServices(now).slice(0, 4) : []), [now]);
  const nextForCampus = useMemo(() => (now ? upcomingServices(now, [campusId])[0] : undefined), [now, campusId]);
  const s = SLIDES[slide];
  const go = (d: number) => setSlide((i) => (i + d + SLIDES.length) % SLIDES.length);

  return (
    <section id="hero-section" className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-20 lg:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl glass-strong rounded-[36px] p-3 sm:p-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Stage: colour panel with a rotating feature image */}
          <motion.div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            animate={{ backgroundColor: s.color }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative lg:col-span-6 overflow-hidden rounded-[28px] min-h-[500px] sm:min-h-[540px]"
            aria-roledescription="carousel"
            aria-label="Church highlights"
          >
            {/* Organic shapes */}
            <motion.div
              animate={{ backgroundColor: s.accent }}
              transition={{ duration: 0.8 }}
              className="absolute -right-24 -top-24 h-80 w-80 rounded-[44%_56%_62%_38%/48%_40%_60%_52%] opacity-70"
            />
            <motion.div
              animate={{ backgroundColor: s.accent }}
              transition={{ duration: 0.8 }}
              className="absolute -left-16 bottom-[-6rem] h-72 w-72 rounded-full opacity-40"
            />

            <div className="relative z-10 p-7 sm:p-9 text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: 16 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-display text-4xl sm:text-5xl font-extrabold leading-[0.95]">
                    {s.title[0]}
                    <br />
                    {s.title[1]}
                  </p>
                  <p className="mt-3 max-w-[16rem] text-sm text-white/80">{s.caption}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.img
                key={s.image}
                src={s.image}
                alt={s.alt}
                initial={reduce ? false : { opacity: 0, y: -60, rotate: -6, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: 40, rotate: 4, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                className="absolute z-10 right-5 bottom-20 sm:right-8 sm:bottom-20 max-h-[46%] sm:max-h-[60%] max-w-[64%] w-auto rounded-2xl object-contain shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/30"
              />
            </AnimatePresence>

            {/* Slide controls */}
            <div className="absolute z-20 left-5 bottom-5 sm:left-7 sm:bottom-6 flex items-center gap-2 rounded-full bg-white/15 p-1.5 backdrop-blur-md ring-1 ring-white/25">
              <button onClick={() => go(-1)} aria-label="Previous highlight" className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer">
                <ChevronLeft className="h-4 w-4" />
              </button>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Show highlight ${i + 1}`}
                  aria-current={i === slide}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${i === slide ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
                />
              ))}
              <button onClick={() => go(1)} aria-label="Next highlight" className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* Welcome + coming up */}
          <div className="lg:col-span-6 flex flex-col px-3 pt-4 pb-6 sm:px-6 lg:pl-4 lg:pr-8 lg:pt-10 lg:pb-24">
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl leading-[1.02]">
              Welcome <span className="text-church-burgundy">to more.</span>
            </h1>
            <p className="mt-5 text-base text-slate-600 leading-relaxed max-w-lg">
              There&rsquo;s more to life than your good deeds or successes, your regrets or mistakes.
              The answer is right in front of you. Let&rsquo;s discover what God has in store.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => onOpenModal("locations")} className="btn-tactile group px-5 py-3 text-sm">
                <MapPin className="h-4 w-4" />
                Find a campus
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button onClick={() => onOpenModal("give")} className="btn-tactile-light px-5 py-3 text-sm">
                <Heart className="h-4 w-4" />
                Give
              </button>
            </div>

            <div className="mt-10">
              <div className="flex items-end justify-between border-b border-black/5 pb-2">
                <h2 className="font-display text-lg font-bold text-slate-900">Coming up</h2>
                <span className="text-xs text-slate-500">Ghana time</span>
              </div>
              <ul className="divide-y divide-black/5">
                {(comingUp.length ? comingUp : Array.from({ length: 4 })).map((u, i) => {
                  const item = u as Upcoming | undefined;
                  return (
                    <li key={i} className="flex items-center gap-4 py-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-church-burgundy shadow-neu-flat-sm">
                        <CalendarDays className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">{item ? item.title : " "}</p>
                        <p className="truncate text-xs text-slate-500">{item ? <>{item.campus} · <span className="hidden sm:inline">{item.day} </span>{item.time}</> : "\u00a0"}</p>
                      </div>
                      <span className="shrink-0 text-xs font-medium text-church-burgundy">
                        {item && now ? timeUntil(item.date.getTime() - now.getTime()) : ""}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Floating toolbar */}
        <div className="relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:-bottom-7 mt-3 lg:mt-0 z-30">
          <div className="glass-strong mx-auto flex w-full lg:w-auto items-center gap-2 rounded-full p-2 pl-4">
            <MapPin className="h-4 w-4 shrink-0 text-church-burgundy" />
            <div className="relative">
              <label htmlFor="hero-campus" className="sr-only">Campus</label>
              <select
                id="hero-campus"
                value={campusId}
                onChange={(e) => setCampusId(e.target.value)}
                className="appearance-none bg-transparent py-1.5 pr-5 max-w-[8.5rem] sm:max-w-none text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                {CHURCH_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
            <span className="h-5 w-px bg-black/10" aria-hidden="true" />
            <Clock className="hidden sm:block h-4 w-4 shrink-0 text-slate-400" />
            <p className="min-w-0 flex-1 whitespace-nowrap text-sm text-slate-600">
              {nextForCampus ? (
                <>
                  <span className="hidden sm:inline">Next: </span>
                  <span className="font-semibold text-slate-900"><span className="sm:hidden">{nextForCampus.day.slice(0, 3)}</span><span className="hidden sm:inline">{nextForCampus.day}</span> {nextForCampus.time}</span>
                </>
              ) : (
                " "
              )}
            </p>
            <a
              href="#grace-hub-section"
              aria-label="See this week's gatherings"
              className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f0b0c] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_16px_-8px_rgba(31,11,12,0.7)] hover:bg-church-burgundy transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
