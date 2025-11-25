// Block onetrust-consent-sdk.js script
(function () {
  "use strict";

  // Method 1: Prevent script element creation
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.tagName === "SCRIPT") {
          const src = node.src || "";
          // Detect onetrust-consent-sdk.js
          if (src.includes("onetrust-consent-sdk") || src.includes("cdn.cookielaw.org")) {
            console.log("[PureSurf] Blocked script:", src);
            node.remove();
          }
        }
      });
    });
  });

  // Start observing DOM changes
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // Method 2: Remove existing OneTrust elements
  function removeOneTrustElements() {
    // Remove OneTrust banners and popups
    const selectors = [
      "#onetrust-consent-sdk",
      "#onetrust-banner-sdk",
      "#onetrust-pc-sdk",
      ".onetrust-pc-dark-filter",
      ".optanon-alert-box-wrapper",
      '[class*="onetrust"]',
      '[id*="onetrust"]',
      // Guardian overlay
      'iframe[id^="sp_message_iframe"]',
      'iframe[src*="sourcepoint.theguardian.com"]',
      '[id^="sp_message_container"]'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        console.log("[PureSurf] Removed element:", selector);
        el.remove();
      });
    });

    // Restore page scrolling (OneTrust may disable scrolling)
    // Add null check to prevent errors when document.body is not loaded
    if (document.body) {
      document.body.style.overflow = "";
    }
    if (document.documentElement) {
      document.documentElement.style.overflow = "";
    }
  }

  // Wait for DOM to load before executing
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", removeOneTrustElements);
  } else {
    removeOneTrustElements();
  }

  // Periodically check and remove (prevent delayed loading)
  setInterval(removeOneTrustElements, 500);

  // Method 3: Intercept network requests (as fallback)
  if (window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      const url = args[0];
      if (typeof url === "string" && (url.includes("onetrust-consent-sdk") || url.includes("cdn.cookielaw.org"))) {
        console.log("[PureSurf] Blocked request:", url);
        return Promise.reject(new Error("Blocked by PureSurf"));
      }
      return originalFetch.apply(this, args);
    };
  }

  console.log("[PureSurf] Content script loaded");
})();
