'use client';

import { Menu, AlertTriangle, Moon, Sun, LogIn, LogOut, User } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useAuth } from '@/contexts/auth-context';
import { useState } from 'react';

export function Header() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { user, signInWithGoogle, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

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
                    {/* Theme Toggle */}
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

                    {/* User Authentication */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 
                                    dark:hover:bg-[#2D2D2D] transition-colors"
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || 'User'}
                                        className="w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    <User className="h-5 w-5 text-gray-500 dark:text-[#A0A0A0]" />
                                )}
                            </button>

                            {/* User Menu Dropdown */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-[#2D2D2D] 
                                    rounded-lg shadow-lg border border-gray-200 dark:border-[#333333]">
                                    <div className="px-4 py-2 border-b border-gray-200 dark:border-[#333333]">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {user.displayName}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-[#A0A0A0] truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 
                                            dark:text-red-400 hover:bg-gray-100 dark:hover:bg-[#333333]"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={signInWithGoogle}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
                                bg-primary-500 dark:bg-dark-accent-primary hover:bg-primary-600 
                                dark:hover:bg-dark-accent-secondary rounded-lg transition-colors"
                        >
                            <LogIn className="h-4 w-4" />
                            Sign In
                        </button>
                    )}

                    {/* Emergency Button */}
                    <button
                        className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 
                            hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        onClick={() => window.location.href = '/emergency'}
                    >
                        <AlertTriangle className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}