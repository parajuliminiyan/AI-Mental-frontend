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
            // Replace with your API call
            const response = await fetch('/api/moods');
            const data = await response.json();
            setMoodOptions(data);
        };

        fetchMoods();
    }, []);

    if (!user) return null;

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900">{greeting}, {user.name}!</h2>
            <p className="mt-2 text-gray-600">How are you feeling today?</p>

            <div className="mt-4 grid grid-cols-3 gap-3">
                {moodOptions.map((mood) => (
                    <button
                        key={mood.value}
                        onClick={() => setCurrentMood(mood.value)}
                        className={`p-3 rounded-lg text-center transition-colors
              ${currentMood === mood.value
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                        {mood.label}
                    </button>
                ))}
            </div>
        </div>
    );
}