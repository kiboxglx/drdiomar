"use client";

import { useState, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const REQUEST_TYPE_OPTIONS = [
  { value: "", label: "O que você gostaria de fazer?" },
  { value: "acesso", label: "Acessar meus dados" },
  { value: "correcao", label: "Corrigir dados incorretos" },
  { value: "exclusao", label: "Excluir meus dados" },
  { value: "portabilidade", label: "Receber meus dados (portabilidade)" },
  { value: "revogacao", label: "Revogar meu consentimento" },
  { value: "outro", label: "Outra solicitação" },
] as const;

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/**
 * Form for LGPD Art. 18 data subject rights requests.
 * Sends to /api/data-request, which persists in public.data_requests for manual processing.
 */
export default function DataRequestForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [requestType, setRequestType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState(false);

  const nomeError = touched && nome.trim().length < 2;
  const typeError = touched && !requestType;
  const contactError =
    touched &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    whatsapp.replace(/\D/g, "").length !== 11;

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setTouched(true);

      if (nomeError || typeError || contactError) return;

      setStatus("loading");
      setErrorMsg("");

      try {
        const res = await fetch("/api/data-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: nome.trim(),
            email: email.trim() || null,
            whatsapp: whatsapp.replace(/\D/g, "") || null,
            request_type: requestType,
            description: description.trim() || null,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Erro ao enviar.");
        }

        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMsg(
          err instanceof Error ? err.message : "Erro inesperado. Tente novamente."
        );
      }
    },
    [nome, email, whatsapp, requestType, description, nomeError, typeError, contactError]
  );

  const inputBase =
    "w-full rounded-xl border bg-slate-900 text-slate-100 placeholder:text-slate-500 px-4 py-3 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-wheat-500/50 focus:border-wheat-500/50 disabled:opacity-50";
  const borderOk = "border-slate-700/60";
  const borderErr = "border-red-500/60";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center bg-slate-900 border border-slate-800 rounded-2xl p-8"
      >
        <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-50 mb-2">Solicitação enviada</h3>
        <p className="text-slate-300 text-sm max-w-md leading-relaxed">
          Recebemos sua solicitação. A equipe Dr. Diomar Cangussu vai analisar e
          responder pelo canal informado em até <strong>15 dias</strong>, conforme o Art. 19 da
          LGPD.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5 bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-slate-50 mb-1">Exercer meus direitos</h3>
      <p className="text-sm text-slate-300 mb-3">
        Preencha o formulário abaixo. A equipe Dr. Diomar Cangussu responde em até 15 dias úteis.
      </p>

      <div>
        <label htmlFor="dr-nome" className="sr-only">Nome completo</label>
        <input
          id="dr-nome"
          type="text"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="name"
          aria-invalid={nomeError}
          disabled={status === "loading"}
          className={`${inputBase} ${nomeError ? borderErr : borderOk}`}
        />
        {nomeError && <p className="text-xs text-red-400 mt-1 ml-1">Informe seu nome.</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="dr-email" className="sr-only">E-mail</label>
          <input
            id="dr-email"
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            disabled={status === "loading"}
            className={`${inputBase} ${borderOk}`}
          />
        </div>
        <div>
          <label htmlFor="dr-whats" className="sr-only">WhatsApp</label>
          <input
            id="dr-whats"
            type="tel"
            placeholder="WhatsApp (opcional)"
            value={whatsapp}
            onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
            autoComplete="tel"
            inputMode="numeric"
            disabled={status === "loading"}
            className={`${inputBase} ${borderOk}`}
          />
        </div>
      </div>
      {contactError && (
        <p className="text-xs text-red-400 -mt-2 ml-1">
          Informe pelo menos um canal de contato (e-mail ou WhatsApp).
        </p>
      )}

      <div>
        <label htmlFor="dr-type" className="sr-only">Tipo de solicitação</label>
        <select
          id="dr-type"
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          aria-invalid={typeError}
          disabled={status === "loading"}
          className={`${inputBase} ${typeError ? borderErr : borderOk} ${!requestType ? "text-slate-500" : ""}`}
        >
          {REQUEST_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={!opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {typeError && (
          <p className="text-xs text-red-400 mt-1 ml-1">Selecione o tipo de solicitação.</p>
        )}
      </div>

      <div>
        <label htmlFor="dr-desc" className="sr-only">Detalhes adicionais</label>
        <textarea
          id="dr-desc"
          placeholder="Detalhes adicionais (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          maxLength={2000}
          disabled={status === "loading"}
          className={`${inputBase} ${borderOk} resize-none`}
        />
      </div>

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

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-wheat-500 hover:bg-wheat-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-wheat-900/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px]"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" /> Enviar solicitação
          </>
        )}
      </button>

      <p className="text-xs text-slate-500">
        Suas informações são tratadas conforme nossa Política de Privacidade. Apenas a equipe
        autorizada do consultório terá acesso à sua solicitação.
      </p>
    </form>
  );
}
