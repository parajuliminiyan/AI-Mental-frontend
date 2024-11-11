import { UserCircle } from 'lucide-react';

interface UserHeaderProps {
    profile: {
        name: string;
        email: string;
        joinedDate: Date;
        avatar?: string;
    };
}

export function UserHeader({ profile }: UserHeaderProps) {
    return (
        <div className="bg-white dark:bg-dark-bg-secondary shadow dark:shadow-dark-md">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-dark-bg-tertiary flex items-center justify-center">
                        {profile.avatar ? (
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <UserCircle className="w-12 h-12 text-primary-500 dark:text-dark-accent-primary" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text-primary">
                            {profile.name}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                            Member since {profile.joinedDate.toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}