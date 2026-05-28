import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint para receber solicitações de titulares (LGPD Art. 18).
 * Atendimento manual pela equipe em até 15 dias (Art. 19).
 *
 * Tipos de solicitação:
 *   - acesso         (titular quer saber quais dados temos)
 *   - correcao       (corrigir dado incompleto/inexato)
 *   - exclusao       (eliminar dados)
 *   - portabilidade  (receber dados em formato estruturado)
 *   - revogacao     (revogar consentimento)
 *   - outro          (descrever em description)
 */

const VALID_REQUEST_TYPES = [
  "acesso",
  "correcao",
  "exclusao",
  "portabilidade",
  "revogacao",
  "outro",
] as const;

type RequestType = (typeof VALID_REQUEST_TYPES)[number];

interface DataRequestPayload {
  nome: string;
  email: string | null;
  whatsapp: string | null;
  request_type: RequestType;
  description: string | null;
}

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3; // 3 requests / hour / IP
const ipSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipSubmissions.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    ipSubmissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipSubmissions.set(ip, recent);
  return false;
}

function sanitize(input: string, max: number): string {
  return input.replace(/[<>"'&]/g, "").trim().slice(0, max);
}

function validate(
  body: unknown
): { ok: true; data: DataRequestPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Corpo inválido." };
  }
  const { nome, email, whatsapp, request_type, description } = body as Record<
    string,
    unknown
  >;

  if (typeof nome !== "string" || nome.trim().length < 2) {
    return { ok: false, error: "Informe seu nome." };
  }
  if (
    typeof request_type !== "string" ||
    !VALID_REQUEST_TYPES.includes(request_type as RequestType)
  ) {
    return { ok: false, error: "Tipo de solicitação inválido." };
  }

  const hasEmail = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasWhats = typeof whatsapp === "string" && whatsapp.replace(/\D/g, "").length === 11;
  if (!hasEmail && !hasWhats) {
    return {
      ok: false,
      error: "Informe pelo menos um canal de contato (e-mail ou WhatsApp).",
    };
  }

  return {
    ok: true,
    data: {
      nome: sanitize(nome, 120),
      email: hasEmail ? sanitize(email as string, 200) : null,
      whatsapp: hasWhats ? (whatsapp as string).replace(/\D/g, "") : null,
      request_type: request_type as RequestType,
      description:
        typeof description === "string" && description.trim().length > 0
          ? sanitize(description, 2000)
          : null,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas solicitações. Aguarde uma hora." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
    }

    const result = validate(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      // Não-bloqueante: retorna sucesso para não travar usuário; em prod, envvars são obrigatórias.
      if (process.env.NODE_ENV === "development") {
        console.warn("[api/data-request] Supabase env missing:", result.data);
      }
      return NextResponse.json({ success: true, persisted: false });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/data_requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        nome: result.data.nome,
        email: result.data.email,
        whatsapp: result.data.whatsapp,
        request_type: result.data.request_type,
        description: result.data.description,
        ip,
      }),
    });

    return NextResponse.json(
      { success: true, persisted: res.ok, message: "Solicitação recebida. Responderemos em até 15 dias." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro interno." },
      { status: 500 }
    );
  }
}
