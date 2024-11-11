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
                <div
                    key={stat.label}
                    className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow dark:shadow-dark-md p-4 transition-all hover:shadow-lg dark:hover:shadow-dark-lg"
                >
                    <div className="text-sm text-gray-500 dark:text-dark-text-secondary">
                        {stat.label}
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-semibold text-gray-900 dark:text-dark-text-primary">
                            {stat.value}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-dark-text-secondary">
                            {stat.unit}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}