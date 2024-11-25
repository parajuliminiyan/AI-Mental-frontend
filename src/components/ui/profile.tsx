'use client';

import { UserStats } from './profile-stats';
import { QuickSettings } from './profile-settings';
import { SettingsMenu } from './profile-menu';
import { UserHeader } from './profile-header';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LogIn } from 'lucide-react';

export default function Profile() {
    const { user, signInWithGoogle } = useAuth();
    const router = useRouter();

    // Redirect to home if not logged in
    useEffect(() => {
        if (!user) {
            // router.push('/');
        }
    }, [user, router]);

    // Show login prompt if not authenticated
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary flex items-center justify-center">
                <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-dark-text-primary text-center mb-6">
                        Sign in to View Profile
                    </h2>
                    <p className="text-gray-600 dark:text-dark-text-secondary text-center mb-8">
                        Please sign in to access your profile and personalized features.
                    </p>
                    <button
                        onClick={signInWithGoogle}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 
                            dark:bg-dark-accent-primary hover:bg-primary-600 dark:hover:bg-dark-accent-secondary 
                            text-white rounded-lg transition-colors"
                    >
                        <LogIn className="h-5 w-5" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    const userStats = {
        checkIns: 28,
        streakDays: 7,
        journalEntries: 15,
        resourcesAccessed: 12,
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary pb-20">
            <UserHeader
                profile={{
                    name: user.displayName || 'User',
                    email: user.email || '',
                    joinedDate: new Date(user.metadata.creationTime || Date.now()),
                    avatar: user.photoURL || undefined
                }}
            />
            <div className="max-w-7xl mx-auto px-4 py-6">
                <UserStats stats={userStats} />
                <div className="mt-8">
                    <SettingsMenu />
                </div>
                <div className="mt-8">
                    <QuickSettings />
                </div>
            </div>
        </div>
    );
}