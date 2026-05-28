"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent, type ConsentState } from "@/lib/consent";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-CN78RTJQKZ";
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || "AW-17885917270";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

/**
 * Loads analytics/marketing scripts only after the user grants LGPD consent.
 * Subscribes to the `drdiomar:consent-changed` custom event so the scripts
 * appear (or get removed by reload) the moment the user opts in.
 */
export default function ConsentGatedScripts() {
  const [consent, setConsentState] = useState<ConsentState | null>(null);

  useEffect(() => {
    setConsentState(getConsent());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as ConsentState | null;
      setConsentState(detail);
    };
    window.addEventListener("drdiomar:consent-changed", onChange);
    return () =>
      window.removeEventListener("drdiomar:consent-changed", onChange);
  }, []);

  const analytics = !!consent?.analytics;
  const marketing = !!consent?.marketing;
  const loadGtagBase = analytics || marketing; // gtag.js shared by GA4 + Google Ads

  return (
    <>
      {/* gtag.js core — required by GA4 and Google Ads */}
      {loadGtagBase && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              ${analytics ? `gtag('config', '${GA4_ID}');` : ""}
              ${marketing ? `gtag('config', '${GADS_ID}');` : ""}
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel — gated by marketing consent */}
      {marketing && FB_PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}
