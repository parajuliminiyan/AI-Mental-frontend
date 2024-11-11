import { useEffect, useState } from 'react';
import {
    Menu,
    House as HomeIcon,
    MessageCircle,
    User,
    AlertTriangle,
    Calendar,
    BookOpen,
    Activity
} from 'lucide-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { UserProfile, MoodOption } from '@/app/types';
import { Navigation } from '@/components/ui/navigation';

// Mock API functions - replace with actual API calls later
const mockApi = {
    getUserProfile: async (): Promise<UserProfile> => ({
        id: '1',
        name: 'John',
        email: 'john@example.com',
        lastLogin: new Date(),
    }),
    getMoodSuggestions: async (): Promise<MoodOption[]> => ([
        { label: 'Calm', value: 'calm' },
        { label: 'Happy', value: 'happy' },
        { label: 'Manic', value: 'manic' },
        { label: 'Angry', value: 'angry' },
        { label: 'Sad', value: 'sad' }
    ]),
    getDailyTips: async (): Promise<string[]> => ([
        'Write down three things you\'re grateful for.',
        'Practice deep breathing for 5 minutes.',
        'Take a short walk to refresh your mind.'
    ]),
    getResourceCategories: async (): Promise<string[]> => ([
        'Mental Health Articles',
        'Therapy Sessions',
        'Meditation Guides'
    ])
};

const Home: NextPage = () => {
    const [currentMood, setCurrentMood] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'profile'>('home');
    const [user, setUser] = useState<UserProfile | null>(null);
    const [moodOptions, setMoodOptions] = useState<MoodOption[]>([]);
    const [dailyTips, setDailyTips] = useState<string[]>([]);
    const [resourceCategories, setResourceCategories] = useState<string[]>([]);

    // Load initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userProfile, moods, tips, resources] = await Promise.all([
                    mockApi.getUserProfile(),
                    mockApi.getMoodSuggestions(),
                    mockApi.getDailyTips(),
                    mockApi.getResourceCategories()
                ]);

                setUser(userProfile);
                setMoodOptions(moods);
                setDailyTips(tips);
                setResourceCategories(resources);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const getGreeting = (): string => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    if (!user) return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary flex items-center justify-center">
            <div className="text-gray-500 dark:text-dark-text-secondary">Loading...</div>
        </div>
    );
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary">
            {/* Header */}
            <header className="bg-white dark:bg-dark-bg-secondary shadow-sm dark:shadow-dark-md border-b border-gray-200 dark:border-dark-border-primary">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center">
                        <Menu className="h-6 w-6 text-gray-500 dark:text-dark-text-secondary" />
                        <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-dark-text-primary">
                            MindWise
                        </h1>
                    </div>
                    <button className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                        <AlertTriangle className="h-5 w-5" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
                {activeTab === 'home' && (
                    <div className="space-y-6">
                        {/* Greeting Section */}
                        <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow dark:shadow-dark-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
                                {getGreeting()}, {user.name}!
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-dark-text-secondary">
                                How are you feeling today?
                            </p>

                            {/* Mood Selection */}
                            <div className="mt-4 grid grid-cols-3 gap-3">
                                {moodOptions.map((mood) => (
                                    <button
                                        key={mood.value}
                                        onClick={() => setCurrentMood(mood.value)}
                                        className={`p-3 rounded-lg text-center transition-colors
                                            ${currentMood === mood.value
                                                ? 'bg-primary-500 dark:bg-dark-accent-primary text-white'
                                                : 'bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200 dark:hover:bg-dark-border-secondary text-gray-700 dark:text-dark-text-primary'
                                            }`}
                                    >
                                        {mood.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Daily Tips */}
                        <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow dark:shadow-dark-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
                                Daily Tips
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {dailyTips.map((tip, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-dark-accent-primary/20 flex items-center justify-center text-green-500 dark:text-dark-accent-primary">
                                            {index + 1}
                                        </span>
                                        <span className="ml-3 text-gray-600 dark:text-dark-text-secondary">
                                            {tip}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resource Center */}
                        <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow dark:shadow-dark-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
                                Resource Center
                            </h3>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {resourceCategories.map((category) => (
                                    <button
                                        key={category}
                                        className="p-4 rounded-lg bg-gray-50 dark:bg-dark-bg-tertiary hover:bg-gray-100 dark:hover:bg-dark-border-secondary text-left transition-colors"
                                    >
                                        <h4 className="font-medium text-gray-900 dark:text-dark-text-primary">
                                            {category}
                                        </h4>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>


            {/* Bottom Navigation */}
            <Navigation />
        </div>

    );
};

export default Home;