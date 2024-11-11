import { useState } from 'react';
import { Moon, Bell, LogOut } from 'lucide-react';

export function QuickSettings() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Settings</h2>
            <div className="bg-white rounded-lg shadow divide-y">
                <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Moon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-700">Dark Mode</span>
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-primary-500' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
                <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-700">Notifications</span>
                    </div>
                    <button
                        onClick={() => setNotifications(!notifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-primary-500' : 'bg-gray-200'
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
                onClick={() => {/* Handle logout */ }}
                className="mt-8 w-full bg-red-50 text-red-600 rounded-lg px-4 py-4 flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
            >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
            </button>
        </div>
    );
}