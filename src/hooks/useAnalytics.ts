import { useEffect, useCallback } from 'react';
import { trackScroll, trackTimeOnPage } from '../lib/analytics';

export const useAnalytics = () => {
  // Track scroll percentage
  useEffect(() => {
    let timeOnPage = 0;
    const startTime = Date.now();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      trackScroll(scrollPercent);
    };

    // Time tracking
    const timeInterval = setInterval(() => {
      timeOnPage = Math.round((Date.now() - startTime) / 1000);
      trackTimeOnPage(timeOnPage);
    }, 30000); // Check every 30 seconds

    // Throttled scroll tracking
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearInterval(timeInterval);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return {
    // Return any analytics utilities if needed
  };
};

// Hook for tracking page views
export const usePageTracking = (pageName: string) => {
  useEffect(() => {
    // Track page view when component mounts
    import('../lib/analytics').then(({ trackPageView }) => {
      trackPageView(window.location.pathname, pageName);
    });
  }, [pageName]);
};
