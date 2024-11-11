import { Resource } from '@/app/types';
import { Tip } from '@/app/types';

export const mockResources: Resource[] = [
    {
        id: '1',
        title: 'Understanding Anxiety',
        description: 'Learn about the common symptoms, causes, and coping strategies for anxiety disorders.',
        category: 'Articles',
        link: '#'
    },
    {
        id: '2',
        title: 'Mindful Breathing Exercise',
        description: 'A guided 5-minute breathing exercise to help reduce stress and promote relaxation.',
        category: 'Exercises',
        link: '#'
    },
    {
        id: '3',
        title: 'Sleep Better Tonight',
        description: 'Expert tips and techniques for improving your sleep quality and establishing a healthy sleep routine.',
        category: 'Articles',
        link: '#'
    },
    {
        id: '4',
        title: 'Depression Support Guide',
        description: 'A comprehensive guide to understanding depression, its symptoms, and treatment options.',
        category: 'Guides',
        link: '#'
    },
    {
        id: '5',
        title: 'Progressive Muscle Relaxation',
        description: 'Step-by-step guide to practicing progressive muscle relaxation for stress relief.',
        category: 'Exercises',
        link: '#'
    },
    {
        id: '6',
        title: 'Building Better Relationships',
        description: 'Tips for improving communication and maintaining healthy relationships with others.',
        category: 'Guides',
        link: '#'
    },
    {
        id: '7',
        title: 'Daily Mood Journal Template',
        description: 'A structured template to help you track your moods and identify patterns in your emotional well-being.',
        category: 'Tools',
        link: '#'
    },
    {
        id: '8',
        title: 'Meditation for Beginners',
        description: 'Simple meditation techniques for those just starting their mindfulness journey.',
        category: 'Exercises',
        link: '#'
    },
    {
        id: '9',
        title: 'Stress Management Strategies',
        description: 'Practical techniques for managing stress in your daily life and work.',
        category: 'Articles',
        link: '#'
    },
    {
        id: '10',
        title: 'Self-Care Checklist',
        description: 'A comprehensive checklist to help you maintain good mental health through regular self-care practices.',
        category: 'Tools',
        link: '#'
    },
    {
        id: '11',
        title: 'Crisis Support Resources',
        description: 'Important contacts and resources for immediate mental health support and crisis intervention.',
        category: 'Emergency',
        link: '#'
    },
    {
        id: '12',
        title: 'Positive Thinking Workshop',
        description: 'Learn techniques to develop a more positive mindset and challenge negative thought patterns.',
        category: 'Workshops',
        link: '#'
    }
];

export const mockTips: Tip[] = [
    {
        id: '1',
        content: 'Take 3 deep breaths and focus on the present moment',
        completed: false,
        category: 'Mindfulness',
        timeEstimate: '1 min'
    },
    {
        id: '2',
        content: 'Write down three things youre grateful for today',
        completed: false,
        category: 'Gratitude',
        timeEstimate: '5 mins'
    },
    {
        id: '3',
        content: 'Go for a short walk outside to refresh your mind',
        completed: false,
        category: 'Physical',
        timeEstimate: '15 mins'
    },
    {
        id: '4',
        content: 'Drink a glass of water and do a quick body scan',
        completed: false,
        category: 'Self-Care',
        timeEstimate: '2 mins'
    },
    {
        id: '5',
        content: 'Send a message to someone you care about',
        completed: false,
        category: 'Connection',
        timeEstimate: '3 mins'
    },
    {
        id: '6',
        content: 'Listen to your favorite uplifting song',
        completed: false,
        category: 'Mood',
        timeEstimate: '4 mins'
    }
];

export type { Tip };
