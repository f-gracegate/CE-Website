import React, { useState } from "react";
import { CHURCH_LOCATIONS } from "./data";
import { CommunityMember, ChurchLocation } from "./types";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import WhoWeAre from "./components/WhoWeAre";
import FindBelonging from "./components/FindBelonging";
import SpreadHope from "./components/SpreadHope";
import CommunityCapsules from "./components/CommunityCapsules";
import ModernFooter from "./components/ModernFooter";
import Modal from "./components/Modal";
import CommunityGraceHub from "./components/CommunityGraceHub";
import { 
  Check, 
  MapPin, 
  Calendar, 
  Layers, 
  HandHeart, 
  CheckCircle, 
  Search, 
  ArrowRight,
  Flame,
  Plus
} from "lucide-react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [selectedLocation, setSelectedLocation] = useState<string>("All Campuses");
  const [activeModal, setActiveModal] = useState<"locations" | "give" | "search" | "groupSignUp" | null>(null);
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);
  
  // Search parameters
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Giving calculator state
  const [givingAmount, setGivingAmount] = useState<number>(50);
  const [givingCustom, setGivingCustom] = useState("");
  const [givingFund, setGivingFund] = useState("General Tithes");
  const [isGiveReceipt, setIsGiveReceipt] = useState(false);

  // Group sign up state
  const [groupName, setGroupName] = useState("");
  const [groupEmail, setGroupEmail] = useState("");
  const [groupDay, setGroupDay] = useState("Thursday");
  const [groupRequest, setGroupRequest] = useState("");
  const [groupSubmitted, setGroupSubmitted] = useState(false);

  // Handle locations mapping click
  const handleLocationPick = (camp: ChurchLocation) => {
    setSelectedLocation(camp.name);
    setActiveModal(null);
  };

  // Run dynamic site indices search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const index = [
      { category: "Ministry", title: "Charismatic Youth Homework Club", route: "#hope-section", keywords: "youth child homework school studies tutoring and games" },
      { category: "Outreach", title: "West End Soup Kitchen Charity", route: "#hope-section", keywords: "soup food hungry feed help serve distribute boxes" },
      { category: "Fellowship", title: "Midweek Home Small Groups", route: "#belonging-section", keywords: "group home table study family circle friends belonging join" },
      { category: "Worship", title: "Latest Sunday Message & Service stream", route: "#hero-section", keywords: "video preach music hymn praise drum guitars Elijah sermon" },
      { category: "Doctrine", title: "Statements of Evangelical Faith", route: "#who-we-are-section", keywords: "bible beliefs john 14 theory values cross Jesus Christ" }
    ];

    const filt = index.filter((item) => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.keywords.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filt);
  };

  const executeGivingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGiveReceipt(true);
    setTimeout(() => {
      setIsGiveReceipt(false);
      setGivingCustom("");
      setActiveModal(null);
    }, 6000);
  };

  const executeGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGroupSubmitted(true);
    setTimeout(() => {
      setGroupSubmitted(false);
      setGroupName("");
      setGroupEmail("");
      setGroupRequest("");
      setActiveModal(null);
    }, 5000);
  };

  const handleOpenTestimony = (member: CommunityMember) => {
    setSelectedMember(member);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4eae2] text-slate-800 antialiased selection:bg-church-rose/25 selection:text-church-burgundy leading-normal scroll-smooth">
      
      {/* FIXED TOP SCROLL PROGRESS INDICATOR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-church-burgundy origin-left z-[9999] shadow-[0_1px_5px_rgba(138,30,37,0.4)] pointer-events-none"
        style={{ scaleX }}
      />

      {/* WOODSIDE MAIN NAVIGATION BAR */}
      <Header 
        onOpenModal={(type) => setActiveModal(type)} 
        selectedLocation={selectedLocation} 
      />

      {/* IMMERSIVE HERO WITH WORKFLOW NEUMORPHIC BACKDROP */}
      <HeroSection 
        onOpenModal={(type) => setActiveModal(type)} 
      />

      {/* WOODSIDE LIGHT SECTIONS: WHO WE ARE | FIND BELONGING | SPREAD HOPE */}
      <main className="flex-grow">
        
        {/* 'who we are' overlapping collage section */}
        <WhoWeAre />

        {/* Staggered features & plus signs ornaments 'find belonging' Section */}
        <FindBelonging onJoinGroup={() => setActiveModal("groupSignUp")} />

        {/* Staggered dots grids 'spread hope' Section */}
        <SpreadHope />

        {/* STAGGERED REGS PORTRAIT CAPSULE GRILLING SECTION */}
        <CommunityCapsules 
          onJoinGroup={() => setActiveModal("groupSignUp")} 
          onOpenTestimony={handleOpenTestimony} 
        />

        {/* ACTIVE FELLOWSHIP INTUITIVE COMMUNITY GRACE HUB TABBED DASHBOARD */}
        <CommunityGraceHub />

      </main>

      {/* SOFT GREY MAXIMIZE STYLE NEWSLETTER FOOTER */}
      <ModernFooter />

      {/* ========================================================== */}
      {/* 📍 POPUP MODALS WIRING (CAMPUS SELECTORS, GIVING PORTAL, SIGNUPS) */}
      {/* ========================================================== */}

      {/* 1. CAMPUS SELECTOR MODAL */}
      <Modal
        isOpen={activeModal === "locations"}
        onClose={() => setActiveModal(null)}
        title="Select Your Church Campus"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 font-sans">
            Choosing a local campus updates your calendar with neighborhood groups, outreach schedules, and active pastors.
          </p>
          <div className="grid gap-3 mt-4">
            {CHURCH_LOCATIONS.map((camp) => (
              <button
                key={camp.id}
                onClick={() => handleLocationPick(camp)}
                className={`flex items-start gap-4 rounded-xl p-3 text-left transition-all border ${
                  selectedLocation === camp.name 
                    ? "bg-church-burgundy/5 border-church-burgundy shadow-sm shadow-rose-950/5"
                    : "bg-white border-rose-100/70 hover:border-church-burgundy/40 hover:bg-rose-50/15"
                }`}
              >
                <img
                  src={camp.image}
                  alt={camp.name}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-lg object-cover shrink-0"
                />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-tight">
                      {camp.name}
                    </h4>
                    {selectedLocation === camp.name && (
                      <span className="bg-church-burgundy text-white font-mono text-[7px] font-black tracking-widest px-1.5 py-0.5 rounded">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3 shrink-0 text-church-burgundy" />
                    {camp.address}
                  </p>
                  <p className="text-[10px] text-church-burgundy mt-1 font-mono tracking-wide font-semibold">
                    Sunday times: {camp.serviceTimes.join(" | ")}
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5">
                    Lead Pastor: <span className="text-slate-800">{camp.pastor}</span>
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* 3. DIGITAL GIVING/OFFERING PORTAL MODAL */}
      <Modal
        isOpen={activeModal === "give"}
        onClose={() => setActiveModal(null)}
        title="Evangelical Digital Giving Portal"
      >
        <div className="space-y-4">
          {!isGiveReceipt ? (
            <form onSubmit={executeGivingSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Thank you for co-funding the mission to spread hope locally & globally. Let's grow God's kingdom together!
              </p>
              
              {/* Preset buttons */}
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-extrabold mb-2">
                  SELECT Tithe AMOUNT (GBP)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[20, 50, 100, 250].map((amt) => {
                    const isSelected = givingAmount === amt && !givingCustom;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setGivingAmount(amt);
                          setGivingCustom("");
                        }}
                        className={`py-2 px-1 rounded-lg text-xs font-black tracking-tight border transition-all ${
                          isSelected
                            ? "bg-church-burgundy text-white border-transparent shadow shadow-rose-950/20"
                            : "bg-[#FCFAF9] text-slate-900 border-rose-100 hover:border-church-burgundy/45"
                        }`}
                      >
                        £{amt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom amount */}
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-extrabold mb-1">
                  OR TYPE CUSTOM AMOUNT
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-slate-400">£</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    value={givingCustom}
                    onChange={(e) => {
                      setGivingCustom(e.target.value);
                      setGivingAmount(0);
                    }}
                    className="w-full bg-[#FCFAF9] border border-rose-100 rounded-lg pl-8 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-church-burgundy focus:ring-1 focus:ring-church-burgundy/20"
                  />
                </div>
              </div>

              {/* Fund Selector */}
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-extrabold mb-1">
                  ALLOCATE TO SPECIFIC MISSION FUND
                </label>
                <select
                  value={givingFund}
                  onChange={(e) => setGivingFund(e.target.value)}
                  className="w-full bg-[#FCFAF9] border border-rose-100 rounded-lg p-2.5 text-xs text-slate-705 focus:outline-none focus:border-church-burgundy"
                >
                  <option>General Ministry & Worship Tithes</option>
                  <option>West End Community Soup Kitchen</option>
                  <option>Praise & Stage Multimedia Tech</option>
                  <option>Charismatic Global Bible Translations</option>
                  <option>Youth Outreach & Discipleship Gatherings</option>
                </select>
              </div>

              {/* Payment Details Form */}
              <div className="border-t border-rose-100/60 pt-3 space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Cardholder Full Name"
                  className="w-full bg-[#FCFAF9] border border-rose-100 rounded-lg p-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-church-burgundy"
                />
                <input
                  type="text"
                  required
                  placeholder="16-Digit Card Number"
                  className="w-full bg-[#FCFAF9] border border-rose-100 rounded-lg p-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-church-burgundy"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-church-burgundy hover:bg-[#a1232c] py-3 text-xs font-black text-white transition-all uppercase tracking-widest cursor-pointer mt-2 shadow-sm"
              >
                AUTHORIZE DONATION OF £{givingCustom ? givingCustom : givingAmount}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-church-burgundy border border-rose-100 shadow shadow-rose-950/5">
                <HandHeart className="h-7 w-7 stroke-[2.2]" />
              </div>
              <h4 className="text-slate-900 font-display text-xl font-bold uppercase tracking-tight">
                Donation Received!
              </h4>
              <div className="p-3.5 rounded-lg bg-[#FCFAF9] border border-rose-100/80 max-w-xs mx-auto text-left shadow-2xs">
                <p className="text-[10px] text-church-burgundy font-mono tracking-wider uppercase mb-1.5 font-bold">
                  Official Stewardship Receipt
                </p>
                <p className="text-xs text-slate-800">
                  <span className="text-slate-500">Amount Given:</span> £{givingCustom ? givingCustom : givingAmount}.00
                </p>
                <p className="text-xs text-slate-800 mt-1">
                  <span className="text-slate-500">Designation:</span> {givingFund}
                </p>
                <p className="text-xs text-slate-800 mt-1">
                  <span className="text-slate-500">Receipt Stamp:</span> CH-7592B-RE
                </p>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed max-w-xs mx-auto font-sans italic">
                “Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.” — 2 Corinthians 9:7
              </p>
            </div>
          )}
        </div>
      </Modal>

      {/* 4. SEARCH DIALOGUE MODAL */}
      <Modal
        isOpen={activeModal === "search"}
        onClose={() => setActiveModal(null)}
        title="Search Ministries & Doctrine"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-church-burgundy" />
            <input
              type="text"
              autoFocus
              placeholder="Search e.g. 'youth', 'soup kitchen', 'baptism', 'study'"
              className="w-full bg-[#FCFAF9] border border-rose-100 rounded-lg pl-10 pr-4 py-2.5 text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-church-burgundy focus:ring-1 focus:ring-church-burgundy/20"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-1.5 mt-3 scrollbar">
            {searchResults.length > 0 ? (
              searchResults.map((res, sidx) => (
                <a
                  key={sidx}
                  href={res.route}
                  onClick={() => setActiveModal(null)}
                  className="flex items-center justify-between p-3 rounded-lg bg-white border border-rose-100 hover:border-church-burgundy hover:bg-rose-50/20 transition-all text-left group"
                >
                  <div>
                    <span className="text-[8px] font-mono font-bold tracking-widest text-church-burgundy uppercase">
                      {res.category}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-tight mt-0.5 group-hover:text-church-burgundy">
                      {res.title}
                    </h5>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-church-burgundy transition-all" />
                </a>
              ))
            ) : (
              searchQuery.trim() && (
                <div className="text-center text-xs text-slate-500 py-6 font-sans">
                  No direct evangelical indexes match "{searchQuery}". Try searching general keywords.
                </div>
              )
            )}
            {!searchQuery.trim() && (
              <div className="text-center text-xs text-slate-500 py-4 font-sans">
                Type keywords to query our live central schedules.
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* 5. COMMUNITY TESTIMONIAL VIEW MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <Modal
            isOpen={selectedMember !== null}
            onClose={() => setSelectedMember(null)}
            title={`Community Testimony: ${selectedMember.name}`}
          >
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-5 items-center bg-[#FCFAF9] p-4 rounded-xl border border-rose-100">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  referrerPolicy="no-referrer"
                  className="h-28 w-28 rounded-full border-2 border-church-burgundy object-cover shrink-0"
                />
                <div className="text-center sm:text-left">
                  <h4 className="font-display text-xl font-extrabold text-slate-900 uppercase tracking-wide">
                    {selectedMember.name}
                  </h4>
                  <div className="inline-block mt-1 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-bold font-mono tracking-wider text-church-burgundy uppercase">
                    {selectedMember.role}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-widest font-semibold">
                    London & Birmingham Circle Affiliated
                  </p>
                </div>
              </div>

              <div className="relative">
                <span className="absolute -top-6 -left-2 text-7xl font-serif text-church-rose/20 select-none pointer-events-none">“</span>
                <p className="text-xs md:text-sm text-slate-750 leading-relaxed font-sans italic relative z-10 pl-2">
                  {selectedMember.testimony}
                </p>
                <span className="absolute -bottom-10 right-2 text-7xl font-serif text-church-rose/20 select-none pointer-events-none">”</span>
              </div>

              <div className="border-t border-rose-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] text-slate-500 font-mono tracking-wide">
                <span>Verified Testimonial Record</span>
                <button
                  onClick={() => {
                     setSelectedMember(null);
                     setActiveModal("groupSignUp");
                  }}
                  className="text-church-burgundy hover:text-church-rose transition-colors uppercase font-bold flex items-center gap-1 cursor-pointer bg-none border-none outline-none"
                >
                  <span>Gather with {selectedMember.name.split(" ")[0]}</span>
                  <ArrowRight className="h-3 w-3 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* 6. HOME GATHERINGS STUDY CIRCLE / GATHERING SIGN-UP MODAL */}
      <Modal
        isOpen={activeModal === "groupSignUp"}
        onClose={() => setActiveModal(null)}
        title="Join a Midweek Fellowship Circle"
      >
        <div className="space-y-4">
          {!groupSubmitted ? (
            <form onSubmit={executeGroupSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Welcome home! Tell us your preferences and our Small Group Coordinator will match you with a loving family located right in your neighborhood.
              </p>
              
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-600 font-bold mb-1">
                  your full name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Francis"
                  className="w-full bg-[#FCFAF9] border border-rose-100 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-church-burgundy focus:ring-1 focus:ring-church-burgundy/20"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-600 font-bold mb-1">
                  email address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sam@example.com"
                  className="w-full bg-[#FCFAF9] border border-rose-100 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-church-burgundy focus:ring-1 focus:ring-church-burgundy/20"
                  value={groupEmail}
                  onChange={(e) => setGroupEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-600 font-bold mb-1">
                    preferred meeting day
                  </label>
                  <select
                    value={groupDay}
                    onChange={(e) => setGroupDay(e.target.value)}
                    className="w-full bg-[#FCFAF9] border border-rose-100 rounded-lg p-2 text-xs text-slate-705 focus:outline-none focus:border-church-burgundy"
                  >
                    <option>Tuesday Evening</option>
                    <option>Wednesday Evening</option>
                    <option>Thursday Evening (Primary)</option>
                    <option>Saturday Morning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-600 font-bold mb-1">
                    preferred campus
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-[#FCFAF9] border border-rose-100 rounded-lg p-2 text-xs text-slate-705 focus:outline-none focus:border-church-burgundy"
                  >
                    <option>All Campuses</option>
                    <option>London Central (West End)</option>
                    <option>Birmingham Campus</option>
                    <option>Manchester Northern Quarter</option>
                    <option>Charismatic Online Live</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-600 font-bold mb-1">
                  optional prayer requests or notes
                </label>
                <textarea
                  placeholder="Tell us if you would like child-friendly circles, or submit personal prayer intentions so we can welcome you safely..."
                  rows={2}
                  className="w-full bg-[#FCFAF9] border border-rose-100/80 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-church-burgundy placeholder-slate-400"
                  value={groupRequest}
                  onChange={(e) => setGroupRequest(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-church-burgundy hover:bg-[#a1232c] py-2.5 text-xs font-bold text-white transition-all uppercase tracking-widest cursor-pointer mt-2"
              >
                Request Circle Placement
              </button>

            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-church-burgundy border border-rose-100 shadow-xs">
                <CheckCircle className="h-6 w-6 stroke-[2.5]" />
              </div>
              <h4 className="text-slate-900 font-display text-lg font-bold">
                Application Received!
              </h4>
              <p className="text-slate-650 text-xs font-sans max-w-sm mx-auto leading-relaxed">
                Thank you <span className="text-church-burgundy font-semibold">{groupName}</span>! Our Small Group placement pastor will email you at <span className="text-slate-800 italic font-semibold">{groupEmail}</span> within 24 hours with exact home coordinates.
              </p>
              <div className="text-[10px] text-slate-600 font-mono tracking-wider uppercase mt-2">
                Preferred day: {groupDay}
              </div>
            </div>
          )}
        </div>
      </Modal>

    </div>
  );
}
