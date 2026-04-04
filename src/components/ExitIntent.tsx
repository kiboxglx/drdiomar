"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import LeadForm from "./LeadForm";

const SESSION_KEY = "drdiomar_exit_shown";
const MIN_DWELL_MS = 15_000;

export default function ExitIntent() {
  const [visible, setVisible] = useState(false);
  const dwellReady = useRef(false);
  const dismissed = useRef(false);

  const close = useCallback(() => {
    setVisible(false);
    dismissed.current = true;
  }, []);

  useEffect(() => {
    // Skip if already shown this session
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // sessionStorage blocked — skip silently
      return;
    }

    // Dwell timer — popup only eligible after 15s on page
    const dwellTimer = setTimeout(() => {
      dwellReady.current = true;
    }, MIN_DWELL_MS);

    const show = () => {
      if (dismissed.current || !dwellReady.current) return;
      setVisible(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
    };

    // Desktop: mouseleave from viewport (cursor moves toward browser chrome / close)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        show();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(dwellTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="exit-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Oferta especial antes de sair"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />

          {/* Popup card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-wheat-500/20 rounded-2xl shadow-2xl shadow-wheat-900/10 overflow-hidden"
          >
            {/* Accent bar */}
            <div className="h-1 bg-gradient-to-r from-wheat-400 via-wheat-500 to-wheat-600" />

            {/* Close button */}
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="px-6 pt-6 pb-8">
              {/* Icon + heading */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-wheat-500/10 flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 text-wheat-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-50 mb-2">
                  Espere! Não perca essa oportunidade
                </h3>
                <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                  Deixe seus dados e receba uma{" "}
                  <strong className="text-wheat-400">avaliação personalizada</strong>{" "}
                  sem compromisso.
                </p>
              </div>

              {/* Compact lead form */}
              <LeadForm variant="compact" source="exit-intent" onSuccess={close} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
