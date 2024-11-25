'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function PWAPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const handler = (e: Event) => {
            // Prevent Chrome from showing the default install prompt
            e.preventDefault();
            // Save the event for later use
            setDeferredPrompt(e);
            // Show our custom prompt
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond
        const { outcome } = await deferredPrompt.userChoice;

        // Clear the deferred prompt
        setDeferredPrompt(null);
        setShowPrompt(false);

        // Optionally track the outcome
        console.log(`User response to install prompt: ${outcome}`);
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-20 left-4 right-4 bg-white dark:bg-dark-bg-secondary rounded-lg shadow-lg p-4 
      border border-gray-200 dark:border-dark-border-primary mx-auto max-w-sm">
            <button
                onClick={() => setShowPrompt(false)}
                className="absolute top-2 right-2 text-gray-400 dark:text-dark-text-secondary 
          hover:text-gray-600 dark:hover:text-dark-text-primary"
            >
                <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mb-2">
                Install App
            </h3>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                Install MindWise App for easier access and offline support.
            </p>
            <div className="flex justify-end gap-3">
                <button
                    onClick={() => setShowPrompt(false)}
                    className="px-4 py-2 text-sm text-gray-600 dark:text-dark-text-secondary"
                >
                    Not now
                </button>
                <button
                    onClick={handleInstall}
                    className="px-4 py-2 text-sm bg-primary-500 dark:bg-dark-accent-primary text-white rounded-lg
            hover:bg-primary-600 dark:hover:bg-dark-accent-secondary transition-colors"
                >
                    Install
                </button>
            </div>
        </div>
    );
}