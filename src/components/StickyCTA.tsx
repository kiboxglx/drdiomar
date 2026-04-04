"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck } from "lucide-react";

const SCROLL_THRESHOLD = 0.3; // 30% of page

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  const update = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = docHeight > 0 ? scrollTop / docHeight : 0;

    // Hide if haven't scrolled past threshold
    if (scrollPct < SCROLL_THRESHOLD) {
      setVisible(false);
      return;
    }

    // Hide if the FinalCTA form section is visible in viewport
    const formSection = document.getElementById("final-cta");
    if (formSection) {
      const rect = formSection.getBoundingClientRect();
      const isFormVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isFormVisible) {
        setVisible(false);
        return;
      }
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    // Only run on mobile (md breakpoint = 768px)
    const mql = window.matchMedia("(max-width: 767px)");
    if (!mql.matches) return;

    const handleChange = (e: MediaQueryListEvent) => {
      if (!e.matches) setVisible(false);
    };
    mql.addEventListener("change", handleChange);

    window.addEventListener("scroll", update, { passive: true });
    update(); // initial check

    return () => {
      mql.removeEventListener("change", handleChange);
      window.removeEventListener("scroll", update);
    };
  }, [update]);

  const handleClick = () => {
    const formSection = document.getElementById("final-cta");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          {/* Top gradient fade for smooth visual blend */}
          <div className="h-4 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

          <div className="bg-slate-950/95 backdrop-blur-md border-t border-slate-800/60 px-4 pb-[env(safe-area-inset-bottom,8px)] pt-3">
            <button
              onClick={handleClick}
              className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-wheat-500 to-wheat-600 hover:from-wheat-400 hover:to-wheat-500 text-slate-900 font-bold py-3.5 rounded-xl shadow-lg shadow-wheat-900/25 transition-all active:scale-[0.98]"
            >
              <CalendarCheck className="w-5 h-5" />
              Agendar Avaliação
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
