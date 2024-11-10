'use client';

import { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, ExternalLink, Clock, BookMarked } from 'lucide-react';
import { Resource } from '@/types';
import { mockResources } from '@/lib/mock-data';

export function ResourceCenter() {
    const [resources] = useState<Resource[]>(mockResources);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];
    const filteredResources = activeCategory === 'all'
        ? resources
        : resources.filter(r => r.category === activeCategory);

    const getCategoryIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'articles':
                return <BookOpen className="h-5 w-5" />;
            case 'exercises':
                return <Clock className="h-5 w-5" />;
            case 'guides':
                return <BookMarked className="h-5 w-5" />;
            default:
                return <ExternalLink className="h-5 w-5" />;
        }
    };

    const getCategoryColor = (category: string): string => {
        switch (category.toLowerCase()) {
            case 'articles':
                return 'text-blue-500';
            case 'exercises':
                return 'text-green-500';
            case 'guides':
                return 'text-purple-500';
            case 'tools':
                return 'text-orange-500';
            case 'emergency':
                return 'text-red-500';
            case 'workshops':
                return 'text-indigo-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-20">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Resource Center</h3>
                <span className="text-sm text-gray-500">{filteredResources.length} resources</span>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === category
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {/* Resources Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResources.map((resource) => (
                    <button
                        key={resource.id}
                        onClick={() => window.open(resource.link, '_blank')}
                        className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 text-left transition-all group hover:shadow-md"
                    >
                        <div className="flex items-start justify-between">
                            <span className={getCategoryColor(resource.category)}>
                                {getCategoryIcon(resource.category)}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                {resource.category}
                                <ArrowRight className="h-4 w-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        <h4 className="font-medium text-gray-900 mt-2">{resource.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {resource.description}
                        </p>
                    </button>
                ))}
            </div>

            {filteredResources.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No resources found for this category.
                </div>
            )}
        </div>
    );
}