import React, { useState } from "react";
import { 
  Flame, 
  Facebook, 
  Youtube,
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
                <span className="font-display text-lg font-bold text-slate-900">
                  Charismatic Evangelicals
                </span>
              </div>

              {/* Pitch from Screenshot 3 */}
              <h3 className="mt-8 font-sans text-2xl md:text-3xl font-light text-slate-800 leading-tight tracking-tight max-w-md">
                Get news and service updates by email.
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
                      className={`flex items-center gap-2 bg-white rounded-full p-1.5 border transition-all ${
                        errorMsg ? "border-red-400 focus-within:border-red-500" : "border-slate-200 focus-within:border-church-burgundy"
                      }`}
                    >
                      <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMsg) setErrorMsg("");
                        }}
                        className="w-full bg-transparent pl-4 pr-2 py-2 text-xs md:text-sm text-slate-800 outline-none placeholder-slate-400"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-church-burgundy hover:bg-[#a1232c] px-6 py-3 text-sm font-semibold text-white transition-colors whitespace-nowrap border-none cursor-pointer margin-0"
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
                          className="pl-4 text-xs text-red-600"
                        >
                          {errorMsg}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2.5 rounded-lg bg-white border border-slate-200 p-4 text-church-burgundy text-sm"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-church-burgundy" />
                    <span>Thanks, you're subscribed.</span>
                  </motion.div>
                )}
              </form>
            </div>

            {/* Social Circle Badges */}
            <div className="mt-10 flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" }
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href="#"
                    aria-label={soc.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 hover:text-church-burgundy transition-colors"
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
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 pt-8 lg:pt-0 lg:pl-6 text-left">
            
            {/* Navigations links */}
            <div>
              <h4 className="font-display text-sm font-bold text-slate-900 border-b border-black/10 pb-2 mb-4">
                Explore
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "#hero-section" },
                  { label: "About", href: "#who-we-are-section" },
                  { label: "Our people", href: "#community-section" },
                  { label: "Small groups", href: "#belonging-section" },
                  { label: "Outreach", href: "#hope-section" }
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
              <h4 className="font-display text-sm font-bold text-slate-900 border-b border-black/10 pb-2 mb-4">
                Connect
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Prayer wall", href: "#grace-hub-section" },
                  { label: "Campuses", href: "#grace-hub-section" },
                  { label: "This week", href: "#grace-hub-section" },
                  { label: "FAQ", href: "#who-we-are-section" }
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
            <span className="text-[11px] text-slate-500">Website by GraceGate</span>
          </div>


        </div>

      </div>
    </footer>
  );
}
