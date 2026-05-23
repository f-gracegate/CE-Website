import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[24px] border border-white/60 bg-[#f4eae2] shadow-neu-flat"
          >
            {/* Top Glow bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-church-burgundy via-church-rose to-church-burgundy" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/30 px-6 py-4">
              <h3 className="font-display text-sm font-black uppercase tracking-widest text-slate-900">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="rounded-xl p-2.5 text-slate-600 bg-[#f4eae2] border border-white/50 hover:text-church-burgundy transition-all shadow-neu-flat-sm active:scale-95 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="max-h-[75vh] overflow-y-auto p-6 scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
