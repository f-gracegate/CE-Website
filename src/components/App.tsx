'use client';

import React, { useState } from "react";
import { CHURCH_LOCATIONS } from "@/data";
import { CommunityMember, ChurchLocation } from "@/types";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import WhoWeAre from "./WhoWeAre";
import FindBelonging from "./FindBelonging";
import SpreadHope from "./SpreadHope";
import CommunityCapsules from "./CommunityCapsules";
import ModernFooter from "./ModernFooter";
import Modal from "./Modal";
import CommunityGraceHub from "./CommunityGraceHub";
import { 
  Check, 
  MapPin, 
  HandHeart, 
  CheckCircle, 
  Search, 
  ArrowRight,
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


  // Group sign up state
  const [groupName, setGroupName] = useState("");
  const [groupEmail, setGroupEmail] = useState("");
  const [groupDay, setGroupDay] = useState("Thursday Evening");
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
      { category: "Outreach", title: "Community Food Kitchen", route: "#hope-section", keywords: "soup food hungry feed help serve distribute boxes" },
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
    <div className="min-h-screen flex flex-col text-slate-800 antialiased selection:bg-church-rose/25 selection:text-church-burgundy leading-normal scroll-smooth">
      
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
        title="Choose a campus"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 font-sans">
            Pick the campus nearest to you. Service times and addresses are below.
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
                    <h4 className="text-sm font-semibold text-slate-900">
                      {camp.name}
                    </h4>
                    {selectedLocation === camp.name && (
                      <Check className="h-4 w-4 text-church-burgundy" aria-label="Selected" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3 shrink-0 text-church-burgundy" />
                    {camp.address}
                  </p>
                  <p className="text-xs text-church-burgundy mt-1">
                    {camp.serviceTimes.join(" · ")}
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5">
                    Led by <span className="text-slate-800">{camp.pastor}</span>
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Giving */}
      <Modal
        isOpen={activeModal === "give"}
        onClose={() => setActiveModal(null)}
        title="Give"
      >
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Thank you for supporting the work of the church. Online giving is not available yet.
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <HandHeart className="h-5 w-5 shrink-0 text-church-burgundy" />
              <span><span className="font-semibold text-slate-900">At a service.</span> Give during the offering at any campus.</span>
            </li>
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-church-burgundy" />
              <span><span className="font-semibold text-slate-900">Mobile Money or bank transfer.</span> Ask a campus pastor or the church office for the details.</span>
            </li>
          </ul>
          <p className="border-t border-rose-100 pt-4 text-xs italic text-slate-500">
            &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo; 2 Corinthians 9:7
          </p>
        </div>
      </Modal>

      {/* 4. SEARCH DIALOGUE MODAL */}
      <Modal
        isOpen={activeModal === "search"}
        onClose={() => setActiveModal(null)}
        title="Search"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-church-burgundy" />
            <input
              type="text"
              autoFocus
              placeholder="Search, e.g. youth, food kitchen, small groups"
              className="w-full field rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400"
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
                  className="flex items-center justify-between p-3 rounded-xl glass-strong lift text-left group"
                >
                  <div>
                    <span className="text-xs text-church-burgundy">
                      {res.category}
                    </span>
                    <h5 className="text-sm font-semibold text-slate-900 mt-0.5 group-hover:text-church-burgundy">
                      {res.title}
                    </h5>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-church-burgundy transition-all" />
                </a>
              ))
            ) : (
              searchQuery.trim() && (
                <div className="text-center text-xs text-slate-500 py-6 font-sans">
                  Nothing matches &ldquo;{searchQuery}&rdquo;. Try another word.
                </div>
              )
            )}
            {!searchQuery.trim() && (
              <div className="text-center text-xs text-slate-500 py-4 font-sans">
                Search ministries, groups and outreach.
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
            title={selectedMember.name}
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
                  <h4 className="font-display text-xl font-bold text-slate-900">
                    {selectedMember.name}
                  </h4>
                  <div className="mt-1 text-sm text-church-burgundy">
                    {selectedMember.role}
                  </div>
                </div>
              </div>

              <div className="relative">
                <span className="absolute -top-6 -left-2 text-7xl font-serif text-church-rose/20 select-none pointer-events-none">“</span>
                <p className="text-xs md:text-sm text-slate-750 leading-relaxed font-sans italic relative z-10 pl-2">
                  {selectedMember.testimony}
                </p>
                <span className="absolute -bottom-10 right-2 text-7xl font-serif text-church-rose/20 select-none pointer-events-none">”</span>
              </div>

              <div className="border-t border-rose-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] text-slate-500">
                <span />
                <button
                  onClick={() => {
                     setSelectedMember(null);
                     setActiveModal("groupSignUp");
                  }}
                  className="text-church-burgundy hover:text-church-rose transition-colors font-semibold text-xs flex items-center gap-1 cursor-pointer bg-none border-none outline-none"
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
        title="Join a small group"
      >
        <div className="space-y-4">
          {!groupSubmitted ? (
            <form onSubmit={executeGroupSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Tell us when and where suits you and we will suggest a group near you.
              </p>
              
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Francis"
                  className="w-full field rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sam@example.com"
                  className="w-full field rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400"
                  value={groupEmail}
                  onChange={(e) => setGroupEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred day
                  </label>
                  <select
                    value={groupDay}
                    onChange={(e) => setGroupDay(e.target.value)}
                    className="w-full field rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400"
                  >
                    <option>Tuesday Evening</option>
                    <option>Wednesday Evening</option>
                    <option>Thursday Evening</option>
                    <option>Saturday Morning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Campus
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full field rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400"
                  >
                    <option>All Campuses</option>
                    {CHURCH_LOCATIONS.map((c) => (
                      <option key={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  placeholder="Anything we should know, e.g. you would like a group that welcomes children"
                  rows={2}
                  className="w-full field rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400"
                  value={groupRequest}
                  onChange={(e) => setGroupRequest(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full btn-tactile py-3 text-sm mt-2"
              >
                Send
              </button>

            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-church-burgundy border border-rose-100 shadow-xs">
                <CheckCircle className="h-6 w-6 stroke-[2.5]" />
              </div>
              <h4 className="text-slate-900 font-display text-lg font-bold">
                Thank you
              </h4>
              <p className="text-slate-650 text-xs font-sans max-w-sm mx-auto leading-relaxed">
                Thanks, {groupName}. A group leader will contact you at {groupEmail}.
              </p>
            </div>
          )}
        </div>
      </Modal>

    </div>
  );
}
