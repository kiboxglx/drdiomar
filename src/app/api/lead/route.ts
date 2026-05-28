import { NextRequest, NextResponse } from "next/server";

/* ─────────────────────────── Types ─────────────────────────── */

interface LeadPayload {
  nome: string;
  whatsapp: string;
  interesse: string;
  source?: string;
}

interface LeadRecord extends LeadPayload {
  id: string;
  createdAt: string;
  ip: string;
}

/* ─────────────────────── Rate Limiter ──────────────────────── */

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max submissions per window per IP

const ipSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipSubmissions.get(ip) ?? [];

  // Prune old entries
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    ipSubmissions.set(ip, recent);
    return true;
  }

  recent.push(now);
  ipSubmissions.set(ip, recent);
  return false;
}

/* ─────────────────────── Validation ────────────────────────── */

const VALID_INTERESSES = [
  "ganho-peso",
  "sintomas-hormonais",
  "checkup",
  "outro",
  // Compat: legacy values from WhatsAppForm (free text, sent as-is)
  "Ganho de peso / dificuldade para emagrecer",
  "Fadiga / queda de libido / sintomas hormonais",
  "Check-up e prevenção",
  "Outro motivo",
] as const;

const VALID_SOURCES = [
  "form",
  "exit-intent",
  "sticky-cta",
  "final-cta",
  "hero",
  "inline-cta",
  "mobile-bottom-bar",
  "navbar",
  "whatsapp-form",
] as const;

function sanitize(input: string): string {
  return input.replace(/[<>"'&]/g, "").trim();
}

function validatePayload(
  body: unknown
): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Corpo da requisição inválido." };
  }

  const { nome, whatsapp, interesse, source } = body as Record<string, unknown>;

  // Nome: required, min 2 chars, max 120
  if (typeof nome !== "string" || nome.trim().length < 2) {
    return { ok: false, error: "Nome é obrigatório (mínimo 2 caracteres)." };
  }
  if (nome.length > 120) {
    return { ok: false, error: "Nome muito longo (máximo 120 caracteres)." };
  }

  // WhatsApp: exactly 11 digits, 3rd digit must be 9
  if (typeof whatsapp !== "string") {
    return { ok: false, error: "WhatsApp é obrigatório." };
  }
  const digits = whatsapp.replace(/\D/g, "");
  if (digits.length !== 11 || digits[2] !== "9") {
    return {
      ok: false,
      error: "WhatsApp inválido. Informe DDD + número com 9 dígitos.",
    };
  }

  // Interesse: must be one of the allowed values
  if (
    typeof interesse !== "string" ||
    !VALID_INTERESSES.includes(interesse as (typeof VALID_INTERESSES)[number])
  ) {
    return { ok: false, error: "Selecione uma área de interesse válida." };
  }

  // Source: optional, sanitize if present
  const safeSource =
    typeof source === "string" &&
    VALID_SOURCES.includes(source as (typeof VALID_SOURCES)[number])
      ? source
      : "form";

  return {
    ok: true,
    data: {
      nome: sanitize(nome),
      whatsapp: digits,
      interesse: interesse as string,
      source: safeSource,
    },
  };
}

/* ──────────────────────── Storage ──────────────────────────── */

/**
 * Persist a lead to Supabase. Returns true on success, false on failure or
 * when Supabase env vars are not configured (in that case the lead is logged
 * to console only — WhatsApp remains the source of truth via deep link).
 *
 * Required env vars (Netlify dashboard):
 *   - SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY  (server-side only — never expose to client)
 *
 * Expected table: public.leads
 *   columns: id (uuid pk, default gen_random_uuid()), nome (text), whatsapp (text),
 *            interesse (text), source (text), ip (text), created_at (timestamptz default now())
 */
async function saveLead(record: LeadRecord): Promise<boolean> {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    // Not configured yet — non-blocking. WhatsApp is the primary channel.
    if (process.env.NODE_ENV === "development") {
      console.warn("[api/lead] Supabase env vars missing — lead not persisted:", record);
    }
    return false;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        nome: record.nome,
        whatsapp: record.whatsapp,
        interesse: record.interesse,
        source: record.source,
        ip: record.ip,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* ──────────────────────── Handler ──────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde um minuto." },
        { status: 429 }
      );
    }

    // Parse & validate
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Corpo da requisição inválido." },
        { status: 400 }
      );
    }

    const result = validatePayload(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Build record
    const record: LeadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      ...result.data,
      createdAt: new Date().toISOString(),
      ip,
    };

    // Persist (non-blocking — WhatsApp deep link is the primary conversion path)
    await saveLead(record);

    return NextResponse.json(
      { success: true, message: "Lead registrado com sucesso." },
      { status: 201 }
    );
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[api/lead] Unexpected error:", err);
    }
    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
