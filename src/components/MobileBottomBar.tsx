"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

const WHATSAPP_URL =
  "https://wa.me/5538998269290?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.";

const SCROLL_THRESHOLD_PX = 400;

export default function MobileBottomBar() {
  const [visible, setVisible] = useState(false);
  const isMobile = useRef(false);
  const { track } = useTracking();

  const update = useCallback(() => {
    if (!isMobile.current) return;

    const scrollY = window.scrollY;

    // Don't show until user scrolls past threshold
    if (scrollY < SCROLL_THRESHOLD_PX) {
      setVisible(false);
      return;
    }

    // Hide when FinalCTA section is in viewport
    const finalCta = document.getElementById("final-cta");
    if (finalCta) {
      const rect = finalCta.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInView) {
        setVisible(false);
        return;
      }
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    isMobile.current = mql.matches;

    if (!mql.matches) return;

    const handleChange = (e: MediaQueryListEvent) => {
      isMobile.current = e.matches;
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
    track({
      name: "whatsapp_click",
      params: { location: "mobile-bottom-bar" },
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mobile-bottom-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="bg-slate-950/95 backdrop-blur-sm border-t border-slate-800 px-4 pb-[env(safe-area-inset-bottom,8px)] pt-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="flex items-center justify-center gap-2.5
                w-[calc(100%-2rem)] mx-auto
                bg-green-600 hover:bg-green-500
                text-white font-bold
                py-3 rounded-xl
                shadow-lg shadow-green-900/30
                transition-colors active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              Agendar Consulta
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
