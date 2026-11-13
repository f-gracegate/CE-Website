import React, { useState } from "react";
import { 
  ChevronDown, 
  Search, 
  Menu, 
  X, 
  Layers,
  Users,
  Compass,
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
    { name: "I'm new", link: "#who-we-are-section", hasDropdown: false },
    {
      name: "About",
      hasDropdown: true,
      dropdownItems: [
        { label: "What we believe", desc: "Our beliefs and values", icon: Layers, href: "#who-we-are-section" },
        { label: "Our people", desc: "Pastors, leaders and members", icon: Users, href: "#community-section" }
      ]
    },
    {
      name: "Get involved",
      hasDropdown: true,
      dropdownItems: [
        { label: "Small groups", desc: "Midweek groups that meet in homes", icon: Compass, href: "#belonging-section" },
        { label: "Outreach", desc: "Serve with our community projects", icon: HeartHandshake, href: "#hope-section" }
      ]
    },
    { name: "Fellowship", link: "#grace-hub-section", hasDropdown: false }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4">
      <nav className="relative z-40 mx-auto max-w-7xl rounded-full glass text-slate-800 font-sans">
        <div className="mx-auto max-w-7xl px-3 sm:px-8">
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
                      className={`flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-church-burgundy transition-colors cursor-pointer ${
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
                      className="text-sm font-medium text-slate-700 hover:text-church-burgundy transition-colors"
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
                          className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl glass-strong p-2 z-40"
                        >
                          <div className="grid gap-1">
                            {item.dropdownItems?.map((drop) => {
                              const IconComp = drop.icon;
                              return (
                                <a
                                  key={drop.label}
                                  href={drop.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-rose-50/60"
                                >
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-church-burgundy">
                                    <IconComp className="h-4.5 w-4.5" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900">
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
              {/* Search Trigger (Neumorphic round button) */}
              <button 
                onClick={() => onOpenModal("search")}
                className="btn-tactile-light p-2.5 text-slate-700 hover:text-church-burgundy"
                aria-label="Search site"
              >
                <Search className="h-4.5 w-4.5" />
              </button>
  
              {/* Give Filled Button */}
              <button
                onClick={() => onOpenModal("give")}
                className="btn-tactile px-5 py-2.5 text-sm"
              >
                Give
              </button>
            </div>
  
            {/* Mobile Right Controls: Search, Select, Give, Burger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => onOpenModal("give")}
                className="btn-tactile px-4 py-2 text-sm"
              >
                Give
              </button>
  
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn-tactile-light p-2.5 text-slate-700"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
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
              className="lg:hidden border-t border-black/5 px-6 py-4"
            >
              <div className="space-y-3 pb-3">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b border-white/30 pb-2">
                    {item.hasDropdown ? (
                      <div>
                        <p className="text-sm font-semibold text-church-burgundy py-1">
                          {item.name}
                        </p>
                        <div className="pl-4 mt-1 space-y-2">
                          {item.dropdownItems?.map((drop) => (
                            <a
                              key={drop.label}
                              href={drop.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-sm text-slate-600 hover:text-church-burgundy py-1"
                            >
                              {drop.label}
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
                        className="block text-sm font-medium text-slate-800 hover:text-church-burgundy py-1.5"
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onOpenModal("search"); }}
                  className="flex items-center gap-2 text-sm font-medium text-slate-800 hover:text-church-burgundy py-1.5"
                >
                  <Search className="h-4 w-4" /> Search
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
