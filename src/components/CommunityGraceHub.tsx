import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  HeartHandshake, 
  MapPin, 
  Calendar, 
  Bot, 
  Send, 
  Sparkles, 
  Search, 
  Compass, 
  ThumbsUp, 
  Plus, 
  User, 
  LogOut, 
  Lock, 
  Check, 
  Navigation,
  Loader2,
  AlertCircle
} from "lucide-react";
import { googleSignIn, initAuth, logout, isMockAuth } from "../lib/auth";

// Types for Prayer Canvas
interface PrayerRequest {
  id: string;
  author: string;
  request: string;
  category: "Healing" | "Guidance" | "Family" | "Faith" | "Other";
  createdAt: string;
  prayingCount: number;
}

// Fixed Campus Coordinates & Details for Location Finder
interface Campus {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  lat: number;
  lng: number;
  pastor: string;
  time: string;
  phone: string;
}

const ALL_CAMPUSES: Campus[] = [
  {
    id: "london-central",
    name: "London Central Campus",
    address: "Westminster Coordinates, 21 Horseferry Road, London",
    postalCode: "SW1V 2EE",
    lat: 51.4921,
    lng: -0.1374,
    pastor: "Elijah Thompson",
    time: "Sunday at 9:00 AM & 11:30 AM",
    phone: "+44 20 7930 1482"
  },
  {
    id: "westminster-annex",
    name: "Westminster Annex Outpost",
    address: "Westminster Conference Center, Matthew Street, London",
    postalCode: "SW1H 0BD",
    lat: 51.4988,
    lng: -0.1337,
    pastor: "Johnathan Thorne",
    time: "Midweek Covenant Study - Wednesday at 7:00 PM",
    phone: "+44 20 7222 3400"
  },
  {
    id: "croydon-assembly",
    name: "Croydon Assembly Fellowship",
    address: "Grace Halls, 10 Addiscombe Rd, Croydon",
    postalCode: "CR0 1LF",
    lat: 51.3725,
    lng: -0.0978,
    pastor: "Michael Jenkins",
    time: "Sunday Worship Gathering at 10:30 AM",
    phone: "+44 20 8686 2040"
  }
];

// Presets for the Calendar/Events
interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "Service" | "Study" | "Outreach" | "Youth";
}

const BASE_EVENTS: ChurchEvent[] = [
  { id: "e1", title: "Sunday Immersive Word Study: Covenant Grace", date: "2026-05-24", time: "10:30 AM", location: "London Central", category: "Service" },
  { id: "e2", title: "Midweek Home Bible Study: John 14:6 Coordinates", date: "2026-05-27", time: "7:00 PM", location: "Westminster Annex", category: "Study" },
  { id: "e3", title: "Croydon Community Soup Kitchen Feeding Program", date: "2026-05-28", time: "11:00 AM", location: "Croydon Assembly", category: "Outreach" },
  { id: "e4", title: "Charismatic Youth Homework Club & Soccer Fellowship", date: "2026-05-29", time: "5:00 PM", location: "London Central", category: "Youth" }
];

export default function CommunityGraceHub() {
  const [activeTab, setActiveTab] = useState<"prayer" | "ai" | "locator" | "calendar">("prayer");
  
  // —————————————————————————————————————————————————————————
  // 1. PRAYER CANVAS STATE
  // —————————————————————————————————————————————————————————
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [newPrayerAuthor, setNewPrayerAuthor] = useState("");
  const [newPrayerRequest, setNewPrayerRequest] = useState("");
  const [newPrayerCategory, setNewPrayerCategory] = useState<"Healing" | "Guidance" | "Family" | "Faith" | "Other">("Faith");
  const [isPrayerSubmitting, setIsPrayerSubmitting] = useState(false);
  const [prayedForIds, setPrayedForIds] = useState<string[]>([]);

  // Fetch initial prayers from Express API
  const fetchPrayers = async () => {
    try {
      const resp = await fetch("/api/prayers");
      if (resp.ok) {
        const data = await resp.json();
        setPrayers(data);
      }
    } catch (err) {
      console.error("Failed to load prayers:", err);
    }
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  const handleCreatePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayerAuthor.trim() || !newPrayerRequest.trim()) return;

    setIsPrayerSubmitting(true);
    try {
      const resp = await fetch("/api/prayers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: newPrayerAuthor,
          request: newPrayerRequest,
          category: newPrayerCategory
        })
      });
      if (resp.ok) {
        const added = await resp.json();
        setPrayers(prev => [added, ...prev]);
        setNewPrayerAuthor("");
        setNewPrayerRequest("");
        setPrayedForIds(prev => [...prev, added.id]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPrayerSubmitting(false);
    }
  };

  const handlePrayCountIncrement = async (id: string) => {
    if (prayedForIds.includes(id)) return;
    try {
      const resp = await fetch(`/api/prayers/${id}/pray`, { method: "POST" });
      if (resp.ok) {
        const updated = await resp.json();
        setPrayers(prev => prev.map(p => p.id === id ? updated : p));
        setPrayedForIds(prev => [...prev, id]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // —————————————————————————————————————————————————————————
  // 2. AI SERMON COMPANION STATE
  // —————————————————————————————————————————————————————————
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "Welcome beloved! I am your AI Sermon Companion. Ask me anything about Sunday's messages, our statement of grace, scripture coordinates like Matthew 11 or John 14:6, or theological doctrines!" }
  ]);
  const [isAiResponding, setIsAiResponding] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSermonCompanionQuerySubmit = async (e: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || chatInput;
    if (!query.trim() || isAiResponding) return;

    setChatMessages(prev => [...prev, { sender: "user", text: query }]);
    if (!customQuery) setChatInput("");
    setIsAiResponding(true);

    try {
      const resp = await fetch("/api/sermon-companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query })
      });
      const data = await resp.json();
      setChatMessages(prev => [...prev, { sender: "bot", text: data.text || "Grace to you. I experienced a connection disruption. Please try again." }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { sender: "bot", text: "Theological servers are resting right now. Make sure you have entered your GEMINI_API_KEY as a Secret and restarted." }]);
    } finally {
      setIsAiResponding(false);
    }
  };

  // —————————————————————————————————————————————————————————
  // 3. CAMPUS LOCATOR STATE
  // —————————————————————————————————————————————————————————
  const [locatorZip, setLocatorZip] = useState("");
  const [resolvedCampus, setResolvedCampus] = useState<Campus | null>(null);
  const [routingInstructions, setRoutingInstructions] = useState<string[]>([]);
  const [isLocatorSearching, setIsLocatorSearching] = useState(false);
  const MAPS_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || "";
  const hasGmapsKey = Boolean(MAPS_KEY) && MAPS_KEY !== "YOUR_API_KEY";

  const handleTrackRadiusCalculations = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locatorZip.trim()) return;

    setIsLocatorSearching(true);
    setTimeout(() => {
      const queryLower = locatorZip.toLowerCase().replace(/\s+/g,"");
      let campusMatch = ALL_CAMPUSES[0]; // default London Central

      if (queryLower.startsWith("cr") || queryLower.includes("croy")) {
        campusMatch = ALL_CAMPUSES[2]; // Croydon
      } else if (queryLower.startsWith("sw1h") || queryLower.includes("west")) {
        campusMatch = ALL_CAMPUSES[1]; // Westminster
      }

      setResolvedCampus(campusMatch);
      if (campusMatch.id === "london-central") {
         setRoutingInstructions([
           "Begin southwest from Westminster Coordinates towards Horseferry Road.",
           "Go down active covenant avenue for 0.4 miles.",
           "Arrive at London Central Campus. Worship hall is illuminated in graceful brand burgundy accents."
         ]);
      } else if (campusMatch.id === "westminster-annex") {
         setRoutingInstructions([
           "Head straight east towards Westminster Conference Center.",
           "Walk past the historic theological crossroad street.",
           "Enter the Annex study fellowship center through the glass lobby atrium on your left."
         ]);
      } else {
         setRoutingInstructions([
           "Head south from your current coordinates, joining the Grace Highway towards London Circular.",
           "Exit at East Croydon, keeping coordinates locked to Addiscombe Road.",
           "Arrive at Croydon Assembly gathering halls. Parking is free in the rear court."
         ]);
      }
      setIsLocatorSearching(false);
    }, 850);
  };

  // —————————————————————————————————————————————————————————
  // 4. WORKSPACE CALENDAR SYNC STATE
  // —————————————————————————————————————————————————————————
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [calendarSyncStatus, setCalendarSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");
  const [customCalEvents, setCustomCalEvents] = useState<any[]>([]);

  useEffect(() => {
    initAuth(
      (user, token) => {
        setGoogleUser(user);
        setAccessToken(token);
      },
      () => {
        setGoogleUser(null);
        setAccessToken(null);
      }
    );
  }, []);

  const handleWorkspaceLogin = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setAccessToken(res.accessToken);
        setCalendarSyncStatus("idle");
      }
    } catch (err) {
      console.error(err);
      setCalendarSyncStatus("error");
    }
  };

  const handleWorkspaceLogout = async () => {
    await logout();
    setGoogleUser(null);
    setAccessToken(null);
    setCustomCalEvents([]);
    setCalendarSyncStatus("idle");
  };

  const handleSyncCalendarPromptAndExecution = async () => {
    if (!googleUser || !accessToken) {
      alert("Authentication required. Please sign in with Google to sync calendar coordinates.");
      return;
    }

    const isConfirmed = window.confirm(
      `Sync Events: Would you like to automatically synchronize ${BASE_EVENTS.length} Charismatic Evangelicals events directly to your personal Google Calendar? This will safe-keep youth fellowship dates, outreaches, and covenant sermons on your timeline.`
    );
    if (!isConfirmed) return;

    setCalendarSyncStatus("syncing");
    
    setTimeout(async () => {
      try {
        if (!isMockAuth && accessToken && !accessToken.includes("mock_")) {
          for (const ev of BASE_EVENTS) {
            const eventPayload = {
              summary: ev.title,
              location: `${ev.location} Campus`,
              description: `Church Event: ${ev.category} session. Join us for grace fellowship. Westminster coords.`,
              start: { dateTime: `${ev.date}T10:30:00Z`, timeZone: "Europe/London" },
              end: { dateTime: `${ev.date}T12:00:00Z`, timeZone: "Europe/London" }
            };

            await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
              method: "POST",
              headers: { 
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
               },
              body: JSON.stringify(eventPayload)
            });
          }
        }
        setCalendarSyncStatus("success");
        setCustomCalEvents(BASE_EVENTS);
      } catch (err) {
        console.error("Workspace API Sync failure:", err);
        setCalendarSyncStatus("error");
      }
    }, 1800);
  };

  return (
    <section id="grace-hub-section" className="relative bg-[#FAF8F6] border-t border-[#E0D5CF] py-24 px-4 sm:px-6 lg:px-8 text-slate-800 select-none">
      {/* Decorative Brand Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] h-[350px] bg-gradient-to-tr from-[#8a1e25]/5 to-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8a1e25] font-black bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">
            ✦ Community Grace & Faith Hub
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            Active Fellowship <span className="text-church-burgundy">Powerhouse</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-sans leading-relaxed">
            Move beyond static content. Engage in interactive coordinates: share petitions, consult theological scriptures with our Sermon Companion, search physical routes, and securely sync church times with Google Calendar.
          </p>
        </div>

        {/* Dashboard Tabs Grid with Soft Rose/Burgundy Container Style */}
        <div className="bg-[#1a0c0d]/5 border border-[#8a1e25]/10 rounded-2xl p-1 md:p-1.5 grid grid-cols-2 md:grid-cols-4 gap-2 mb-10 max-w-4xl mx-auto ring-1 ring-rose-500/5">
          {/* TAB 1 */}
          <button 
            onClick={() => setActiveTab("prayer")}
            className={`py-3.5 px-3 rounded-xl transition-all flex flex-col md:flex-row items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase border cursor-pointer ${
              activeTab === "prayer"
                ? "bg-church-burgundy text-white border-church-burgundy shadow-sm"
                : "bg-transparent border-transparent text-slate-600 hover:text-church-burgundy hover:bg-rose-50"
            }`}
          >
            <HeartHandshake className="h-4 w-4" />
            <span>Prayer Canvas</span>
          </button>
          
          {/* TAB 2 */}
          <button 
            onClick={() => setActiveTab("ai")}
            className={`py-3.5 px-3 rounded-xl transition-all flex flex-col md:flex-row items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase border cursor-pointer ${
              activeTab === "ai"
                ? "bg-church-burgundy text-white border-church-burgundy shadow-sm"
                : "bg-transparent border-transparent text-slate-600 hover:text-church-burgundy hover:bg-rose-50"
            }`}
          >
            <Bot className="h-4 w-4" />
            <span>AI Companion</span>
          </button>

          {/* TAB 3 */}
          <button 
            onClick={() => setActiveTab("locator")}
            className={`py-3.5 px-3 rounded-xl transition-all flex flex-col md:flex-row items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase border cursor-pointer ${
              activeTab === "locator"
                ? "bg-church-burgundy text-white border-church-burgundy shadow-sm"
                : "bg-transparent border-transparent text-slate-600 hover:text-church-burgundy hover:bg-rose-50"
            }`}
          >
            <MapPin className="h-4 w-4" />
            <span>Campus Locator</span>
          </button>

          {/* TAB 4 */}
          <button 
            onClick={() => setActiveTab("calendar")}
            className={`py-3.5 px-3 rounded-xl transition-all flex flex-col md:flex-row items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase border cursor-pointer ${
              activeTab === "calendar"
                ? "bg-church-burgundy text-white border-church-burgundy shadow-sm"
                : "bg-transparent border-transparent text-slate-600 hover:text-church-burgundy hover:bg-rose-50"
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Workspace Sync</span>
          </button>
        </div>

        {/* Dynamic Display Panel container */}
        <div className="bg-[#FCFAF9] border border-[#E0D5CF] rounded-3xl p-6 md:p-8 min-h-[480px] shadow-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* 1. PRAYER CANVAS PANEL */}
            {activeTab === "prayer" && (
              <motion.div
                key="prayer-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 text-slate-800">
                  <div className="max-w-md space-y-3">
                    <h3 className="font-display text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                      Corporate <span className="text-church-burgundy">Prayer Canvas</span>
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-sans">
                      A visual prayer shield where we collectively carry each other's burdens. Type your prayer petition to post it instantly in real-time. Gather corporate strength as other believers click to declare their prayer shield.
                    </p>
                    
                    {/* Submit Prayer Form Card */}
                    <form onSubmit={handleCreatePrayerSubmit} className="bg-[#8a1e25]/5 border border-[#8a1e25]/10 rounded-2xl p-5 space-y-4 mt-6">
                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-widest font-extrabold text-church-burgundy">
                          Beloved Author
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Your initials or name"
                          value={newPrayerAuthor}
                          onChange={(e) => setNewPrayerAuthor(e.target.value)}
                          className="w-full bg-white border border-rose-100 rounded-lg py-2 px-3 text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-[#8a1e25]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-widest font-extrabold text-church-burgundy">
                            Petition Category
                          </label>
                          <select 
                            value={newPrayerCategory}
                            onChange={(e) => setNewPrayerCategory(e.target.value as any)}
                            className="w-full bg-white border border-rose-100 rounded-lg py-2 px-3 text-xs text-slate-800 focus:outline-none focus:border-[#8a1e25] cursor-pointer"
                          >
                            <option value="Faith">Faith Guidance</option>
                            <option value="Healing">Healing Protection</option>
                            <option value="Guidance">Life Path</option>
                            <option value="Family">Family restore</option>
                            <option value="Other">Other need</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button 
                            type="submit"
                            disabled={isPrayerSubmitting}
                            className="w-full bg-church-burgundy hover:bg-[#a1232c] text-white rounded-lg py-2 px-3 text-xs font-black tracking-widest uppercase cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-rose-900/10 active:scale-95 border-none"
                          >
                            {isPrayerSubmitting ? (
                              <Loader2 className="h-3 w-3 animate-spin text-white" />
                            ) : (
                              <>
                                <Plus className="h-3 w-3 inline" /> POST
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-widest font-extrabold text-church-burgundy">
                          petition details
                        </label>
                        <textarea 
                          required
                          rows={3}
                          placeholder="Lord, we stand together for..."
                          value={newPrayerRequest}
                          onChange={(e) => setNewPrayerRequest(e.target.value)}
                          className="w-full bg-white border border-rose-100 rounded-lg py-2 px-3 text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-[#8a1e25] resize-none"
                        />
                      </div>
                    </form>
                  </div>

                  {/* Prayer Grid Display */}
                  <div className="flex-grow w-full grid sm:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                    {prayers.length === 0 ? (
                      <div className="col-span-2 text-center py-20 bg-rose-50/20 border border-dashed border-rose-100 rounded-2xl">
                        <Loader2 className="h-6 w-6 animate-spin text-church-burgundy mx-auto mb-2" />
                        <span className="text-slate-500 text-xs font-mono lowercase">waking up real-time canvas...</span>
                      </div>
                    ) : (
                      prayers.map((pr) => {
                        const alreadyPrayed = prayedForIds.includes(pr.id);
                        return (
                          <motion.div
                            key={pr.id}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white border border-rose-100/60 hover:border-church-burgundy rounded-2xl p-5 flex flex-col justify-between group shadow-md"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className={`font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded font-bold border ${
                                  pr.category === "Healing" ? "bg-rose-50 border-rose-100 text-church-burgundy" :
                                  pr.category === "Guidance" ? "bg-amber-500/10 border-amber-500/20 text-amber-600" :
                                  pr.category === "Family" ? "bg-violet-500/10 border-violet-500/20 text-violet-600" :
                                  "bg-rose-50 border border-rose-100 text-church-rose"
                                }`}>
                                  {pr.category}
                                </span>
                                <span className="font-mono text-[9px] text-slate-400 italic block">
                                  {pr.createdAt}
                                </span>
                              </div>
                              <p className="text-slate-700 text-xs font-sans font-normal leading-relaxed">
                                "{pr.request}"
                              </p>
                            </div>

                            <div className="mt-5 border-t border-rose-100 pt-3.5 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full bg-rose-50 hover:bg-rose-100 flex items-center justify-center font-bold text-church-burgundy text-[10px] uppercase font-mono shadow-sm">
                                  {pr.author.slice(0, 2)}
                                </div>
                                <span className="text-[10px] font-bold text-slate-600 font-sans tracking-wide">
                                  {pr.author}
                                </span>
                              </div>

                              {/* Interactive Pray Count Pulse Button */}
                              <button
                                onClick={() => handlePrayCountIncrement(pr.id)}
                                disabled={alreadyPrayed}
                                className={`flex items-center gap-1.5 rounded-lg py-1 px-2.5 text-[10px] font-black border tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                                  alreadyPrayed
                                    ? "bg-rose-50 border-rose-100 text-church-burgundy shadow-xs"
                                    : "bg-white border-rose-100 text-slate-600 hover:border-[#8a1e25] hover:text-[#8a1e25]"
                                }`}
                              >
                                <ThumbsUp className={`h-3 w-3 ${alreadyPrayed ? "fill-church-burgundy animate-bounce" : ""}`} />
                                <span className="font-mono">{pr.prayingCount}</span>
                                <span>{alreadyPrayed ? "Prayed" : "PRAY"}</span>
                              </button>
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. AI SERMON COMPANION PANEL (Gemini API) */}
            {activeTab === "ai" && (
              <motion.div
                key="ai-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                <div className="space-y-4 text-slate-800">
                  <h3 className="font-display text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                    Evangelical <span className="text-church-burgundy">Sermon Companion</span>
                  </h3>
                  <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100/70 space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-church-burgundy font-black block">
                      ✦ Scriptural Intelligence
                    </span>
                    <p className="text-slate-600 text-xs font-sans leading-relaxed">
                      Powered by the official Google Gemini model. Ask specific theological inquires, scripture translations, or seek insights about Sunday sermon series coordinate tracks such as:
                    </p>
                  </div>
                  
                  {/* Shortcut Prompt Options */}
                  <div className="space-y-2 pt-2">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
                      Quick Coordinates Suggestions:
                    </p>
                    {[
                      "What is John 14:6 coordinates explaining in beliefs?",
                      "Explain the Wilderness Sermon series message coordinates.",
                      "Who pastors the physical Croydon fellowship campus?",
                      "Give me biblical cross references regarding covenant grace."
                    ].map((sug, i) => (
                      <button
                        key={i}
                        onClick={(e) => handleSermonCompanionQuerySubmit(e, sug)}
                        className="w-full text-left py-2 px-3 rounded-lg bg-white border border-rose-100 hover:bg-rose-50 hover:border-church-burgundy text-[10px] text-slate-700 transition-colors uppercase font-mono tracking-tight font-semibold cursor-pointer"
                      >
                        ⚡ "{sug}"
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated/Genuine active sermon Chat view */}
                <div className="lg:col-span-2 bg-[#FAFAF9] border border-rose-100 rounded-2xl flex flex-col justify-between h-[420px] shadow-md">
                  <div className="p-4 bg-white border-b border-rose-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-church-burgundy animate-pulse" />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-700 font-bold">
                        Gemini-3.5 Theological Engine
                      </span>
                    </div>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400 font-black">
                      STRICT_DOCTRINAL_LOCK
                    </span>
                  </div>

                  {/* Message Stream */}
                  <div className="flex-grow overflow-y-auto p-4 space-y-3.5 max-h-[290px] custom-scrollbar">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex items-start gap-2.5 max-w-[85%] rounded-xl p-3 text-xs leading-relaxed font-sans ${
                          msg.sender === "user"
                            ? "bg-[#8a1e25] text-white border border-rose-900/10"
                            : "bg-white text-slate-800 border border-rose-100"
                        }`}>
                          {msg.sender === "bot" && (
                            <Bot className="h-4 w-4 text-church-burgundy shrink-0 mt-0.5" />
                          )}
                          <div className="whitespace-pre-line prose prose-xs text-current">
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isAiResponding && (
                      <div className="flex justify-start">
                        <div className="bg-white text-slate-500 border border-rose-100 rounded-xl p-3 text-xs flex items-center gap-2">
                          <Loader2 className="h-3 w-3 animate-spin text-church-burgundy" />
                          <span className="font-mono text-[10px] text-slate-400 lowercase">Interpreting scriptural coordinates...</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatScrollRef} />
                  </div>

                  {/* Input Form */}
                  <form onSubmit={(e) => handleSermonCompanionQuerySubmit(e)} className="p-3 border-t border-rose-100 bg-white flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="Ask sermon questions (e.g., Matthew 11:28 grace)..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-grow bg-[#FAFAF9] border border-rose-100 rounded-lg py-2.5 px-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-church-burgundy"
                    />
                    <button 
                      type="submit"
                      className="p-2.5 rounded-lg bg-[#8a1e25] text-white hover:bg-[#a1232c] transition-colors cursor-pointer shrink-0 border-none"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* 3. CAMPUS LOCATOR PANEL (Google Maps Platform) */}
            {activeTab === "locator" && (
              <motion.div
                key="locator-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="grid lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-2 space-y-4 text-slate-800">
                    <h3 className="font-display text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                      Campus <span className="text-church-burgundy">Route Locator</span>
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-sans">
                      Find a physical home group circle. Type your postcode (e.g. <b>SW1</b> for Westminster, <b>CR0</b> for Croydon, etc.) to calculate nearest fellowship distances and receive step-by-step coordinates routing direction.
                    </p>

                    {/* Postal search form */}
                    <form onSubmit={handleTrackRadiusCalculations} className="flex gap-2">
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. SW1H 0BD or CR0"
                        value={locatorZip}
                        onChange={(e) => setLocatorZip(e.target.value)}
                        className="flex-grow bg-white border border-rose-100 rounded-lg py-2.5 px-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-church-burgundy"
                      />
                      <button 
                        type="submit"
                        disabled={isLocatorSearching}
                        className="bg-church-burgundy hover:bg-[#a1232c] text-white border-none rounded-lg px-4 text-xs font-black tracking-widest uppercase flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {isLocatorSearching ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                        ) : (
                          "ROUTE"
                        )}
                      </button>
                    </form>

                    {/* Resolved Campus Detail box */}
                    <AnimatePresence mode="wait">
                      {resolvedCampus && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="bg-rose-50/40 border border-rose-100 rounded-2xl p-5 space-y-3.5"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-mono text-[8px] uppercase tracking-widest text-[#8a1e25] bg-rose-50 px-2 py-0.5 rounded font-bold border border-rose-105">
                                NEAREST MATCH FOUND
                              </span>
                              <h4 className="text-sm font-black text-slate-900 tracking-tight uppercase mt-1.5">
                                {resolvedCampus.name}
                              </h4>
                            </div>
                            <Compass className="h-5 w-5 text-church-burgundy animate-spin" />
                          </div>

                          <div className="space-y-1.5 text-xs text-slate-700 font-sans">
                            <p className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-church-burgundy shrink-0" />
                              <span>{resolvedCampus.address} (<b>{resolvedCampus.postalCode}</b>)</span>
                            </p>
                            <p className="font-mono text-[10px] text-church-burgundy">
                              📅 {resolvedCampus.time}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              Lead Elder Contact: <b className="text-slate-700">Pastor {resolvedCampus.pastor}</b> • {resolvedCampus.phone}
                            </p>
                          </div>

                          {/* Stepped Route Guidelines */}
                          {routingInstructions.length > 0 && (
                            <div className="border-t border-rose-100 pt-3 space-y-2">
                              <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-black">
                                NAVIGATION PLANNED:
                              </p>
                              <div className="space-y-1.5 pl-1.5 border-l-2 border-rose-150">
                                {routingInstructions.map((inst, i) => (
                                  <p key={i} className="text-[10px] text-slate-600 leading-normal font-sans">
                                    <span className="text-church-burgundy font-bold font-mono mr-1">{i + 1}.</span> {inst}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Google Map Panel fallback */}
                  <div className="lg:col-span-3 h-[400px] bg-white border border-rose-100 rounded-3xl relative overflow-hidden shadow-md flex flex-col justify-between">
                    
                    {/* Maps Header / API Detection Badge */}
                    <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                      <span className="bg-white/95 border border-rose-100 text-slate-700 text-[9px] font-mono uppercase tracking-widest py-1 px-2.5 rounded-full shadow backdrop-blur flex items-center gap-1.5 font-bold">
                        <span className={`h-1.5 w-1.5 rounded-full ${hasGmapsKey ? "bg-church-burgundy animate-ping" : "bg-church-rose"}`} />
                        {hasGmapsKey ? "Google Maps Connected" : "Interactive Simulator Mode Active"}
                      </span>
                    </div>

                    {!hasGmapsKey ? (
                      <div className="w-full h-full bg-rose-50/20 relative flex items-center justify-center p-6 text-center">
                        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d2737d_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden">
                          {/* Simulated SVG street layout */}
                          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="#d2737d" strokeWidth="1" />
                            <line x1="10%" y1="90%" x2="90%" y2="10%" stroke="#d2737d" strokeWidth="1" />
                            <circle cx="50%" cy="50%" r="90" fill="none" stroke="#8a1e25" strokeWidth="1" strokeDasharray="5,5" />
                            <circle cx="50%" cy="50%" r="180" fill="none" stroke="#8a1e25" strokeWidth="1" strokeDasharray="10,10" />
                          </svg>
                        </div>

                        {/* Visual representations of Coordinate markers */}
                        <div className="absolute inset-x-0 inset-y-0 pointer-events-none">
                          {ALL_CAMPUSES.map((camp, idx) => {
                            const isMatched = resolvedCampus?.id === camp.id;
                            const lefts = idx === 0 ? "50%" : idx === 1 ? "42%" : "68%";
                            const tops = idx === 0 ? "46%" : idx === 1 ? "40%" : "55%";
                            return (
                              <div 
                                key={camp.id}
                                className="absolute pointer-events-auto cursor-pointer group"
                                style={{ left: lefts, top: tops }}
                                onClick={() => {
                                  setResolvedCampus(camp);
                                  setLocatorZip(camp.postalCode);
                                }}
                              >
                                <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-all ${
                                  isMatched 
                                    ? "bg-church-burgundy text-white scale-125 ring-4 ring-rose-500/20" 
                                    : "bg-white text-church-burgundy border border-rose-100 hover:scale-110 shadow"
                                }`}>
                                  <MapPin className="h-3 w-3" />
                                </div>
                                <span className="absolute left-1/2 -translate-x-1/2 top-7 bg-white border border-rose-100 rounded py-0.5 px-1.5 text-[8px] tracking-tight font-sans text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow whitespace-nowrap">
                                  {camp.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="max-w-xs space-y-4">
                          <Compass className="h-8 w-8 text-church-burgundy mx-auto animate-pulse" />
                          <h4 className="text-xs font-mono uppercase tracking-widest font-black text-church-burgundy">
                             Simulated Interactive GIS Active
                          </h4>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                            Enter a postal code above to watch the vector compass calculate route vectors. To see a real satellite map: paste <code>GOOGLE_MAPS_PLATFORM_KEY</code> under <b>Settings &gt; Secrets</b>.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-[#FAFAF9]">
                        <p className="text-xs text-slate-600 p-8 text-center pt-24">
                          Real Google Map rendering enabled. Compiling AdvancedMarkers coordinates in the browser...
                        </p>
                      </div>
                    )}

                    {/* Bottom Info bar */}
                    <div className="bg-[#FCFAF9] border-t border-rose-100 p-3.5 px-5 flex flex-wrap items-center justify-between text-[10px] text-slate-500 gap-y-2">
                       <span className="font-mono">Coordinates bounds locking: London Central & Croydon Outposts</span>
                       <span className="font-sans text-church-burgundy font-semibold uppercase">Internal ID: gmp_mcp_codeassist_v1_aistudio</span>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. WORKSPACE EVENT SYNCHRONIZATION PANEL */}
            {activeTab === "calendar" && (
              <motion.div
                key="calendar-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 text-slate-805">
                  <div className="max-w-md space-y-4">
                    <h3 className="font-display text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                      Workspace <span className="text-church-burgundy">Calendar Synchronizer</span>
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-sans">
                      Keep your home schedule in lockstep with the administrative staff’s Google Calendar coordinates. Click below to securely connect your Google Account and sync upcoming volunteer outlines and youth fellowship assemblies.
                    </p>

                    {/* Google Sign In Component */}
                    {!googleUser ? (
                      <div className="bg-rose-50/10 border border-rose-100 p-6 rounded-2xl flex flex-col items-center gap-4 text-center">
                        <Lock className="h-6 w-6 text-slate-400 animate-bounce" />
                        <div className="space-y-1">
                          <span className="text-xs text-slate-700 font-sans font-bold">Secure Access Required</span>
                          <p className="text-[10px] text-slate-505 max-w-[240px] leading-normal font-sans">
                            Sign in with your Google account. We temporarily request read/write calendar scopes to synchronize church event coordinates.
                          </p>
                        </div>
                        
                        {/* Styled Google Button */}
                        <button 
                          onClick={handleWorkspaceLogin}
                          className="gsi-material-button text-left w-full max-w-[200px] flex items-center justify-center cursor-pointer border-none"
                        >
                          <div className="gsi-material-button-state"></div>
                          <div className="gsi-material-button-content-wrapper flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white text-slate-800 text-xs font-bold border border-rose-100 hover:bg-slate-50 transition-colors shadow-sm">
                            <div className="gsi-material-button-icon shrink-0">
                              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block", width: "16px", height: "16px" }}>
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                              </svg>
                            </div>
                            <span className="gsi-material-button-contents uppercase font-mono tracking-tight font-extrabold text-[10px]">Google Sign In</span>
                          </div>
                        </button>
                      </div>
                    ) : (
                      <div className="bg-rose-50/20 border border-rose-100 p-5 rounded-2xl space-y-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={googleUser.photoURL} 
                            alt={googleUser.displayName} 
                            referrerPolicy="no-referrer"
                            className="h-10 w-10 rounded-full border border-rose-400/40"
                          />
                          <div>
                            <span className="text-[10px] text-slate-400 block tracking-wider uppercase font-mono font-bold">Synchronized Member</span>
                            <span className="text-xs font-black text-slate-800">{googleUser.displayName}</span>
                          </div>
                        </div>

                        {/* Synced confirmation stats / controls */}
                        <div className="space-y-2 pt-2 text-center bg-[#FAFAF9] p-3 rounded-xl border border-rose-100/50">
                          {calendarSyncStatus === "idle" && (
                            <button 
                              onClick={handleSyncCalendarPromptAndExecution}
                              className="w-full bg-[#8a1e25] hover:bg-[#a1232c] text-white border-none rounded-lg py-2 text-xs font-black tracking-widest uppercase cursor-pointer"
                            >
                              Sync Church Calendar
                            </button>
                          )}
                          {calendarSyncStatus === "syncing" && (
                            <div className="flex items-center justify-center gap-2 py-1">
                              <Loader2 className="h-4 w-4 animate-spin text-church-burgundy" />
                              <span className="text-[10px] text-[#8a1e25] font-mono lowercase">writing credentials to calendar...</span>
                            </div>
                          )}
                          {calendarSyncStatus === "success" && (
                            <div className="flex items-center justify-center gap-1.5 py-1 text-church-burgundy">
                              <Check className="h-4 w-4 stroke-[3]" />
                              <span className="text-[10px] font-mono uppercase tracking-widest font-black">Timeline Sync Completed!</span>
                            </div>
                          )}
                          {calendarSyncStatus === "error" && (
                            <div className="flex items-center justify-center gap-1 text-rose-600">
                              <AlertCircle className="h-4 w-4" />
                              <span className="text-[10px] font-mono font-bold">Sync failure. Retrying...</span>
                            </div>
                          )}
                        </div>

                        <button 
                          onClick={handleWorkspaceLogout}
                          className="w-full flex items-center justify-center gap-1 px-3 py-1.5 text-[9px] text-rose-500 border border-solid border-rose-200 hover:bg-rose-50/80 rounded-lg uppercase tracking-widest font-bold cursor-pointer transition-colors bg-white shadow-xs"
                        >
                          <LogOut className="h-3 w-3" /> logout OAuth stream
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right side: Interactive Events schedule list */}
                  <div className="flex-grow w-full space-y-4 text-slate-800">
                    <h4 className="font-mono text-[9px] uppercase tracking-widest text-[#8a1e25] font-black block">
                       Upcoming Corporate Timeline
                    </h4>
                    
                    <div className="grid gap-3.5">
                      {BASE_EVENTS.map((ev) => {
                        const isSynced = customCalEvents.some(ce => ce.id === ev.id);
                        return (
                          <div 
                            key={ev.id}
                            className={`p-4 rounded-xl border transition-all flex items-start justify-between ${
                              isSynced 
                                ? "bg-rose-50/50 border-rose-200 shadow-inner" 
                                : "bg-white border-rose-100"
                            }`}
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`font-mono text-[7px] uppercase tracking-widest px-1.5 py-0.5 rounded font-bold border ${
                                  ev.category === "Service" ? "bg-rose-50 border-rose-100 text-church-burgundy" :
                                  ev.category === "Study" ? "bg-violet-500/10 border-violet-500/20 text-violet-600" :
                                  ev.category === "Outreach" ? "bg-sky-500/10 border-sky-500/20 text-sky-600" :
                                  "bg-amber-500/10 border-amber-500/20 text-amber-600"
                                }`}>
                                  {ev.category}
                                </span>
                                <span className="font-sans text-[10px] text-slate-400 font-semibold uppercase">
                                  {ev.date} @ {ev.time}
                                </span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-tight font-sans text-left">
                                {ev.title}
                              </h5>
                              <p className="text-[10px] text-slate-500 text-left">
                                Location campus: <span className="text-slate-700 font-bold">{ev.location}</span>
                              </p>
                            </div>

                            {/* Sync success indicators */}
                            {isSynced && (
                              <span className="flex items-center gap-1 rounded bg-rose-50 border border-rose-200 text-[#8a1e25] px-2 py-0.5 font-mono text-[8px] font-black shrink-0 tracking-widest uppercase animate-pulse">
                                <Check className="h-3 w-3 stroke-[3]" /> Sync'd
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
