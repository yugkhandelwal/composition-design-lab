import ReactGA from 'react-ga4';

// Analytics configuration
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID, {
    testMode: process.env.NODE_ENV === 'test',
    gaOptions: {
      // Custom configurations
      send_page_view: false, // We'll handle page views manually
    }
  });
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  ReactGA.event({
    action,
    category,
    label,
    value,
  });
};

// Track specific business events
export const trackContactForm = (method: 'submit' | 'error' | 'success') => {
  trackEvent(method, 'Contact Form', undefined, 1);
};

export const trackProjectView = (projectName: string) => {
  trackEvent('view', 'Project', projectName);
};

export const trackServiceInquiry = (serviceName: string) => {
  trackEvent('inquiry', 'Service', serviceName);
};

export const trackNavigation = (section: string) => {
  trackEvent('navigate', 'Navigation', section);
};

export const trackDownload = (fileName: string) => {
  trackEvent('download', 'File', fileName);
};

export const trackPhoneCall = () => {
  trackEvent('call', 'Contact', 'Phone');
};

export const trackEmailClick = () => {
  trackEvent('email', 'Contact', 'Email');
};

// Performance tracking
export const trackPerformance = (metric: string, value: number) => {
  ReactGA.gtag('event', 'timing_complete', {
    name: metric,
    value: Math.round(value)
  });
};

// User engagement tracking
export const trackScroll = (percentage: number) => {
  if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
    trackEvent(`scroll_${percentage}`, 'Engagement', 'Page Scroll');
  }
};

export const trackTimeOnPage = (seconds: number) => {
  // Track time milestones
  if (seconds === 30 || seconds === 60 || seconds === 120 || seconds === 300) {
    trackEvent(`time_${seconds}s`, 'Engagement', 'Time on Page');
  }
};
