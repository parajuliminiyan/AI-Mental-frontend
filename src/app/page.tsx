'use client';

import { Header } from '@/components/layout/header';
import { MoodSelector } from '@/components/ui/mood-selector';
import { DailyTips } from '@/components/ui/daily-tips';
import { ResourceCenter } from '@/components/ui/resource-center';
import { Navigation } from '@/components/ui/navigation';
import { useState, useEffect } from 'react';
import type { UserProfile } from '@/app/types';

export default function Home() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Fetch user data
        const fetchUser = async () => {
            // Replace with your API call
            const response = await fetch('/api/user');
            const data = await response.json();
            setUser(data);
        };

        fetchUser();
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121212]">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
                <div className="space-y-6">
                    <MoodSelector user={user} />
                    <DailyTips />
                    <ResourceCenter />
                </div>
            </main>
            <Navigation />
        </div>
    );
}