'use client';

import Chat from '@/components/ui/chat';
import { Navigation } from '@/components/ui/navigation';

export default function ChatPage() {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 overflow-hidden">
                <Chat />
            </div>
            <Navigation />
        </div>
    );
}