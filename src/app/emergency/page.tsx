'use client';

import { Phone, Heart, AlertTriangle, ExternalLink } from 'lucide-react';
import { Navigation } from '@/components/ui/navigation';

export default function Emergency() {
    const emergencyContacts = [
        {
            name: "Emergency Services",
            number: "911",
            description: "For immediate emergency assistance",
            priority: "high"
        },
        {
            name: "National Suicide Prevention Lifeline",
            number: "988",
            description: "24/7 support for anyone in suicidal crisis",
            priority: "high"
        },
        {
            name: "Crisis Text Line",
            number: "741741",
            description: "Text HOME to connect with a Crisis Counselor",
            priority: "medium"
        }
    ];

    const mentalHealthResources = [
        {
            name: "SAMHSA&apos;s National Helpline",
            contact: "1-800-662-4357",
            description: "Treatment referral and information service",
            website: "https://www.samhsa.gov/find-help/national-helpline"
        },
        {
            name: "Veterans Crisis Line",
            contact: "988, Press 1",
            description: "Support for Veterans and their loved ones",
            website: "https://www.veteranscrisisline.net/"
        },
        {
            name: "The Trevor Project (LGBTQ+)",
            contact: "1-866-488-7386",
            description: "Support for LGBTQ+ youth",
            website: "https://www.thetrevorproject.org/"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary">
            {/* Emergency Header Banner */}
            <div className="bg-red-500 dark:bg-red-900 text-white">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="h-8 w-8" />
                        <h1 className="text-2xl font-bold">Emergency Support</h1>
                    </div>
                    <p className="text-red-100">
                        If you&apos;re experiencing a medical emergency or immediate crisis,
                        please call emergency services immediately.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
                {/* Emergency Contacts */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Phone className="h-5 w-5 text-red-500" />
                        Emergency Contacts
                    </h2>
                    <div className="grid gap-4">
                        {emergencyContacts.map((contact) => (
                            <div
                                key={contact.name}
                                className={`p-4 rounded-lg border ${contact.priority === 'high'
                                    ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800'
                                    : 'bg-white dark:bg-dark-bg-secondary border-gray-200 dark:border-dark-border-primary'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {contact.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                            {contact.description}
                                        </p>
                                    </div>
                                    <a
                                        href={`tel:${contact.number}`}
                                        className={`px-4 py-2 rounded-lg text-white ${contact.priority === 'high'
                                            ? 'bg-red-500 hover:bg-red-600'
                                            : 'bg-primary-500 hover:bg-primary-600'
                                            } transition-colors`}
                                    >
                                        Call {contact.number}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mental Health Resources */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-primary-500" />
                        Mental Health Resources
                    </h2>
                    <div className="grid gap-4">
                        {mentalHealthResources.map((resource) => (
                            <div
                                key={resource.name}
                                className="p-4 rounded-lg bg-white dark:bg-dark-bg-secondary border 
                                    border-gray-200 dark:border-dark-border-primary"
                            >
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {resource.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {resource.description}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <a
                                        href={`tel:${resource.contact.replace(/\D/g, '')}`}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 
                                            bg-primary-100 dark:bg-primary-900/20 text-primary-600 
                                            dark:text-primary-400 rounded-lg text-sm"
                                    >
                                        <Phone className="h-4 w-4" />
                                        {resource.contact}
                                    </a>
                                    <a
                                        href={resource.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-1.5 
                                            bg-gray-100 dark:bg-dark-bg-tertiary text-gray-600 
                                            dark:text-gray-300 rounded-lg text-sm"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Visit Website
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Disclaimer */}
                <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        This information is provided for emergency situations. If you&apos;re experiencing
                        a medical emergency, immediately call your local emergency services or go to
                        the nearest emergency room.
                    </p>
                </div>
            </main>

            <Navigation />
        </div>
    );
}