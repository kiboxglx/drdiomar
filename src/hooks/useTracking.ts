'use client';

import { useCallback, useEffect, useRef } from 'react';
import { trackEvent, type TrackingEvent } from '@/lib/tracking';
import { hasConsent } from '@/lib/consent';

/**
 * useTracking — React hook for unified analytics.
 *
 * Provides:
 *  - track(): dispatch any TrackingEvent to GA4 + Meta + GAds (auto-gated by LGPD consent in tracking.ts)
 *  - auto scroll-depth tracking at 25%, 50%, 75%, 100% (only with analytics consent)
 *  - auto PageView on mount (only with analytics consent)
 */
export function useTracking() {
  const scrollMilestones = useRef(new Set<number>());

  // --- Auto PageView on mount (only fires after consent + when scripts loaded) ---
  useEffect(() => {
    if (!hasConsent('analytics')) return;
    trackEvent({ name: 'page_view', params: { page_path: window.location.pathname } });
  }, []);

  // --- Scroll depth tracking (gated by analytics consent) ---
  useEffect(() => {
    if (!hasConsent('analytics')) return;
    const milestones = [25, 50, 75, 100];

    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const m of milestones) {
        if (percent >= m && !scrollMilestones.current.has(m)) {
          scrollMilestones.current.add(m);
          trackEvent({
            name: 'scroll_depth',
            params: { percent: m, section: `${m}%` },
          });

          // ViewContent fires at 50% scroll
          if (m === 50) {
            trackEvent({
              name: 'view_content',
              params: {
                content_name: 'Landing Page',
                content_category: 'Medical',
              },
            });
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Imperative dispatch ---
  const track = useCallback((event: TrackingEvent) => {
    trackEvent(event);
  }, []);

  return { track };
}
