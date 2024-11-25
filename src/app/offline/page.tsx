'use client';

import { WifiOff, RefreshCw } from 'lucide-react';

export default function Offline() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-dark-bg-secondary rounded-lg shadow-lg p-8 text-center">
                <div className="flex justify-center mb-6">
                    <WifiOff className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
                    You&apos;re Offline
                </h1>

                <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
                    Please check your internet connection and try again.
                </p>

                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                window.location.reload();
                            }
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 dark:bg-dark-accent-primary 
              text-white rounded-lg hover:bg-primary-600 dark:hover:bg-dark-accent-secondary 
              transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-primary-500 dark:focus:ring-dark-accent-primary"
                    >
                        <RefreshCw className="h-5 w-5" />
                        <span>Try Again</span>
                    </button>
                </div>
            </div>
        </div>
    );
}