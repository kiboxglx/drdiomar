"use client";

import { motion } from "framer-motion";
import { MessageCircle, Clock } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

const WHATSAPP_URL =
  "https://wa.me/5538998269290?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.";

export default function InlineCTA() {
  const { track } = useTracking();

  const handleClick = () => {
    track({
      name: "whatsapp_click",
      params: { location: "inline-cta" },
    });
  };

  return (
    <section
      aria-label="Agendar consulta rápida"
      className="relative py-10 md:py-14 overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-wheat-500/[0.06] via-slate-900/80 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-wheat-500/[0.04] to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="container mx-auto px-4 md:px-6 relative z-10 max-w-2xl text-center"
      >
        <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed mb-6">
          Já se identificou?{" "}
          <span className="text-wheat-400">
            Fale com a equipe do Dr.&nbsp;Diomar agora.
          </span>
        </p>

        {/* CTA button — full-width on mobile, auto-width centered on desktop */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-2.5
            w-full md:w-auto
            bg-green-600 hover:bg-green-500
            text-white font-bold
            py-4 px-8
            text-lg
            min-h-[48px]
            rounded-xl
            shadow-lg shadow-green-900/30
            transition-colors active:scale-[0.98]"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          Agendar via WhatsApp
        </a>

        {/* Micro-copy */}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-sm text-slate-400">
          <Clock className="w-3.5 h-3.5 text-wheat-500" />
          <span>Resposta em até 2 horas</span>
        </div>
      </motion.div>
    </section>
  );
}
