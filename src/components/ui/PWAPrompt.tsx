import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import TouchOptimizedButton from './TouchOptimizedButton';

interface PWAPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
}

const PWAPrompt: React.FC<PWAPromptProps> = ({ onInstall, onDismiss }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install prompt
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      onInstall?.();
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    onDismiss?.();
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 mx-auto max-w-sm">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Download className="h-6 w-6 text-arch-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900">
            Install Composition Design Lab
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Get quick access to our services and portfolio right from your home screen.
          </p>
          <div className="flex space-x-2 mt-3">
            <TouchOptimizedButton
              onClick={handleInstall}
              className="bg-arch-primary text-white px-3 py-1.5 text-sm rounded-md"
            >
              Install
            </TouchOptimizedButton>
            <TouchOptimizedButton
              onClick={handleDismiss}
              className="text-gray-600 px-3 py-1.5 text-sm"
            >
              Not now
            </TouchOptimizedButton>
          </div>
        </div>
        <div className="flex-shrink-0">
          <TouchOptimizedButton
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </TouchOptimizedButton>
        </div>
      </div>
    </div>
  );
};

export default PWAPrompt;
