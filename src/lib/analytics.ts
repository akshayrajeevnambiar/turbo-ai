/**
 * Analytics framework for Turbo AI
 * Supports Google Analytics and other providers
 * Toggleable via environment variables
 */

// Analytics provider interface
interface AnalyticsProvider {
  initialize: (config: Record<string, any>) => void;
  track: (event: string, properties?: Record<string, any>) => void;
  page: (path: string, title?: string) => void;
  identify: (userId: string, traits?: Record<string, any>) => void;
}

// Google Analytics 4 implementation
class GoogleAnalyticsProvider implements AnalyticsProvider {
  private gtag?: (...args: any[]) => void;
  private isInitialized = false;

  initialize(config: Record<string, any>) {
    if (
      this.isInitialized ||
      typeof window === "undefined" ||
      !config.measurementId
    )
      return;

    // Load Google Analytics script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    this.gtag = (...args: any[]) => {
      (window as any).dataLayer.push(args);
    };
    (window as any).gtag = this.gtag;

    this.gtag("js", new Date());
    this.gtag("config", config.measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    this.isInitialized = true;
  }

  track(event: string, properties?: Record<string, any>) {
    if (!this.gtag || !this.isInitialized) return;
    this.gtag("event", event, properties);
  }

  page(path: string, title?: string) {
    if (!this.gtag || !this.isInitialized) return;
    this.gtag("config", "GA_MEASUREMENT_ID", {
      page_path: path,
      page_title: title,
    });
  }

  identify(userId: string, traits?: Record<string, any>) {
    if (!this.gtag || !this.isInitialized) return;
    this.gtag("config", "GA_MEASUREMENT_ID", {
      user_id: userId,
      custom_map: traits,
    });
  }
}

// No-op provider for when analytics is disabled
class NoOpProvider implements AnalyticsProvider {
  initialize() {}
  track() {}
  page() {}
  identify() {}
}

// Main analytics class
class Analytics {
  private provider: AnalyticsProvider;
  private isEnabled: boolean;

  constructor() {
    // Check if analytics is enabled via environment variable
    this.isEnabled = import.meta.env.VITE_ENABLE_ANALYTICS === "true";

    if (this.isEnabled) {
      const provider = import.meta.env.VITE_ANALYTICS_PROVIDER || "google";

      switch (provider) {
        case "google":
          this.provider = new GoogleAnalyticsProvider();
          break;
        default:
          this.provider = new NoOpProvider();
          console.warn(`Unknown analytics provider: ${provider}`);
      }
    } else {
      this.provider = new NoOpProvider();
    }
  }

  /**
   * Initialize analytics with configuration
   */
  init() {
    if (!this.isEnabled) return;

    const config: Record<string, any> = {};

    // Google Analytics configuration
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      config.measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    }

    this.provider.initialize(config);

    // Track initial page view
    this.page(window.location.pathname, document.title);
  }

  /**
   * Track a custom event
   */
  track(event: string, properties?: Record<string, any>) {
    this.provider.track(event, properties);
  }

  /**
   * Track a page view
   */
  page(path: string, title?: string) {
    this.provider.page(path, title || document.title);
  }

  /**
   * Identify a user
   */
  identify(userId: string, traits?: Record<string, any>) {
    this.provider.identify(userId, traits);
  }

  /**
   * Check if analytics is enabled
   */
  get enabled() {
    return this.isEnabled;
  }
}

// Export singleton instance
export const analytics = new Analytics();

// React hook for analytics
export function useAnalytics() {
  const trackEvent = (event: string, properties?: Record<string, any>) => {
    analytics.track(event, properties);
  };

  const trackPage = (path: string, title?: string) => {
    analytics.page(path, title);
  };

  return {
    track: trackEvent,
    page: trackPage,
    enabled: analytics.enabled,
  };
}

// Common event tracking helpers
export const trackEvents = {
  // Navigation events
  pageView: (page: string) => analytics.page(page),
  linkClick: (url: string, text: string) =>
    analytics.track("Link Click", { url, text }),

  // Contact form events
  formSubmit: (formName: string) =>
    analytics.track("Form Submit", { form_name: formName }),
  formSuccess: (formName: string) =>
    analytics.track("Form Success", { form_name: formName }),
  formError: (formName: string, error: string) =>
    analytics.track("Form Error", { form_name: formName, error }),

  // Engagement events
  scrollDepth: (percentage: number) =>
    analytics.track("Scroll Depth", { percentage }),
  timeOnPage: (seconds: number) => analytics.track("Time on Page", { seconds }),

  // CTA events
  ctaClick: (ctaName: string, location: string) =>
    analytics.track("CTA Click", { cta_name: ctaName, location }),
};

// Initialize analytics (call this in your main app)
export function initializeAnalytics() {
  analytics.init();
}
