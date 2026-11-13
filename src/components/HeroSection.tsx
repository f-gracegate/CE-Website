"use client";

import React, { useEffect, useState } from "react";
import { MapPin, ChevronRight, Clock, ChevronDown, Heart } from "lucide-react";
import { motion } from "motion/react";
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

function nextService(now: Date, times: string[]) {
  let best: { date: Date; label: string } | null = null;
  for (const t of times) {
    const s = parseServiceTime(t);
    if (!s) continue;
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), s.hour, s.minute));
    let add = (s.day - now.getUTCDay() + 7) % 7;
    if (add === 0 && d.getTime() <= now.getTime()) add = 7;
    d.setUTCDate(d.getUTCDate() + add);
    const time = `${((s.hour + 11) % 12) + 1}:${String(s.minute).padStart(2, "0")} ${s.hour < 12 ? "AM" : "PM"}`;
    const label = `${DAY_NAMES[s.day]}, ${time}${s.note ? ` (${s.note})` : ""}`;
    if (!best || d < best.date) best = { date: d, label };
  }
  return best;
}

function timeUntil(ms: number) {
  const mins = Math.max(0, Math.floor(ms / 60000));
  const days = Math.floor(mins / 1440);
  const hours = Math.floor((mins % 1440) / 60);
  const minutes = mins % 60;
  if (days > 0) return `in ${days} day${days > 1 ? "s" : ""}, ${hours} hr${hours !== 1 ? "s" : ""}`;
  if (hours > 0) return `in ${hours} hr${hours !== 1 ? "s" : ""}, ${minutes} min`;
  return minutes > 0 ? `in ${minutes} min` : "starting now";
}

interface HeroSectionProps {
  onOpenModal: (type: "locations" | "give") => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [campusId, setCampusId] = useState(CHURCH_LOCATIONS[0].id);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const campus = CHURCH_LOCATIONS.find((c) => c.id === campusId) ?? CHURCH_LOCATIONS[0];
  const next = now ? nextService(now, campus.serviceTimes) : null;

  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#f4eae2] pb-28">
      <div className="relative mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-start text-left"
          >
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl leading-[1.02]">
              Welcome <span className="block text-church-burgundy">to more.</span>
            </h1>

            <p className="mt-6 text-base text-slate-600 leading-relaxed max-w-md">
              There&rsquo;s more to life than your good deeds or successes, your regrets or mistakes.
              The answer is right in front of you. Let&rsquo;s discover what God has in store.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenModal("locations")}
                className="group inline-flex items-center gap-2 rounded-lg bg-church-burgundy px-5 py-3 text-sm font-semibold text-white hover:bg-[#6f171d] transition-colors cursor-pointer"
              >
                <MapPin className="h-4 w-4" />
                Find a campus
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => onOpenModal("give")}
                className="inline-flex items-center gap-2 rounded-lg border border-church-burgundy/30 bg-white px-5 py-3 text-sm font-semibold text-church-burgundy hover:border-church-burgundy transition-colors cursor-pointer"
              >
                <Heart className="h-4 w-4" />
                Give
              </button>
            </div>

            <div className="mt-10 w-full max-w-md rounded-xl border border-black/5 bg-white p-5 shadow-neu-flat">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Clock className="h-4 w-4 text-church-burgundy" />
                  Next service
                </div>
                <div className="relative">
                  <label htmlFor="hero-campus" className="sr-only">Campus</label>
                  <select
                    id="hero-campus"
                    value={campusId}
                    onChange={(e) => setCampusId(e.target.value)}
                    className="appearance-none rounded-md border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-church-burgundy/30 cursor-pointer"
                  >
                    {CHURCH_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <p className="mt-4 font-display text-xl font-bold text-slate-900">
                {next ? next.label : " "}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {next && now ? `${timeUntil(next.date.getTime() - now.getTime())} · ${campus.address}` : campus.address}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-neu-flat">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&h=700&q=80"
                alt="Congregation in worship"
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm text-white/80">Current series: The Gospel of More</p>
                <h2 className="font-display mt-1 text-2xl font-bold text-white">Chains Broken by Grace</h2>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[50px] md:h-[80px] text-white fill-current" aria-hidden="true">
          <path d="M0,80 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
