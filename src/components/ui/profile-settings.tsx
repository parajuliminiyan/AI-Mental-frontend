'use client';

import { useState } from 'react';
import { Moon, Bell, LogOut } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useAuth } from '@/contexts/auth-context';

export function QuickSettings() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { logout } = useAuth();
    const [notifications, setNotifications] = useState(true);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mb-4">
                Quick Settings
            </h2>
            <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow dark:shadow-dark-md 
                divide-y divide-gray-200 dark:divide-dark-border-primary">
                <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Moon className="w-5 h-5 text-gray-400 dark:text-dark-text-secondary" />
                        <span className="text-sm text-gray-700 dark:text-dark-text-primary">
                            Dark Mode
                        </span>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-primary-500 dark:bg-dark-accent-primary' : 'bg-gray-200 dark:bg-dark-border-primary'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
                <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-400 dark:text-dark-text-secondary" />
                        <span className="text-sm text-gray-700 dark:text-dark-text-primary">
                            Notifications
                        </span>
                    </div>
                    <button
                        onClick={() => setNotifications(!notifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-primary-500 dark:bg-dark-accent-primary' : 'bg-gray-200 dark:bg-dark-border-primary'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="mt-8 w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 
                    rounded-lg px-4 py-4 flex items-center justify-center gap-2 
                    hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
            </button>
        </div>
    );
}