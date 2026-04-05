"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  MessageCircle,
  ClipboardList,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { trackEvent } from "@/lib/tracking";

const WHATSAPP_URL =
  "https://wa.me/5538998269290?text=Ol%C3%A1%2C%20acabei%20de%20preencher%20o%20formul%C3%A1rio%20no%20site%20e%20gostaria%20de%20confirmar%20meu%20agendamento.";

const NEXT_STEPS = [
  {
    icon: MessageCircle,
    title: "Confirmação via WhatsApp",
    description:
      "Nossa equipe entrará em contato pelo WhatsApp em até 2 horas para confirmar sua avaliação.",
  },
  {
    icon: ClipboardList,
    title: "Avaliação Personalizada",
    description:
      "Na consulta, o Dr. Diomar analisará seu caso com exames e histórico completo.",
  },
  {
    icon: Sparkles,
    title: "Início do Protocolo",
    description:
      "Você receberá um plano personalizado com acompanhamento contínuo e resultados reais.",
  },
] as const;

export default function ObrigadoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authorized, setAuthorized] = useState(false);

  // --- Access guard: redirect if not from a form submission ---
  useEffect(() => {
    const fromParam = searchParams.get("from");
    const sessionFlag =
      typeof window !== "undefined"
        ? sessionStorage.getItem("lead_submitted")
        : null;

    if (fromParam === "form" || sessionFlag === "true") {
      setAuthorized(true);
      // Clear the one-time session flag
      if (sessionFlag) {
        sessionStorage.removeItem("lead_submitted");
      }
    } else {
      // Not from a valid submission — redirect to home
      router.replace("/");
    }
  }, [searchParams, router]);

  // --- Fire conversion events once authorized ---
  useEffect(() => {
    if (!authorized) return;

    // Google Ads conversion + Meta Pixel Schedule event
    trackEvent({
      name: "schedule",
      params: { value: 0, currency: "BRL" },
    });

    // GA4 page_view for /obrigado
    trackEvent({
      name: "page_view",
      params: { page_path: "/obrigado" },
    });
  }, [authorized]);

  // Don't render until access is validated
  if (!authorized) {
    return null;
  }

  return (
    <main className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden py-16 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-950" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-wheat-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full">
        {/* Success card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-950 border border-slate-800/60 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              {/* Pulse ring */}
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-green-500/10 animate-ping" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-slate-50 mb-3 leading-tight">
              Agendamento{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Confirmado!
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
              Seus dados foram recebidos com sucesso. Estamos preparando tudo
              para sua avaliação personalizada.
            </p>
          </motion.div>

          {/* Next steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-4 mb-10"
          >
            <h2 className="text-sm font-semibold text-wheat-400 uppercase tracking-wider text-center mb-6">
              Próximos Passos
            </h2>

            {NEXT_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.15, duration: 0.4 }}
                className="flex items-start gap-4 bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-wheat-500/10 border border-wheat-500/20 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-wheat-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-wheat-500/70 bg-wheat-500/10 px-2 py-0.5 rounded-full">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-slate-100 text-sm">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="flex flex-col gap-3"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com a Equipe no WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => router.push("/")}
              className="w-full flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-medium py-3.5 px-6 rounded-xl border border-slate-700/60 hover:border-slate-600 transition-all"
            >
              Voltar ao Site
            </button>
          </motion.div>

          {/* Trust footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-8 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-wheat-500/70" />
              <span>Dados protegidos</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-wheat-500/70" />
              <span>Retorno em até 2h</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-wheat-500/70" />
              <span>CRM 60.143 MG</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
