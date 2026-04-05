"use client";

import { useState, useCallback, useRef, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface WhatsAppFormProps {
  /** Visual variant — 'default' for standalone, 'compact' for popup/embedded */
  variant?: "default" | "compact";
  /** Source identifier for analytics */
  source?: string;
}

const PHONE_NUMBER = "5538998269290";

const INTERESSE_OPTIONS = [
  { value: "", label: "Qual seu interesse?" },
  { value: "Emagrecimento", label: "🔥 Emagrecimento" },
  { value: "Implantes Hormonais", label: "💉 Implantes Hormonais" },
  { value: "Longevidade", label: "💚 Longevidade / Check-up" },
  { value: "Outro", label: "📋 Outro assunto" },
] as const;

/** Format phone to (XX) XXXXX-XXXX */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Validate Brazilian mobile: 11 digits, 9th digit prefix */
function isValidPhone(formatted: string): boolean {
  const digits = formatted.replace(/\D/g, "");
  return digits.length === 11 && digits[2] === "9";
}

/** Build WhatsApp URL with pre-filled message */
function buildWhatsAppURL(nome: string, telefone: string, interesse: string): string {
  const message = [
    `Olá! Sou *${nome.trim()}*, vim pelo site e gostaria de agendar uma avaliação.`,
    ``,
    `📋 *Interesse:* ${interesse}`,
    `📱 *Meu WhatsApp:* ${telefone}`,
    ``,
    `Aguardo retorno!`,
  ].join("\n");

  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppForm({
  variant = "default",
  source = "whatsapp-form",
}: WhatsAppFormProps) {
  const formStartFired = useRef(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [interesse, setInteresse] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState(false);

  const fireFormStart = useCallback(() => {
    if (!formStartFired.current) {
      formStartFired.current = true;
      trackEvent({ name: "form_start", params: { form_name: `whatsapp-form-${source}` } });
    }
  }, [source]);

  const nomeError = touched && nome.trim().length < 2;
  const telefoneError = touched && !isValidPhone(telefone);
  const interesseError = touched && !interesse;

  const handlePhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTelefone(formatPhone(e.target.value));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setTouched(true);

      if (nome.trim().length < 2 || !isValidPhone(telefone) || !interesse) {
        return;
      }

      setStatus("submitting");
      setErrorMsg("");

      try {
        // Save lead to API for backup tracking
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: nome.trim(),
            whatsapp: telefone.replace(/\D/g, ""),
            interesse,
            source,
          }),
        });

        // Non-blocking: if API fails, still open WhatsApp
        if (!res.ok) {
          console.warn("Lead API save failed, proceeding to WhatsApp");
        }
      } catch {
        // API failure is non-blocking — WhatsApp is the primary channel
        console.warn("Lead API unreachable, proceeding to WhatsApp");
      }

      // Track conversions
      trackEvent({ name: "whatsapp_click", params: { location: source } });
      trackEvent({
        name: "lead",
        params: { content_name: `whatsapp-form-${source}`, value: 0, currency: "BRL" },
      });

      // Build and open WhatsApp
      const url = buildWhatsAppURL(nome, telefone, interesse);
      window.open(url, "_blank", "noopener,noreferrer");

      setStatus("success");
    },
    [nome, telefone, interesse, source]
  );

  const isCompact = variant === "compact";

  const inputBase =
    "w-full rounded-xl border bg-slate-800/60 text-slate-100 placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-wheat-500/50 focus:border-wheat-500/50";
  const inputSize = isCompact ? "px-3 py-2.5 text-sm" : "px-4 py-3.5 text-base";
  const borderNormal = "border-slate-700/60";
  const borderError = "border-red-500/60";

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`flex flex-col items-center justify-center text-center ${isCompact ? "py-4" : "py-8"}`}
          >
            <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-green-400" />
            </div>
            <h3 className={`font-bold text-slate-50 mb-2 ${isCompact ? "text-lg" : "text-xl"}`}>
              WhatsApp aberto!
            </h3>
            <p className="text-slate-400 text-sm max-w-xs mb-4">
              Sua mensagem já está pronta — é só enviar. Respondemos em até 2 horas.
            </p>
            <button
              onClick={() => {
                const url = buildWhatsAppURL(nome, telefone, interesse);
                window.open(url, "_blank", "noopener,noreferrer");
              }}
              className="text-sm text-green-400 hover:text-green-300 underline underline-offset-2"
            >
              Abrir WhatsApp novamente
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            noValidate
            className={`flex flex-col ${isCompact ? "gap-2.5" : "gap-3.5"}`}
          >
            {/* Nome */}
            <div>
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onFocus={fireFormStart}
                disabled={status === "submitting"}
                aria-invalid={nomeError}
                aria-label="Nome"
                className={`${inputBase} ${inputSize} ${nomeError ? borderError : borderNormal}`}
              />
              {nomeError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-xs text-red-400 mt-1 ml-1"
                >
                  Informe seu nome
                </motion.p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={handlePhoneChange}
                onFocus={fireFormStart}
                disabled={status === "submitting"}
                aria-invalid={telefoneError}
                aria-label="WhatsApp"
                className={`${inputBase} ${inputSize} ${telefoneError ? borderError : borderNormal}`}
              />
              {telefoneError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-xs text-red-400 mt-1 ml-1"
                >
                  Informe um WhatsApp válido com DDD
                </motion.p>
              )}
            </div>

            {/* Interesse */}
            <div>
              <select
                value={interesse}
                onChange={(e) => setInteresse(e.target.value)}
                onFocus={fireFormStart}
                disabled={status === "submitting"}
                aria-invalid={interesseError}
                aria-label="Interesse"
                className={`${inputBase} ${inputSize} ${interesseError ? borderError : borderNormal} ${!interesse ? "text-slate-500" : ""}`}
              >
                {INTERESSE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={!opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {interesseError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-xs text-red-400 mt-1 ml-1"
                >
                  Selecione uma área de interesse
                </motion.p>
              )}
            </div>

            {/* Error banner */}
            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-3 py-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-sm text-red-300">{errorMsg}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === "submitting"}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed min-h-[48px] ${isCompact ? "py-3 text-sm" : "py-4 text-base md:text-lg"}`}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Abrindo WhatsApp...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" />
                  Enviar e Abrir WhatsApp
                </>
              )}
            </motion.button>

            <p className="text-xs text-slate-500 text-center">
              Seus dados ficam seguros. A mensagem chega pronta no WhatsApp — é só enviar.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
