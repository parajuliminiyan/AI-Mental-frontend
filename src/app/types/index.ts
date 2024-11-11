export interface UserProfile {
    id: string;
    name: string;
    email: string;
    lastLogin: Date;
}

export interface MoodOption {
    label: string;
    value: string;
}

export interface Tip {
    id: string;
    content: string;
    completed: boolean;
    category?: string;
    timeEstimate?: string;
}

export interface Resource {
    id: string;
    title: string;
    description: string;
    category: string;
    link: string;
}

export interface ChatMessage {
    id: string;
    content: string;
    type: 'user' | 'bot';
    timestamp: Date;
    suggestions?: string[];
    isLoading?: boolean;
}

export type TabType = 'home' | 'chat' | 'profile';

// Add more specific types for components
export interface UserStats {
    checkIns: number;
    streakDays: number;
    journalEntries: number;
    resourcesAccessed: number;
}

export interface MenuItem {
    icon: any; // or use a more specific type for your icons
    label: string;
    path: string;
}

export interface MenuSection {
    title: string;
    items: MenuItem[];
}