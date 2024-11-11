import {
    UserCircle,
    Bell,
    Shield,
    Clock,
    ChartArea as Chart,
    Calendar,
    HelpCircle,
    Heart,
    ChevronRight
} from 'lucide-react';

export function SettingsMenu() {
    const menuItems = [
        {
            title: 'Account Settings',
            items: [
                { icon: UserCircle, label: 'Personal Information', path: '/settings/personal' },
                { icon: Bell, label: 'Notifications', path: '/settings/notifications' },
                { icon: Shield, label: 'Privacy & Security', path: '/settings/privacy' },
            ]
        },
        {
            title: 'Preferences',
            items: [
                { icon: Clock, label: 'Reminder Settings', path: '/settings/reminders' },
                { icon: Chart, label: 'Progress Tracking', path: '/settings/progress' },
                { icon: Calendar, label: 'Schedule Settings', path: '/settings/schedule' },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: HelpCircle, label: 'Help Center', path: '/help' },
                { icon: Heart, label: 'Crisis Resources', path: '/crisis' },
            ]
        }
    ];

    return (
        <>
            {menuItems.map((section, index) => (
                <div key={section.title} className={`${index > 0 ? 'mt-8' : ''}`}>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h2>
                    <div className="bg-white rounded-lg shadow divide-y">
                        {section.items.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => {/* Handle navigation */ }}
                                className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm text-gray-700">{item.label}</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}