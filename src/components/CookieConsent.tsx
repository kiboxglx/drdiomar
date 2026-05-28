"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, Settings2, X, ShieldCheck } from "lucide-react";
import {
  CONSENT_VERSION,
  getConsent,
  setConsent,
  resetConsent,
} from "@/lib/consent";

/** Fire-and-forget log to /api/consent (audit trail). Non-blocking. */
function logConsent(
  action: "accept_all" | "essential_only" | "custom" | "reset",
  analytics: boolean,
  marketing: boolean
) {
  if (typeof window === "undefined") return;
  fetch("/api/consent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      policy_version: CONSENT_VERSION,
      analytics,
      marketing,
      action,
    }),
    keepalive: true,
  }).catch(() => {
    /* ignore — banner is non-critical to log */
  });
}

/**
 * LGPD-compliant cookie banner.
 * Bottom banner with 3 buttons (Accept all / Essential only / Customize).
 * Customize opens a modal with granular toggles (analytics, marketing).
 * Re-openable via "Gerenciar cookies" link in the footer (event: drdiomar:open-cookie-settings).
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // On mount: show banner only if no current consent for this version
  useEffect(() => {
    const current = getConsent();
    if (!current) {
      setVisible(true);
    } else {
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
    }

    const onOpen = () => {
      const c = getConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setModalOpen(true);
    };
    window.addEventListener("drdiomar:open-cookie-settings", onOpen);
    return () => window.removeEventListener("drdiomar:open-cookie-settings", onOpen);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  // Escape closes modal
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const acceptAll = useCallback(() => {
    setConsent({ analytics: true, marketing: true });
    logConsent("accept_all", true, true);
    setAnalytics(true);
    setMarketing(true);
    setVisible(false);
    setModalOpen(false);
  }, []);

  const acceptEssential = useCallback(() => {
    setConsent({ analytics: false, marketing: false });
    logConsent("essential_only", false, false);
    setAnalytics(false);
    setMarketing(false);
    setVisible(false);
    setModalOpen(false);
  }, []);

  const saveCustom = useCallback(() => {
    setConsent({ analytics, marketing });
    logConsent("custom", analytics, marketing);
    setVisible(false);
    setModalOpen(false);
  }, [analytics, marketing]);

  const reopenBanner = useCallback(() => {
    resetConsent();
    logConsent("reset", false, false);
    setAnalytics(false);
    setMarketing(false);
    setVisible(true);
    setModalOpen(false);
  }, []);

  return (
    <>
      {/* Bottom banner */}
      <AnimatePresence>
        {visible && !modalOpen && (
          <motion.div
            key="cookie-banner"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            role="region"
            aria-label="Aviso de cookies"
            className="fixed bottom-0 left-0 right-0 z-[90] md:bottom-4 md:left-4 md:right-4 md:max-w-3xl md:mx-auto"
          >
            <div className="bg-slate-900/95 backdrop-blur-md border-t md:border border-slate-700/60 md:rounded-2xl shadow-2xl shadow-black/40 p-5 md:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] md:pb-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-xl bg-wheat-500/10 border border-wheat-500/20 items-center justify-center">
                  <Cookie className="w-5 h-5 text-wheat-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base md:text-lg font-bold text-slate-50 mb-1.5">
                    Sua privacidade é importante
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Usamos cookies essenciais para o site funcionar e, com sua autorização, cookies de
                    análise e marketing para entender o uso do site e mensurar campanhas. Você pode
                    aceitar todos, manter apenas os essenciais ou personalizar suas preferências.{" "}
                    <Link href="/privacidade" className="text-wheat-400 underline">
                      Política de Privacidade
                    </Link>
                    .
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={acceptAll}
                      className="flex-1 sm:flex-initial bg-wheat-500 hover:bg-wheat-400 text-slate-950 font-bold text-sm px-4 py-2.5 rounded-xl min-h-[44px] transition-colors"
                    >
                      Aceitar todos
                    </button>
                    <button
                      onClick={acceptEssential}
                      className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-700 min-h-[44px] transition-colors"
                    >
                      Apenas essenciais
                    </button>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-transparent hover:bg-slate-800 text-slate-300 hover:text-slate-100 font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-700 min-h-[44px] transition-colors"
                    >
                      <Settings2 className="w-4 h-4" />
                      Personalizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Granular modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="cookie-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            onClick={() => setModalOpen(false)}
          >
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-700/60 rounded-t-3xl md:rounded-3xl shadow-2xl shadow-black/40 overflow-hidden"
            >
              <div className="flex items-start justify-between p-5 md:p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-wheat-500/10 border border-wheat-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-wheat-400" />
                  </div>
                  <div>
                    <h2
                      id="cookie-modal-title"
                      className="text-lg font-bold text-slate-50"
                    >
                      Preferências de cookies
                    </h2>
                    <p className="text-xs text-slate-400">Versão {CONSENT_VERSION}</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  aria-label="Fechar"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 md:p-6 space-y-4">
                <CategoryRow
                  title="Essenciais"
                  description="Necessários para o funcionamento básico do site (sessão, segurança, persistência da sua escolha de cookies). Sempre ativos."
                  enabled
                  locked
                />
                <CategoryRow
                  title="Análise"
                  description="Google Analytics. Ajuda a entender como o site é usado para melhorarmos a experiência. Dados agregados."
                  enabled={analytics}
                  onChange={setAnalytics}
                />
                <CategoryRow
                  title="Marketing"
                  description="Meta Pixel (Facebook/Instagram) e Google Ads. Mensuração e otimização das campanhas que trazem você até aqui."
                  enabled={marketing}
                  onChange={setMarketing}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-5 md:p-6 border-t border-slate-800 bg-slate-950/30">
                <button
                  onClick={saveCustom}
                  className="flex-1 bg-wheat-500 hover:bg-wheat-400 text-slate-950 font-bold text-sm px-4 py-2.5 rounded-xl min-h-[44px] transition-colors"
                >
                  Salvar preferências
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-700 min-h-[44px] transition-colors"
                >
                  Aceitar todos
                </button>
              </div>

              <p className="text-xs text-slate-500 px-5 md:px-6 pb-5 md:pb-6">
                Veja detalhes em{" "}
                <Link
                  href="/privacidade"
                  className="text-wheat-400 underline"
                  onClick={() => setModalOpen(false)}
                >
                  Política de Privacidade
                </Link>
                {" · "}
                <button
                  onClick={reopenBanner}
                  className="text-wheat-400 underline"
                >
                  Limpar minha decisão
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface CategoryRowProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange?: (value: boolean) => void;
  locked?: boolean;
}

function CategoryRow({ title, description, enabled, onChange, locked }: CategoryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 bg-slate-950/50 border border-slate-800 rounded-2xl p-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-slate-100 mb-1">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={`${title}${locked ? " (sempre ativo)" : ""}`}
        disabled={locked}
        onClick={() => onChange?.(!enabled)}
        className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors ${
          enabled ? "bg-wheat-500" : "bg-slate-700"
        } ${locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:opacity-90"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
