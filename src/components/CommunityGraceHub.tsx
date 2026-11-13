'use client';

import React, { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Clock, ExternalLink, HeartHandshake, Loader2, MapPin, Plus, ThumbsUp, CalendarDays } from "lucide-react";
import { CHURCH_LOCATIONS } from "@/data";

interface PrayerRequest {
  id: string;
  author: string;
  request: string;
  category: "Healing" | "Guidance" | "Family" | "Faith" | "Other";
  createdAt: string;
  prayingCount: number;
}

// Weekly gatherings. Replace with the church's real programme.
interface WeeklyEvent {
  title: string;
  campus: string;
  weekday: number; // 0 = Sunday
  start: string; // "HH:MM", Accra time (GMT)
  durationMins: number;
}

const WEEKLY_EVENTS: WeeklyEvent[] = [
  { title: "Sunday service", campus: "Accra Campus", weekday: 0, start: "08:00", durationMins: 120 },
  { title: "Sunday service", campus: "Accra Campus", weekday: 0, start: "10:30", durationMins: 120 },
  { title: "Sunday service", campus: "Kumasi Campus", weekday: 0, start: "09:00", durationMins: 120 },
  { title: "Sunday service", campus: "Tema Campus", weekday: 0, start: "09:30", durationMins: 120 },
  { title: "Midweek Bible study", campus: "Accra Campus", weekday: 3, start: "18:30", durationMins: 90 },
  { title: "Friday prayer meeting", campus: "Kumasi Campus", weekday: 5, start: "18:30", durationMins: 90 },
];

const TABS = [
  { id: "prayer", label: "Prayer wall", icon: HeartHandshake },
  { id: "campuses", label: "Campuses", icon: MapPin },
  { id: "events", label: "This week", icon: CalendarDays },
] as const;
type TabId = (typeof TABS)[number]["id"];

const CATEGORY_LABEL: Record<PrayerRequest["category"], string> = {
  Faith: "Faith",
  Healing: "Healing",
  Guidance: "Guidance",
  Family: "Family",
  Other: "Other",
};

/** Next date (in local time) for a weekly event. */
function nextOccurrence(ev: WeeklyEvent, from = new Date()) {
  const [h, m] = ev.start.split(":").map(Number);
  const d = new Date(from);
  d.setHours(h, m, 0, 0);
  const diff = (ev.weekday - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + diff);
  if (d < from) d.setDate(d.getDate() + 7);
  return d;
}

/** Google Calendar "add event" link (no sign-in needed on our side). */
function googleCalendarLink(ev: WeeklyEvent, when: Date, address: string) {
  const fmt = (x: Date) => x.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = new Date(when.getTime() + ev.durationMins * 60_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${ev.title} · Charismatic Evangelicals`,
    dates: `${fmt(when)}/${fmt(end)}`,
    location: `${ev.campus}, ${address}`,
    ctz: "Africa/Accra",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function CommunityGraceHub() {
  const [activeTab, setActiveTab] = useState<TabId>("prayer");

  // —— Prayer wall ——
  const [prayers, setPrayers] = useState<PrayerRequest[] | null>(null);
  const [newPrayerAuthor, setNewPrayerAuthor] = useState("");
  const [newPrayerRequest, setNewPrayerRequest] = useState("");
  const [newPrayerCategory, setNewPrayerCategory] = useState<PrayerRequest["category"]>("Faith");
  const [isPrayerSubmitting, setIsPrayerSubmitting] = useState(false);
  const [prayedForIds, setPrayedForIds] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/prayers")
      .then((r) => (r.ok ? r.json() : []))
      .then(setPrayers)
      .catch(() => setPrayers([]));
  }, []);

  const handleCreatePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayerAuthor.trim() || !newPrayerRequest.trim()) return;
    setIsPrayerSubmitting(true);
    try {
      const resp = await fetch("/api/prayers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: newPrayerAuthor, request: newPrayerRequest, category: newPrayerCategory }),
      });
      if (resp.ok) {
        const added = await resp.json();
        setPrayers((prev) => [added, ...(prev || [])]);
        setNewPrayerAuthor("");
        setNewPrayerRequest("");
        setPrayedForIds((prev) => [...prev, added.id]);
      }
    } finally {
      setIsPrayerSubmitting(false);
    }
  };

  const handlePray = async (id: string) => {
    if (prayedForIds.includes(id)) return;
    const resp = await fetch(`/api/prayers/${id}/pray`, { method: "POST" });
    if (resp.ok) {
      const updated = await resp.json();
      setPrayers((prev) => (prev || []).map((p) => (p.id === id ? updated : p)));
      setPrayedForIds((prev) => [...prev, id]);
    }
  };

  // —— Campuses ——
  const [selectedCampusId, setSelectedCampusId] = useState(CHURCH_LOCATIONS[0].id);
  const selectedCampus = CHURCH_LOCATIONS.find((c) => c.id === selectedCampusId) || CHURCH_LOCATIONS[0];
  const physicalCampus = !/youtube|online/i.test(selectedCampus.address);
  const mapQuery = encodeURIComponent(`${selectedCampus.address}, Ghana`);

  // —— Events ——
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const upcoming = useMemo(() => {
    if (!now) return [];
    return WEEKLY_EVENTS.map((ev) => ({ ev, when: nextOccurrence(ev, now) })).sort((a, b) => a.when.getTime() - b.when.getTime());
  }, [now]);

  const inputCls =
    "w-full field rounded-xl py-2.5 px-4 text-sm text-slate-800 placeholder-slate-400";

  return (
    <section id="grace-hub-section" className="relative border-t border-white/40 py-24 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Fellowship</h2>
          <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
            Share a prayer request, find a campus near you, or add this week&apos;s gatherings to your calendar.
          </p>
        </div>

        <div role="tablist" className="segmented mb-6">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer ${
                activeTab === id ? "" : "text-slate-600 hover:text-church-burgundy"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="glass rounded-[32px] p-5 md:p-8 min-h-[420px]">
          {/* Prayer wall */}
          {activeTab === "prayer" && (
            <div className="space-y-6">
              <form onSubmit={handleCreatePrayerSubmit} className="grid gap-3 md:grid-cols-[1fr_180px_150px_auto]">
                <input required placeholder="Your prayer request" value={newPrayerRequest} onChange={(e) => setNewPrayerRequest(e.target.value)} className={inputCls} />
                <input required placeholder="Your name" value={newPrayerAuthor} onChange={(e) => setNewPrayerAuthor(e.target.value)} className={inputCls} />
                <select value={newPrayerCategory} onChange={(e) => setNewPrayerCategory(e.target.value as PrayerRequest["category"])} className={`${inputCls} cursor-pointer`}>
                  {Object.entries(CATEGORY_LABEL).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={isPrayerSubmitting}
                  className="btn-tactile py-2.5 px-5 text-sm disabled:opacity-50"
                >
                  {isPrayerSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4" /> Post</>}
                </button>
              </form>

              <p className="text-sm text-slate-500">
                &ldquo;For where two or three are gathered in my name, there am I among them.&rdquo; <span className="text-slate-400">Matthew 18:20</span>
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {prayers === null ? (
                  <p className="col-span-2 text-center py-16 text-sm text-slate-500">Loading prayer requests…</p>
                ) : prayers.length === 0 ? (
                  <p className="col-span-2 text-center py-16 text-sm text-slate-500">No prayer requests yet. Be the first to share one.</p>
                ) : (
                  prayers.map((pr) => {
                    const prayed = prayedForIds.includes(pr.id);
                    return (
                      <div key={pr.id} className="glass-strong lift rounded-2xl p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-church-burgundy">{CATEGORY_LABEL[pr.category] ?? pr.category}</span>
                            <span className="text-slate-400">{pr.createdAt}</span>
                          </div>
                          <p className="mt-3 text-sm text-slate-700 leading-relaxed">{pr.request}</p>
                        </div>
                        <div className="mt-5 border-t border-rose-50 pt-3 flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-rose-50 text-xs font-semibold text-church-burgundy">
                              {pr.author.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                            </span>
                            {pr.author}
                          </span>
                          <button
                            onClick={() => handlePray(pr.id)}
                            disabled={prayed}
                            className={`flex items-center gap-1.5 rounded-lg py-1.5 px-3 text-xs font-medium border transition-colors ${
                              prayed ? "bg-rose-50 border-rose-100 text-church-burgundy" : "bg-white border-rose-100 text-slate-600 hover:border-church-burgundy hover:text-church-burgundy"
                            }`}
                          >
                            <ThumbsUp className={`h-3.5 w-3.5 ${prayed ? "fill-church-burgundy" : ""}`} />
                            <span className="tabular-nums">{pr.prayingCount}</span>
                            <span>{prayed ? "Praying" : "Pray"}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Campuses */}
          {activeTab === "campuses" && (
            <div className="grid lg:grid-cols-5 gap-6">
              <ul className="lg:col-span-2 space-y-3">
                {CHURCH_LOCATIONS.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => setSelectedCampusId(c.id)}
                      className={`w-full text-left rounded-2xl border p-4 transition-colors ${
                        c.id === selectedCampus.id ? "border-church-burgundy bg-white" : "border-rose-100 bg-white/70 hover:border-rose-200"
                      }`}
                    >
                      <span className="block font-semibold text-slate-900">{c.name}</span>
                      <span className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-church-burgundy" /> {c.address}
                      </span>
                      <span className="mt-1 flex items-start gap-1.5 text-sm text-slate-500">
                        <Clock className="h-3.5 w-3.5 mt-0.5 text-church-burgundy shrink-0" /> {c.serviceTimes.join(" · ")}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-rose-100 bg-white min-h-[320px] flex flex-col">
                {physicalCampus ? (
                  <>
                    <iframe
                      title={`Map of ${selectedCampus.name}`}
                      src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                      className="w-full flex-1 min-h-[300px] border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 p-3 text-sm font-medium text-church-burgundy hover:bg-rose-50"
                    >
                      Get directions to {selectedCampus.name} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </>
                ) : (
                  <div className="flex-1 grid place-items-center p-8 text-center">
                    <div>
                      <p className="font-semibold text-slate-900">Join us online</p>
                      <p className="mt-1 text-sm text-slate-500">{selectedCampus.serviceTimes.join(" · ")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Events */}
          {activeTab === "events" && (
            <div className="space-y-3">
              {upcoming.map(({ ev, when }) => {
                const campus = CHURCH_LOCATIONS.find((c) => c.name === ev.campus);
                return (
                  <div key={`${ev.title}-${ev.campus}-${ev.start}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-rose-100 bg-white p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 text-center rounded-xl bg-rose-50 py-2">
                        <span className="block text-xs text-church-burgundy">{when.toLocaleDateString("en-GB", { weekday: "short" })}</span>
                        <span className="block font-display text-lg font-bold text-slate-900">{when.getDate()}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{ev.title}</p>
                        <p className="text-sm text-slate-500">
                          {ev.campus} · {when.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                    <a
                      href={googleCalendarLink(ev, when, campus?.address || "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-rose-100 px-3 py-2 text-sm font-medium text-church-burgundy hover:border-church-burgundy w-fit"
                    >
                      <CalendarPlus className="h-4 w-4" /> Add to Google Calendar
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
