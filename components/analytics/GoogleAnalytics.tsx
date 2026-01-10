"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-7VB42L85CL";

function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Track page view
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
        }}
      />
      <GoogleAnalyticsInner />
    </>
  );
}

/**
 * Track custom events in Google Analytics
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && (window as any).gtag && GA_MEASUREMENT_ID) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Track page views manually (if needed)
 */
export function trackPageView(url: string) {
  if (typeof window !== "undefined" && (window as any).gtag && GA_MEASUREMENT_ID) {
    (window as any).gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}
