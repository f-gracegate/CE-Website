import React, { useState } from "react";
import { 
  Flame, 
  ChevronDown, 
  Search, 
  MapPin, 
  User, 
  Heart, 
  Menu, 
  X, 
  Calendar,
  Layers,
  FileText,
  Users,
  Compass,
  Play,
  HeartHandshake
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ChurchLogo from "./ChurchLogo";

interface HeaderProps {
  onOpenModal: (type: "locations" | "give" | "search") => void;
  selectedLocation: string;
}

export default function Header({ onOpenModal, selectedLocation }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const menuItems = [
    { name: "I'M NEW", link: "#", hasDropdown: false },
    { 
      name: "ABOUT", 
      hasDropdown: true, 
      dropdownItems: [
        { label: "Our Beliefs", desc: "Our core theology and evangelical values", icon: Layers, href: "#who-we-are-section" },
        { label: "Leadership Core", desc: "Meet our pastors and visionary elders", icon: Users, href: "#community-section" },
        { label: "Statement of Faith", desc: "Read our historical John 14:6 coordinates", icon: FileText, href: "#who-we-are-section" }
      ]
    },
    { 
      name: "MEDIA", 
      hasDropdown: true, 
      dropdownItems: [
        { label: "Latest Messages", desc: "Archived Sunday sermons and worship clips", icon: Play, href: "#hero-section" },
        { label: "Resources & Guides", desc: "PDF coordinates for reflection and study", icon: FileText, href: "#who-we-are-section" },
        { label: "Praise Playlists", desc: "Worship mixes curated by Elijah Graham", icon: Flame, href: "#community-section" }
      ]
    },
    { 
      name: "GET INVOLVED", 
      hasDropdown: true, 
      dropdownItems: [
        { label: "Home Groups", desc: "Interactive midweek study & fellowship circles", icon: Compass, href: "#belonging-section" },
        { label: "Outreach Volunteers", desc: "Spread hope in local feeding projects", icon: HeartHandshake, href: "#hope-section" },
        { label: "Creative Media Team", desc: "Produce immersive stage lights & imagery", icon: Flame, href: "#hero-section" }
      ]
    },
    { name: "FELLOWSHIP HUB", link: "#grace-hub-section", hasDropdown: false }
  ];

  return (
    <nav className="relative z-40 bg-[#FAF8F6]/95 backdrop-blur-md border-b border-[#E0D5CF] text-slate-800 font-sans shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo / Brand Name ( Beautiful burgundy/rose symbol and logo from upload ) */}
          <a href="#" className="flex items-center gap-1 group">
            <ChurchLogo className="h-16 w-16 group-hover:scale-105 transition-transform" variant="brand" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-600 hover:text-church-burgundy transition-colors uppercase cursor-pointer ${
                      activeDropdown === item.name ? "text-church-burgundy" : ""
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`} />
                  </button>
                ) : (
                  <a
                    href={item.link}
                    className="text-xs font-bold tracking-wider text-slate-600 hover:text-church-burgundy transition-colors uppercase"
                  >
                    {item.name}
                  </a>
                )}

                {/* Dropdown Menu Container */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <>
                      {/* Invisible backdrop to dismiss when clicking outside */}
                      <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => setActiveDropdown(null)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 rounded-xl border border-rose-100 bg-[#FAF8F6] p-3 shadow-xl shadow-rose-900/10 ring-1 ring-church-burgundy/5 z-40"
                      >
                        <div className="grid gap-1">
                          {item.dropdownItems?.map((drop) => {
                            const IconComp = drop.icon;
                            return (
                              <a
                                key={drop.label}
                                href={drop.href}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-start gap-3 rounded-lg p-2.5 transition-all hover:bg-rose-50/40"
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-church-burgundy">
                                  <IconComp className="h-4.5 w-4.5" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                                    {drop.label}
                                  </p>
                                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal font-sans">
                                    {drop.desc}
                                  </p>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Action Panel */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search Trigger */}
            <button 
              onClick={() => onOpenModal("search")}
              className="p-1 px-2 rounded-lg text-slate-600 hover:text-church-burgundy transition-colors hover:bg-rose-50/40 cursor-pointer"
              aria-label="Search site"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            {/* Give Filled Button */}
            <button
              onClick={() => onOpenModal("give")}
              className="rounded-lg bg-church-burgundy px-4.5 py-1.5 text-xs font-extrabold tracking-widest text-[#ffffff] hover:bg-[#a0222a] transition-all shadow-md shadow-rose-900/10 active:scale-95 cursor-pointer"
            >
              GIVE
            </button>
          </div>

          {/* Mobile Right Controls: Search, Select, Give, Burger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenModal("give")}
              className="rounded bg-church-burgundy px-3 py-1 text-[11px] font-extrabold tracking-wider text-[#ffffff] hover:bg-[#a0222a] transition-all cursor-pointer"
            >
              GIVE
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-slate-650 hover:bg-rose-50 hover:text-slate-900"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-rose-100 bg-[#FAF8F6] px-4 py-4 shadow-inner"
          >
            <div className="space-y-3 pb-3">
              {menuItems.map((item) => (
                <div key={item.name} className="border-b border-rose-50/60 pb-2">
                  {item.hasDropdown ? (
                    <div>
                      <p className="text-xs font-extrabold text-church-burgundy tracking-widest py-1 uppercase">
                        {item.name}
                      </p>
                      <div className="pl-4 mt-1 space-y-2">
                        {item.dropdownItems?.map((drop) => (
                          <a
                            key={drop.label}
                            href={drop.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-xs text-slate-600 hover:text-church-burgundy py-1"
                          >
                            • {drop.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}
                      className="block text-xs font-bold text-slate-800 hover:text-church-burgundy py-1.5 uppercase tracking-wider"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              <div className="pt-2 text-center text-[10px] text-slate-450 mt-1 font-semibold uppercase tracking-wider">
                Active Campus: {selectedLocation}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
