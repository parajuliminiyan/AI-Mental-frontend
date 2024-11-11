'use client';

import { Home, MessageCircle, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function Navigation() {
    const router = useRouter();
    const pathname = usePathname();

    const navigation = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Chat', icon: MessageCircle, path: '/chat' },
        { name: 'Profile', icon: User, path: '/profile' }
    ];

    return (
        <nav className="mt-3 fixed bottom-0 w-full bg-white dark:bg-dark-bg-secondary border-t border-gray-200 dark:border-dark-border-primary">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-around py-3">
                    {navigation.map(({ name, icon: Icon, path }) => (
                        <button
                            key={name}
                            onClick={() => router.push(path)}
                            className={`flex flex-col items-center ${pathname === path
                                    ? 'text-primary-500 dark:text-dark-accent-primary'
                                    : 'text-gray-400 dark:text-dark-text-secondary hover:text-primary-500 dark:hover:text-dark-accent-primary'
                                }`}
                        >
                            <Icon className="h-6 w-6" />
                            <span className="text-xs mt-1">{name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}