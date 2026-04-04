"use client";

import { useState, useCallback, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

interface LeadFormProps {
  /** Visual variant — 'default' for standalone, 'compact' for popup/embedded use */
  variant?: "default" | "compact";
  /** Called on successful submission */
  onSuccess?: () => void;
  /** Source identifier for analytics (e.g. 'final-cta', 'exit-intent') */
  source?: string;
}

/** Format phone to (XX) XXXXX-XXXX pattern */
function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Extract raw digits from formatted phone */
function extractDigits(formatted: string): string {
  return formatted.replace(/\D/g, "");
}

/** Validate Brazilian mobile: 11 digits, starts with valid DDD, 9th digit */
function isValidWhatsApp(formatted: string): boolean {
  const digits = extractDigits(formatted);
  return digits.length === 11 && digits[2] === "9";
}

const INTERESSE_OPTIONS = [
  { value: "", label: "Selecione seu interesse" },
  { value: "emagrecimento", label: "Emagrecimento" },
  { value: "implantes", label: "Implantes Hormonais" },
  { value: "longevidade", label: "Longevidade" },
] as const;

export default function LeadForm({
  variant = "default",
  onSuccess,
  source = "form",
}: LeadFormProps) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [interesse, setInteresse] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Field-level validation state — only shown after first submit attempt
  const [touched, setTouched] = useState(false);

  const nomeError = touched && nome.trim().length < 2;
  const whatsappError = touched && !isValidWhatsApp(whatsapp);
  const interesseError = touched && !interesse;

  const handleWhatsAppChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWhatsapp(formatWhatsApp(e.target.value));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setTouched(true);

      // Client-side gate
      if (nome.trim().length < 2 || !isValidWhatsApp(whatsapp) || !interesse) {
        return;
      }

      setStatus("loading");
      setErrorMsg("");

      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: nome.trim(),
            whatsapp: extractDigits(whatsapp),
            interesse,
            source,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Erro ao enviar. Tente novamente.");
        }

        setStatus("success");
        onSuccess?.();
      } catch (err) {
        setStatus("error");
        setErrorMsg(
          err instanceof Error ? err.message : "Erro inesperado. Tente novamente."
        );
      }
    },
    [nome, whatsapp, interesse, source, onSuccess]
  );

  const isCompact = variant === "compact";

  const inputBase =
    "w-full rounded-xl border bg-slate-800/60 text-slate-100 placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-wheat-500/50 focus:border-wheat-500/50 disabled:opacity-50";
  const inputSize = isCompact ? "px-3 py-2.5 text-sm" : "px-4 py-3.5 text-base";
  const inputBorderNormal = "border-slate-700/60";
  const inputBorderError = "border-red-500/60";

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`flex flex-col items-center justify-center text-center ${isCompact ? "py-6" : "py-10"}`}
          >
            <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-green-400" />
            </div>
            <h3 className={`font-bold text-slate-50 mb-2 ${isCompact ? "text-lg" : "text-xl"}`}>
              Recebemos seus dados!
            </h3>
            <p className="text-slate-400 text-sm max-w-xs">
              Nossa equipe entrará em contato pelo WhatsApp em até 2 horas.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            noValidate
            className={`flex flex-col ${isCompact ? "gap-3" : "gap-4"}`}
          >
            {/* Nome */}
            <div>
              <input
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={status === "loading"}
                aria-invalid={nomeError}
                aria-label="Nome completo"
                className={`${inputBase} ${inputSize} ${nomeError ? inputBorderError : inputBorderNormal}`}
              />
              {nomeError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-xs text-red-400 mt-1 ml-1"
                >
                  Informe seu nome (mínimo 2 caracteres)
                </motion.p>
              )}
            </div>

            {/* WhatsApp */}
            <div>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                value={whatsapp}
                onChange={handleWhatsAppChange}
                disabled={status === "loading"}
                aria-invalid={whatsappError}
                aria-label="WhatsApp"
                className={`${inputBase} ${inputSize} ${whatsappError ? inputBorderError : inputBorderNormal}`}
              />
              {whatsappError && (
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
                disabled={status === "loading"}
                aria-invalid={interesseError}
                aria-label="Interesse"
                className={`${inputBase} ${inputSize} ${interesseError ? inputBorderError : inputBorderNormal} ${!interesse ? "text-slate-500" : ""}`}
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
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-lg px-3 py-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-sm text-red-300">{errorMsg}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-wheat-500 to-wheat-600 hover:from-wheat-400 hover:to-wheat-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-wheat-900/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed ${isCompact ? "py-3 text-sm" : "py-4 text-base"}`}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Quero Agendar Minha Avaliação
                </>
              )}
            </motion.button>

            <p className="text-xs text-slate-500 text-center leading-relaxed">
              Seus dados estão seguros e não serão compartilhados.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
