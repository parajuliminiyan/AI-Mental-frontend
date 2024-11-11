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

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <Head>
                <title>Mental Health Companion</title>
                <meta name="description" content="AI-powered mental health companion" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <Menu className="h-6 w-6 text-gray-500" />
                            <h1 className="ml-4 text-xl font-semibold text-gray-900">Mental Health Companion</h1>
                        </div>
                        <button className="p-2 rounded-full bg-red-50 text-red-600">
                            <AlertTriangle className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {activeTab === 'home' && (
                        <div className="space-y-6">
                            {/* Greeting Section */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold text-gray-900">{getGreeting()}, {user.name}!</h2>
                                <p className="mt-2 text-secondary-600">How are you feeling today?</p>

                                {/* Mood Selection */}
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

                            {/* Daily Tips */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900">Daily Tips</h3>
                                <ul className="mt-4 space-y-3">
                                    {dailyTips.map((tip, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                                                {index + 1}
                                            </span>
                                            <span className="ml-3 text-secondary-600">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Resource Center */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900">Resource Center</h3>
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {resourceCategories.map((category) => (
                                        <button
                                            key={category}
                                            className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 text-left transition-colors"
                                        >
                                            <h4 className="font-medium text-gray-900">{category}</h4>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-around py-3">
                            <button
                                onClick={() => setActiveTab('home')}
                                className={`flex flex-col items-center ${activeTab === 'home' ? 'text-green-500' : 'text-gray-400'}`}
                            >
                                <HomeIcon className="h-6 w-6" />
                                <span className="text-xs mt-1">Home</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('chat')}
                                className={`flex flex-col items-center ${activeTab === 'chat' ? 'text-green-500' : 'text-gray-400'}`}
                            >
                                <MessageCircle className="h-6 w-6" />
                                <span className="text-xs mt-1">Chat</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-green-500' : 'text-gray-400'}`}
                            >
                                <User className="h-6 w-6" />
                                <span className="text-xs mt-1">Profile</span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Home;