"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

/**
 * Google Tag Manager Component
 * Implements GTM container for advanced tracking and tag management
 * 
 * To get your GTM ID:
 * 1. Go to https://tagmanager.google.com
 * 2. Create a container or select existing one
 * 3. Copy the Container ID (format: GTM-XXXXXXX)
 * 4. Add it to your .env.local file as: NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
 */
export function GoogleTagManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GTM_ID || typeof window === "undefined") return;

    // Push page view to dataLayer for GTM
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "page_view",
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [pathname, searchParams]);

  if (!GTM_ID) {
    // In development, log a warning
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Google Tag Manager ID not found. Add NEXT_PUBLIC_GTM_ID to your .env.local file"
      );
    }
    return null;
  }

  return (
    <>
      {/* Google Tag Manager - Non-blocking */}
      <Script
        id="google-tag-manager"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

/**
 * Push custom events to GTM dataLayer
 * Usage: pushToDataLayer({ event: 'custom_event', category: 'engagement', action: 'click' })
 */
export function pushToDataLayer(data: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push(data);
  }
}

/**
 * Track custom events in GTM
 */
export function trackGTMEvent(
  eventName: string,
  eventData?: Record<string, any>
) {
  pushToDataLayer({
    event: eventName,
    ...eventData,
  });
}

/**
 * Track conversions (e.g., form submissions, bookings)
 */
export function trackConversion(
  conversionType: string,
  value?: number,
  currency: string = "USD"
) {
  pushToDataLayer({
    event: "conversion",
    conversion_type: conversionType,
    value: value,
    currency: currency,
  });
}
