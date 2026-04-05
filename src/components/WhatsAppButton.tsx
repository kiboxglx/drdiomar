"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTracking } from "@/hooks/useTracking";

const WHATSAPP_URL =
  "https://wa.me/5538998269290?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.";

const SCROLL_HIDE_THRESHOLD = 400;
const PING_DURATION_MS = 5000;

export default function WhatsAppButton() {
  const { track } = useTracking();
  const [showPing, setShowPing] = useState(true);
  const [hiddenOnMobile, setHiddenOnMobile] = useState(false);
  const isMobile = useRef(false);

  /* Stop ping animation after 5 seconds */
  useEffect(() => {
    const timer = setTimeout(() => setShowPing(false), PING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  /* On mobile, hide when MobileBottomBar would be visible (scroll > 400px) */
  const update = useCallback(() => {
    if (!isMobile.current) {
      setHiddenOnMobile(false);
      return;
    }
    setHiddenOnMobile(window.scrollY >= SCROLL_HIDE_THRESHOLD);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    isMobile.current = mql.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      isMobile.current = e.matches;
      if (!e.matches) setHiddenOnMobile(false);
    };

    mql.addEventListener("change", handleChange);
    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      mql.removeEventListener("change", handleChange);
      window.removeEventListener("scroll", update);
    };
  }, [update]);

  const handleClick = () => {
    track({ name: "whatsapp_click", params: { location: "floating-button" } });
  };

  return (
    <AnimatePresence>
      {!hiddenOnMobile && (
        <motion.a
          key="whatsapp-fab"
          onClick={handleClick}
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar consulta via WhatsApp com Dr. Diomar"
          className="fixed bottom-20 right-6 z-50 md:bottom-6 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg shadow-green-500/30 transition-all group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {showPing && (
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75 duration-1000" />
          )}
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
