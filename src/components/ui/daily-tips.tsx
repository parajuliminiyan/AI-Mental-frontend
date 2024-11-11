'use client';

import { useState } from 'react';
import {
    Check,
    Clock,
    Heart,
    Music,
    Users,
    Smile,
    Pencil,
    Wind,
    Trophy
} from 'lucide-react';
import { mockTips } from '@/lib/mock-data';
import { Tip } from '@/app/types';


export function DailyTips() {
    // Use the corrected mockTips
    const [tips, setTips] = useState<Tip[]>(mockTips);
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [showCompleted, setShowCompleted] = useState(true);

    const getCategoryIcon = (category: string = '') => {
        switch (category.toLowerCase()) {
            case 'mindfulness':
                return <Wind className="h-4 w-4" />;
            case 'gratitude':
                return <Heart className="h-4 w-4" />;
            case 'physical':
                return <Clock className="h-4 w-4" />;
            case 'self-care':
                return <Smile className="h-4 w-4" />;
            case 'connection':
                return <Users className="h-4 w-4" />;
            case 'mood':
                return <Music className="h-4 w-4" />;
            default:
                return <Pencil className="h-4 w-4" />;
        }
    };

    const getCategoryColor = (category: string): string => {
        switch (category.toLowerCase()) {
            case 'mindfulness':
                return 'text-blue-500 bg-blue-50 border-blue-100';
            case 'gratitude':
                return 'text-pink-500 bg-pink-50 border-pink-100';
            case 'physical':
                return 'text-green-500 bg-green-50 border-green-100';
            case 'self-care':
                return 'text-purple-500 bg-purple-50 border-purple-100';
            case 'connection':
                return 'text-yellow-500 bg-yellow-50 border-yellow-100';
            case 'mood':
                return 'text-indigo-500 bg-indigo-50 border-indigo-100';
            default:
                return 'text-gray-500 bg-gray-50 border-gray-100';
        }
    };

    const categories = ['all', ...Array.from(new Set(tips.map(tip => tip.category)))];

    const toggleTip = (tipId: string) => {
        setTips(tips.map(tip =>
            tip.id === tipId ? { ...tip, completed: !tip.completed } : tip
        ));
    };

    const filteredTips = tips
        .filter(tip => (activeFilter === 'all' || tip.category === activeFilter))
        .filter(tip => showCompleted || !tip.completed);

    const completedCount = tips.filter(tip => tip.completed).length;
    const totalTips = tips.length;
    const progressPercentage = (completedCount / totalTips) * 100;

    return (
        <div className="bg-white rounded-lg shadow p-6">
            {/* Header with Progress */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Daily Tips</h3>
                    <div className="flex items-center gap-2">
                        <Trophy className={`h-5 w-5 ${completedCount === totalTips ? 'text-yellow-500' : 'text-gray-300'
                            }`} />
                        <span className="text-sm font-medium text-gray-500">
                            {completedCount}/{totalTips}
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full mt-4">
                    <div
                        className="h-full bg-primary-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveFilter(category || 'all')}
                        className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors
              ${activeFilter === category
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        {(category || 'all').charAt(0).toUpperCase() + (category || 'all').slice(1)}
                    </button>
                ))}
            </div>

            {/* Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTips.map((tip) => (
                    <div
                        key={tip.id}
                        className={`relative rounded-lg border transition-all duration-200 ${tip.completed
                                ? 'border-primary-200 bg-primary-50'
                                : 'border-gray-100 bg-white hover:border-gray-200'
                            }`}
                    >
                        <div className="p-4">
                            {/* Category Badge */}
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs mb-3 ${getCategoryColor(tip.category || '')}`}>
                                {getCategoryIcon(tip.category)}
                                {tip.category}
                            </div>

                            {/* Tip Content */}
                            <p className={`text-sm ${tip.completed ? 'text-gray-400' : 'text-gray-700'
                                }`}>
                                {tip.content}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {tip.timeEstimate}
                                </span>

                                <button
                                    onClick={() => toggleTip(tip.id)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tip.completed
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {tip.completed ? (
                                        <>
                                            <Check className="h-3 w-3" />
                                            Completed
                                        </>
                                    ) : (
                                        'Mark Complete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredTips.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Pencil className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-gray-500 font-medium">No tips found</h3>
                    <p className="text-gray-400 text-sm mt-1">
                        {showCompleted
                            ? 'No tips available for this category.'
                            : 'No incomplete tips in this category.'}
                    </p>
                </div>
            )}

            {/* Show/Hide Completed Toggle */}
            <button
                onClick={() => setShowCompleted(!showCompleted)}
                className="mt-6 text-sm text-gray-500 hover:text-primary-500 transition-colors flex items-center gap-2 mx-auto"
            >
                {showCompleted ? 'Hide' : 'Show'} completed tips
                <Check className="h-4 w-4" />
            </button>
        </div>
    );
}