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