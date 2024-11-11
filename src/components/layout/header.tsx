'use client';

import { Menu, AlertTriangle, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';

export function Header() {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <header className="bg-white dark:bg-[#1E1E1E] shadow-sm dark:shadow-none border-b border-gray-200 dark:border-[#333333]">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center">
                    <Menu className="h-6 w-6 text-gray-500 dark:text-[#A0A0A0] hover:text-gray-700 dark:hover:text-white transition-colors" />
                    <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Mental Health Companion
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D] 
                            text-gray-500 dark:text-[#A0A0A0] transition-colors"
                        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDarkMode ? (
                            <Sun className="h-5 w-5 text-yellow-500 hover:text-yellow-600 transition-colors" />
                        ) : (
                            <Moon className="h-5 w-5 text-gray-500 hover:text-gray-600 transition-colors" />
                        )}
                    </button>

                    {/* Emergency Button */}
                    <button
                        className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 
                            hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        onClick={() => window.location.href = '/emergency'}
                        aria-label="Emergency support"
                    >
                        <AlertTriangle className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}