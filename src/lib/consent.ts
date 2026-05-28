/**
 * LGPD consent management.
 * Categories: essential (always on), analytics (GA4), marketing (Meta Pixel + Google Ads).
 * Persisted in localStorage as JSON. Versioned so we can re-prompt on policy changes.
 */

export const CONSENT_KEY = "drdiomar_consent_v1";
export const CONSENT_VERSION = "1.0";

export type ConsentCategory = "essential" | "analytics" | "marketing";

export interface ConsentState {
  version: string;
  essential: true; // always true — non-optional
  analytics: boolean;
  marketing: boolean;
  acceptedAt: string; // ISO timestamp
}

const SERVER_SAFE_DEFAULT: ConsentState = {
  version: CONSENT_VERSION,
  essential: true,
  analytics: false,
  marketing: false,
  acceptedAt: "",
};

/** Read current consent. Returns null if not yet decided. */
export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null; // outdated → re-prompt
    return parsed;
  } catch {
    return null;
  }
}

/** Persist consent and notify listeners (so scripts can react immediately). */
export function setConsent(partial: Partial<Omit<ConsentState, "version" | "essential" | "acceptedAt">>): ConsentState {
  const next: ConsentState = {
    ...SERVER_SAFE_DEFAULT,
    analytics: !!partial.analytics,
    marketing: !!partial.marketing,
    acceptedAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("drdiomar:consent-changed", { detail: next }));
  }
  return next;
}

/** True only when the user explicitly granted this category. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "essential") return true;
  const current = getConsent();
  if (!current) return false;
  return !!current[category];
}

/** Reset the saved decision (used by "manage cookies" link in the footer). */
export function resetConsent(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new CustomEvent("drdiomar:consent-changed", { detail: null }));
}
