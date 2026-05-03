export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGtag() {
  if (typeof window === "undefined") return null;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => {
    window.dataLayer?.push(args);
  });

  return window.gtag;
}

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID) return;

  const gtag = ensureGtag();
  if (!gtag) return;

  gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (!GA_MEASUREMENT_ID) return;

  const gtag = ensureGtag();
  if (!gtag) return;

  gtag("event", eventName, params);
}

export function trackLead(formType: "appointment" | "contact" | "refill" | "transfer") {
  trackEvent("generate_lead", { form_type: formType });
}
