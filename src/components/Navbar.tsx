"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/tracking";

const NAV_LINKS = [
  { label: "Início", id: "top" },
  { label: "Protocolos", id: "protocols" },
  { label: "Resultados", id: "results" },
  { label: "Especialista", id: "specialist" },
  { label: "Depoimentos", id: "testimonials" },
  { label: "Locais", id: "hubs" },
  { label: "FAQ", id: "faq" },
] as const;

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const scrollToSection = useCallback((id: string) => {
    setMobileOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleCtaClick = () => {
    trackEvent({ name: "whatsapp_click", params: { location: "navbar" } });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-slate-950/80 backdrop-blur-md border-slate-800 py-2 md:py-3"
            : "bg-transparent py-3 md:py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo — clicks scroll to top */}
          <button
            onClick={() => scrollToSection("top")}
            className="relative h-14 w-56 md:h-16 md:w-64 lg:h-20 lg:w-80 shrink-0"
            aria-label="Voltar ao início"
          >
            <Image
              src="/assets/logo.webp"
              alt="Dr. Diomar Cangussu - Nutrologia"
              fill
              className="object-contain object-left"
              priority
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm xl:text-base font-medium text-slate-300 hover:text-wheat-400 transition-colors px-3 py-2 rounded-lg hover:bg-slate-800/50"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA Button */}
            <a
              onClick={handleCtaClick}
              href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex bg-wheat-500 hover:bg-wheat-400 text-slate-950 font-bold py-2.5 px-5 md:px-7 rounded-xl transition-all shadow-[0_0_15px_rgba(245,222,179,0.3)] hover:shadow-[0_0_20px_rgba(245,222,179,0.5)] text-sm md:text-base text-center min-h-[44px] items-center"
            >
              Agendar Consulta
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-wheat-400 transition-colors"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[60px] left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 lg:hidden shadow-2xl"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-left text-base font-medium text-slate-300 hover:text-wheat-400 hover:bg-slate-800/50 transition-colors px-4 py-3 rounded-xl"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="h-px bg-slate-800 my-2" />
                <a
                  onClick={() => {
                    handleCtaClick();
                    setMobileOpen(false);
                  }}
                  href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-wheat-500 hover:bg-wheat-400 text-slate-950 font-bold py-3.5 rounded-xl text-base min-h-[48px] transition-colors"
                >
                  Agendar Consulta
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
