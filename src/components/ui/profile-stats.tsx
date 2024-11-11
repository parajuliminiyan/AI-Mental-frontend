interface UserStatsProps {
    stats: {
        checkIns: number;
        streakDays: number;
        journalEntries: number;
        resourcesAccessed: number;
    };
}

export function UserStats({ stats }: UserStatsProps) {
    const statsConfig = [
        { label: 'Check-ins', value: stats.checkIns, unit: 'days' },
        { label: 'Current Streak', value: stats.streakDays, unit: 'days' },
        { label: 'Journal Entries', value: stats.journalEntries, unit: 'total' },
        { label: 'Resources Used', value: stats.resourcesAccessed, unit: 'items' }
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statsConfig.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">{stat.label}</div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
                        <span className="text-sm text-gray-500">{stat.unit}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}