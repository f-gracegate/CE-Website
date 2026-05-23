import React, { useState } from "react";
import { 
  Flame, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Check, 
  CreditCard,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ChurchLogo from "./ChurchLogo";

export default function ModernFooter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email.trim())) {
      setIsSubscribed(true);
      setErrorMsg("");
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 5000);
    } else {
      setShakeCount((prev) => prev + 1);
      setErrorMsg("Please enter a valid email address.");
    }
  };

  return (
    <footer className="relative bg-[#f4eae2] py-16 px-4 sm:px-6 lg:px-8 font-sans border-t border-white/50">
      
      {/* Footer Container */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-stretch">
          
          {/* LEFT PANEL: Branding & Newsletter (Screenshot 3 layout) */}
          <div className="lg:col-span-6 flex flex-col justify-between items-start text-left pb-8 lg:pb-0 pr-0 lg:pr-12">
            
            <div className="w-full">
              {/* Maximize-style brand logo with custom logo branding */}
              <div className="flex items-center gap-2.5">
                <ChurchLogo className="h-7 w-auto" />
                <span className="font-display text-lg font-black tracking-widest text-slate-900 uppercase">
                  charismatic evangelicals
                </span>
              </div>

              {/* Pitch from Screenshot 3 */}
              <h3 className="mt-8 font-sans text-2xl md:text-3xl font-light text-slate-800 leading-tight tracking-tight max-w-md">
                Subscribe to our newsletter <br className="hidden sm:inline" />
                to stay in touch with the latest.
              </h3>

              {/* White Pill Input and Burgundy Subscribe Button */}
              <form onSubmit={handleSubscribe} className="mt-8 w-full max-w-md" noValidate>
                {!isSubscribed ? (
                  <div className="flex flex-col gap-2">
                    <motion.div
                      key={shakeCount} /* Re-creates element to reset and play keyframe animations on subsequent fails */
                      animate={shakeCount > 0 ? {
                        x: [0, -10, 10, -10, 10, -6, 6, -3, 3, 0]
                      } : { x: 0 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className={`flex items-center gap-2 bg-[#f4eae2] rounded-full p-2.5 shadow-neu-inset border transition-all ${
                        errorMsg ? "border-red-400 focus-within:border-red-500" : "border-white/60 focus-within:border-white"
                      }`}
                    >
                      <input
                        type="email"
                        placeholder="Your Email."
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMsg) setErrorMsg("");
                        }}
                        className="w-full bg-transparent pl-4 pr-2 py-2 text-xs md:text-sm text-slate-800 outline-none placeholder-slate-400 font-bold"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-church-burgundy hover:bg-[#a1232c] px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-all shadow-neu-flat-sm hover:shadow-neu-flat active:scale-95 whitespace-nowrap border-none cursor-pointer margin-0"
                      >
                        Subscribe
                      </button>
                    </motion.div>
                    
                    <AnimatePresence>
                      {errorMsg && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="pl-4 text-[10px] font-mono font-bold text-red-600/90 tracking-wide flex items-center gap-1.5"
                        >
                          <span>⚠️</span> {errorMsg}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2.5 rounded-full bg-[#f4eae2] border border-white/60 p-4 text-church-burgundy text-xs font-bold shadow-neu-inset"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-church-burgundy" />
                    <span>Roster saved. We'll send you Sunday sermon digests!</span>
                  </motion.div>
                )}
              </form>
            </div>

            {/* Social Circle Badges */}
            <div className="mt-10 flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Instagram, label: "Instagram" }
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href="#"
                    aria-label={soc.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4eae2] border border-white/60 text-slate-700 hover:text-church-burgundy hover:scale-105 transition-all shadow-neu-flat-sm"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

          </div>

          {/* 📍 CENTRAL DIVIDER WALL */}
          <div className="hidden lg:block lg:col-span-1 w-[1px] h-full bg-white/30 mx-auto" />

          {/* RIGHT PANEL: Structured sermon & faith directories */}
          <div className="lg:col-span-12 md:col-span-5 grid grid-cols-2 gap-8 pt-8 lg:pt-0 pl-0 lg:pl-6 text-left lg:col-span-5">
            
            {/* Navigations links */}
            <div>
              <h4 className="font-display text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-rose-150 pb-2 mb-4">
                Navigations
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Home Base", href: "#hero-section" },
                  { label: "Our Faith", href: "#who-we-are-section" },
                  { label: "Community", href: "#community-section" },
                  { label: "Find Belonging", href: "#belonging-section" },
                  { label: "Local Outreach", href: "#hope-section" }
                ].map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-xs md:text-sm text-slate-600 hover:text-church-burgundy font-sans transition-colors block py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources faith links */}
            <div>
              <h4 className="font-display text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-rose-150 pb-2 mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Help Center", href: "#who-we-are-section" },
                  { label: "Sermon Guides", href: "#hero-section" },
                  { label: "FAQ & Visiting", href: "#who-we-are-section" },
                  { label: "Giving Portal", href: "#" },
                  { label: "Global Missions", href: "#who-we-are-section" }
                ].map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-xs md:text-sm text-slate-600 hover:text-church-burgundy font-sans transition-colors block py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* BOTTOM SUBBAR */}
        <div className="mt-16 pt-8 border-t border-white/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright and Power-by Badging Left */}
          <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 text-center sm:text-left">
            <span className="text-[11px] text-slate-500 font-sans font-medium">
              &copy; 2026 Charismatic Evangelicals. All rights reserved.
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f4eae2] border border-white/80 px-3 py-1 text-[9px] font-mono font-black tracking-widest text-[#8a1e25]/90 uppercase shadow-neu-flat-sm select-none">
              <span className="text-slate-500 font-sans font-semibold normal-case">Powered by</span>
              <span>GraceGate</span>
            </div>
          </div>

          {/* Accepted Cards Logos Right */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "VISA", bg: "bg-[#1a1f71] text-white" },
              { label: "MC", bg: "bg-[#f79e1b] text-white font-serif italic" },
              { label: "AMEX", bg: "bg-[#0170ce] text-white font-mono" },
              { label: "PAYPAL", bg: "bg-[#003087] text-white font-bold" },
              { label: "APPLE", bg: "bg-black text-white" },
              { label: "DISCOVER", bg: "bg-[#f05a28] text-white" }
            ].map((card, cidx) => (
              <span 
                key={cidx}
                className={`text-[8px] font-black tracking-widest px-2.5 py-1.5 rounded-lg border border-white/60 shadow-neu-flat-sm select-none ${card.bg}`}
              >
                {card.label}
              </span>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}
