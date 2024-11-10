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
        <nav className="mt-3 fixed bottom-0 w-full bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-around py-3">
                    {navigation.map(({ name, icon: Icon, path }) => (
                        <button
                            key={name}
                            onClick={() => router.push(path)}
                            className={`flex flex-col items-center ${pathname === path ? 'text-primary-500' : 'text-gray-400'
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