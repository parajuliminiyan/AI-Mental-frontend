'use client';

import { Menu, AlertTriangle } from 'lucide-react';

export function Header() {
    return (
        <header className="bg-white dark:bg-[#1E1E1E] shadow-sm dark:shadow-none border-b border-gray-200 dark:border-[#333333]">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center">
                    <Menu className="h-6 w-6 text-gray-500 dark:text-[#A0A0A0] hover:text-gray-700 dark:hover:text-white transition-colors" />
                    <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Mental Health Companion
                    </h1>
                </div>
                <button
                    className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 
                        hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    onClick={() => window.location.href = '/emergency'}
                >
                    <AlertTriangle className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}