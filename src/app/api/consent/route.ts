import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint para registrar o consentimento de cookies do usuário (LGPD audit trail).
 * Disparado pelo CookieConsent ao clicar Aceitar/Essencial/Salvar.
 * Não-bloqueante: falha silenciosa não impede o usuário de continuar.
 */

const VALID_ACTIONS = ["accept_all", "essential_only", "custom", "reset"] as const;
type ConsentAction = (typeof VALID_ACTIONS)[number];

interface ConsentPayload {
  policy_version: string;
  analytics: boolean;
  marketing: boolean;
  action: ConsentAction;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
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

function validate(
  body: unknown
): { ok: true; data: ConsentPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Corpo inválido." };
  }
  const { policy_version, analytics, marketing, action } = body as Record<string, unknown>;
  if (typeof policy_version !== "string" || policy_version.length === 0) {
    return { ok: false, error: "policy_version inválido." };
  }
  if (typeof analytics !== "boolean" || typeof marketing !== "boolean") {
    return { ok: false, error: "Flags devem ser booleanas." };
  }
  if (
    typeof action !== "string" ||
    !VALID_ACTIONS.includes(action as ConsentAction)
  ) {
    return { ok: false, error: "action inválida." };
  }
  return {
    ok: true,
    data: {
      policy_version,
      analytics,
      marketing,
      action: action as ConsentAction,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
    const userAgent = request.headers.get("user-agent")?.slice(0, 500) ?? null;

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
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
      // Não-bloqueante: usuário pode continuar mesmo se persistência falhar.
      return NextResponse.json({ success: true, persisted: false });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/consent_logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        ip,
        user_agent: userAgent,
        policy_version: result.data.policy_version,
        analytics: result.data.analytics,
        marketing: result.data.marketing,
        action: result.data.action,
      }),
    });

    return NextResponse.json({ success: true, persisted: res.ok });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
