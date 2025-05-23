"use client"

// Google Analytics event tracking
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Facebook Pixel event tracking
export const trackFBEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, parameters)
  }
}

// Template download tracking
export const trackTemplateDownload = (templateId: string, templateTitle: string, isPremium: boolean) => {
  trackEvent("download", "template", templateTitle, isPremium ? 1 : 0)
  trackFBEvent("Purchase", {
    content_name: templateTitle,
    content_category: "template",
    content_ids: [templateId],
    value: isPremium ? 1 : 0,
    currency: "USD",
  })
}

// Template view tracking
export const trackTemplateView = (templateId: string, templateTitle: string, category: string) => {
  trackEvent("view", "template", templateTitle)
  trackFBEvent("ViewContent", {
    content_name: templateTitle,
    content_category: category,
    content_ids: [templateId],
  })
}

// Search tracking
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent("search", "template", searchTerm, resultsCount)
  trackFBEvent("Search", {
    search_string: searchTerm,
  })
}

// User registration tracking
export const trackUserRegistration = () => {
  trackEvent("sign_up", "user")
  trackFBEvent("CompleteRegistration")
}

// Purchase tracking
export const trackPurchase = (templateId: string, templateTitle: string, amount: number) => {
  trackEvent("purchase", "template", templateTitle, amount)
  trackFBEvent("Purchase", {
    content_name: templateTitle,
    content_category: "template",
    content_ids: [templateId],
    value: amount,
    currency: "USD",
  })
}
