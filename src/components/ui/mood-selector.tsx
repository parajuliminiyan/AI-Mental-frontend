'use client';

import { useState, useEffect } from 'react';
import type { UserProfile, MoodOption } from '@/app/types/index';

interface MoodSelectorProps {
    user: UserProfile | null;
}

export function MoodSelector({ user }: MoodSelectorProps) {
    const [currentMood, setCurrentMood] = useState<string | null>(null);
    const [greeting, setGreeting] = useState<string>('');
    const [moodOptions, setMoodOptions] = useState<MoodOption[]>([]);

    useEffect(() => {
        const hour = new Date().getHours();
        let newGreeting = 'Good Morning';
        if (hour >= 12 && hour < 18) newGreeting = 'Good Afternoon';
        if (hour >= 18) newGreeting = 'Good Evening';
        setGreeting(newGreeting);

        // Fetch mood options
        const fetchMoods = async () => {
            const response = await fetch('/api/moods');
            const data = await response.json();
            setMoodOptions(data);
        };

        fetchMoods();
    }, []);

    if (!user) return null;

    return (
        <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow dark:shadow-dark-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
                {greeting}, {user.name}!
            </h2>
            <p className="mt-2 text-gray-600 dark:text-dark-text-secondary">
                How are you feeling today?
            </p>

            <div className="mt-4 grid grid-cols-3 gap-3">
                {moodOptions.map((mood) => (
                    <button
                        key={mood.value}
                        onClick={() => setCurrentMood(mood.value)}
                        className={`p-3 rounded-lg text-center transition-colors ${currentMood === mood.value
                                ? 'bg-primary-500 dark:bg-dark-accent-primary text-white'
                                : 'bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200 dark:hover:bg-dark-border-secondary text-gray-700 dark:text-dark-text-primary'
                            }`}
                    >
                        {mood.label}
                    </button>
                ))}
            </div>
        </div>
    );
}