/**
 * Unified Tracking Module
 * Dispatches events to GA4, Meta Pixel, and Google Ads simultaneously.
 * All IDs are read from env or hardcoded fallbacks for this deployment.
 */

// --- Platform IDs ---
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-CN78RTJQKZ';
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || 'AW-17885917270';
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

// --- Type declarations for global tracking APIs ---
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

// --- Safety helpers ---
function gtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

function fbqAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

// --- GA4 helpers ---
export function gtagEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (!gtagAvailable()) return;
  window.gtag('event', eventName, params);
}

export function gtagConversion(
  conversionLabel: string,
  params?: Record<string, unknown>
): void {
  if (!gtagAvailable()) return;
  window.gtag('event', 'conversion', {
    send_to: `${GADS_ID}/${conversionLabel}`,
    ...params,
  });
}

// --- Meta Pixel helpers ---
export function fbqTrack(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (!fbqAvailable()) return;
  window.fbq('track', eventName, params);
}

export function fbqTrackCustom(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (!fbqAvailable()) return;
  window.fbq('trackCustom', eventName, params);
}

// --- Unified event types ---
export type TrackingEvent =
  | { name: 'page_view'; params?: { page_path?: string } }
  | { name: 'view_content'; params?: { content_name?: string; content_category?: string; value?: number } }
  | { name: 'lead'; params?: { content_name?: string; value?: number; currency?: string } }
  | { name: 'contact'; params?: { method?: string; content_name?: string } }
  | { name: 'schedule'; params?: { value?: number; currency?: string } }
  | { name: 'cta_click'; params?: { cta_location?: string; cta_text?: string } }
  | { name: 'scroll_depth'; params?: { percent?: number; section?: string } }
  | { name: 'form_start'; params?: { form_name?: string } }
  | { name: 'faq_opened'; params?: { question?: string; index?: number } }
  | { name: 'protocol_interest'; params?: { protocol_name?: string } }
  | { name: 'exit_intent_shown'; params?: Record<string, unknown> }
  | { name: 'exit_intent_converted'; params?: Record<string, unknown> }
  | { name: 'whatsapp_click'; params?: { location?: string } }
  | { name: 'sticky_cta_click'; params?: { cta_text?: string } }
  | { name: 'phone_click'; params?: { location?: string } };

/**
 * Unified tracking dispatcher.
 * Sends events to all configured platforms with appropriate mappings.
 */
export function trackEvent(event: TrackingEvent): void {
  if (typeof window === 'undefined') return;

  // Cast params to Record for GA4 (it accepts anything)
  const gaParams = (event.params ?? {}) as Record<string, unknown>;
  gtagEvent(event.name, gaParams);

  // --- Meta Pixel: map to standard or custom events ---
  switch (event.name) {
    case 'page_view':
      fbqTrack('PageView');
      break;
    case 'view_content': {
      const p = event.params ?? {};
      fbqTrack('ViewContent', {
        content_name: p.content_name || 'Landing Page',
        content_category: p.content_category || 'Medical',
      });
      break;
    }
    case 'lead': {
      const p = event.params ?? {};
      fbqTrack('Lead', {
        content_name: p.content_name || 'Formulário Agendamento',
        value: p.value || 0,
        currency: p.currency || 'BRL',
      });
      break;
    }
    case 'contact': {
      const p = event.params ?? {};
      fbqTrack('Contact', {
        content_name: p.content_name || 'WhatsApp',
      });
      break;
    }
    case 'schedule': {
      const p = event.params ?? {};
      fbqTrack('Schedule', {
        value: p.value || 0,
        currency: p.currency || 'BRL',
      });
      gtagConversion('FJy-CJiu8JgcENbg1dBC', { value: 25.0, currency: 'BRL' });
      break;
    }
    case 'cta_click':
      fbqTrackCustom('CTAClick', gaParams);
      break;
    case 'whatsapp_click':
      fbqTrack('Contact', { content_name: 'WhatsApp' });
      gtagConversion('FJy-CJiu8JgcENbg1dBC', { value: 25.0, currency: 'BRL' });
      break;
    case 'form_start':
      fbqTrackCustom('FormStart', gaParams);
      break;
    case 'scroll_depth':
      fbqTrackCustom('ScrollDepth', gaParams);
      break;
    case 'faq_opened':
      fbqTrackCustom('FAQOpened', gaParams);
      break;
    case 'protocol_interest':
      fbqTrackCustom('ProtocolInterest', gaParams);
      break;
    case 'exit_intent_shown':
      fbqTrackCustom('ExitIntentShown', gaParams);
      break;
    case 'exit_intent_converted':
      fbqTrackCustom('ExitIntentConverted', gaParams);
      break;
    case 'sticky_cta_click':
      fbqTrackCustom('StickyCTAClick', gaParams);
      break;
    case 'phone_click':
      fbqTrack('Contact', { content_name: 'Phone' });
      break;
  }
}

/**
 * Returns the Meta Pixel ID for use in the pixel initialization script.
 */
export function getMetaPixelId(): string {
  return FB_PIXEL_ID;
}

/**
 * Returns the GA4 measurement ID.
 */
export function getGA4Id(): string {
  return GA4_ID;
}

/**
 * Returns the Google Ads ID.
 */
export function getGAdsId(): string {
  return GADS_ID;
}
