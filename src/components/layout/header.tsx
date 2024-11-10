'use client';

import { Menu, AlertTriangle } from 'lucide-react';

export function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center">
                    <Menu className="h-6 w-6 text-gray-500" />
                    <h1 className="ml-4 text-xl font-semibold text-gray-900">Mental Health Companion</h1>
                </div>
                <button
                    className="p-2 rounded-full bg-red-50 text-red-600"
                    onClick={() => window.location.href = '/emergency'}
                >
                    <AlertTriangle className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}