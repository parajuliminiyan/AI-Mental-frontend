import { UserCircle } from 'lucide-react';

interface UserProfileProps {
    profile: {
        name: string;
        email: string;
        joinedDate: Date;
        avatar?: string;
    };
}

export function UserHeader({ profile }: UserProfileProps) {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className="bg-white dark:bg-dark-bg-secondary shadow dark:shadow-dark-md">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                        {profile.avatar ? (
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-primary-100 dark:bg-dark-bg-tertiary 
                                flex items-center justify-center">
                                <UserCircle className="w-12 h-12 text-primary-500 dark:text-dark-accent-primary" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
                            {profile.name}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                            {profile.email}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">
                            Member since {formatDate(profile.joinedDate)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}