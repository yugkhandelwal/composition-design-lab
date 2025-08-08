import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import TouchOptimizedButton from '../ui/TouchOptimizedButton';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppChrome = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppChrome) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after user has been on site for a while
      setTimeout(() => {
        if (!isInstalled) {
          setShowPrompt(true);
        }
      }, 30000); // Show after 30 seconds
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
    } else {
      console.log('User dismissed the PWA install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed in this session
  if (isInstalled || sessionStorage.getItem('pwa-prompt-dismissed') || !showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:max-w-sm z-50 animate-slide-up">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
        <div className="flex items-start gap-3">
          <div className="bg-arch-primary bg-opacity-10 p-2 rounded-full flex-shrink-0">
            <Smartphone className="text-arch-primary" size={24} />
          </div>
          
          <div className="flex-1">
            <h3 className="font-montserrat font-semibold text-sm mb-1">
              Install Our App
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Add Composition Design Lab to your home screen for quick access to our portfolio and services.
            </p>
            
            <div className="flex gap-2">
              <TouchOptimizedButton
                onClick={handleInstallClick}
                className="flex items-center bg-arch-primary text-white text-xs py-2 px-3 rounded-lg hover:bg-arch-secondary transition-colors"
                aria-label="Install app"
              >
                <Download size={14} className="mr-1" />
                Install
              </TouchOptimizedButton>
              
              <TouchOptimizedButton
                onClick={handleDismiss}
                className="text-xs py-2 px-3 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Dismiss install prompt"
              >
                Not now
              </TouchOptimizedButton>
            </div>
          </div>
          
          <TouchOptimizedButton
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close install prompt"
          >
            <X size={16} />
          </TouchOptimizedButton>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
