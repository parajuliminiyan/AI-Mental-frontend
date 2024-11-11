'use client';

import { UserStats } from './profile-stats';
import { QuickSettings } from './profile-settings';
import { SettingsMenu } from './profile-menu';
import { UserHeader } from './profile-header';
import { useState } from 'react';

interface UserProfile {
    name: string;
    email: string;
    joinedDate: Date;
    avatar?: string;
}

interface UserStatsData {
    checkIns: number;
    streakDays: number;
    journalEntries: number;
    resourcesAccessed: number;
}

export default function Profile() {
    const [userProfile] = useState<UserProfile>({
        name: 'John Doe',
        email: 'john@example.com',
        joinedDate: new Date('2024-01-01'),
    });

    const [userStats] = useState<UserStatsData>({
        checkIns: 28,
        streakDays: 7,
        journalEntries: 15,
        resourcesAccessed: 12,
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary pb-20">
            <UserHeader profile={userProfile} />
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