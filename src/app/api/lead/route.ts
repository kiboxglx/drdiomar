import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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

const VALID_INTERESSES = ["emagrecimento", "implantes", "longevidade"] as const;
const VALID_SOURCES = ["form", "exit-intent", "sticky-cta", "final-cta"] as const;

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

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function loadLeads(): Promise<LeadRecord[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw) as LeadRecord[];
  } catch {
    // File doesn't exist yet or is invalid — start fresh
    return [];
  }
}

async function saveLead(record: LeadRecord): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const leads = await loadLeads();
  leads.push(record);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
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

    // Persist
    await saveLead(record);

    return NextResponse.json(
      { success: true, message: "Lead registrado com sucesso." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[api/lead] Unexpected error:", err);
    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
