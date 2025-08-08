import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Check } from 'lucide-react';
import Cookies from 'js-cookie';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPrefs = JSON.parse(consent);
        setPreferences(savedPrefs);
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    saveCookiePreferences(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(onlyNecessary);
    saveCookiePreferences(onlyNecessary);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    saveCookiePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveCookiePreferences = (prefs: CookiePreferences) => {
    // Save for 1 year
    Cookies.set('cookie-consent', JSON.stringify(prefs), { expires: 365 });
    
    // Apply preferences to actual tracking
    if (prefs.analytics) {
      // Enable Google Analytics
      window.gtag && window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    } else {
      // Disable Google Analytics
      window.gtag && window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }

    // Handle other cookie types as needed
    if (prefs.marketing) {
      // Enable marketing cookies
      window.gtag && window.gtag('consent', 'update', {
        ad_storage: 'granted'
      });
    } else {
      window.gtag && window.gtag('consent', 'update', {
        ad_storage: 'denied'
      });
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 md:p-6">
        <div className="container-custom">
          <div className="flex items-start gap-4">
            <Cookie className="text-arch-primary mt-1 flex-shrink-0" size={24} />
            <div className="flex-1">
              <h3 className="font-montserrat font-semibold mb-2">We Use Cookies</h3>
              <p className="text-gray-600 text-sm mb-4">
                We use cookies to enhance your browsing experience, analyze our traffic, and provide personalized content. 
                By clicking "Accept All," you consent to our use of cookies. You can manage your preferences by clicking "Cookie Settings."
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="btn-primary text-sm py-2 px-4"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectAll}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="text-arch-primary hover:text-arch-secondary transition-colors text-sm py-2 px-4 border border-arch-primary hover:bg-arch-primary hover:text-white rounded"
                >
                  <Settings className="inline mr-1" size={16} />
                  Cookie Settings
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-xl font-montserrat font-semibold">Cookie Settings</h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <p className="text-gray-600 text-sm">
                Choose which cookies you want to accept. You can change these settings at any time, 
                but some features may not work properly if you disable certain cookies.
              </p>

              {/* Necessary Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 mr-4">
                  <h3 className="font-medium mb-1">Necessary Cookies</h3>
                  <p className="text-sm text-gray-600">
                    These cookies are essential for the website to function properly. They cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" size={20} />
                  <span className="text-sm text-gray-500 ml-2">Always On</span>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1 mr-4">
                  <h3 className="font-medium mb-1">Analytics Cookies</h3>
                  <p className="text-sm text-gray-600">
                    These cookies help us understand how visitors interact with our website by collecting anonymous data.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-arch-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-arch-primary"></div>
                </label>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1 mr-4">
                  <h3 className="font-medium mb-1">Functional Cookies</h3>
                  <p className="text-sm text-gray-600">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={() => togglePreference('functional')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-arch-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-arch-primary"></div>
                </label>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1 mr-4">
                  <h3 className="font-medium mb-1">Marketing Cookies</h3>
                  <p className="text-sm text-gray-600">
                    These cookies are used to track visitors across websites to display relevant advertisements.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-arch-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-arch-primary"></div>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="btn-primary flex-1"
                >
                  Save Settings
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="btn-secondary flex-1"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default CookieConsent;
