import React, { useState, useEffect } from 'react';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslations } from '../../hooks/useTranslations';
import LoginModal from '../auth/LoginModal';
import { useMessages } from '../../contexts/MessageContext';

interface HeaderProps {
    onNavigateToDashboard: () => void;
    onNavigateHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToDashboard, onNavigateHome }) => {
    const t = useTranslations();
    const { user, logout } = useAuth();
    const { getUnreadCount } = useMessages();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const unreadCount = getUnreadCount();

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h1 
                    className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
                    onClick={onNavigateHome}
                >
                    {t.appName}
                </h1>
                <nav className="flex items-center gap-4">
                    <LanguageSwitcher />
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t.welcome}, {user.name}
                            </span>
                            <button onClick={onNavigateToDashboard} className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                                {t.dashboard}
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={logout}
                                className="px-3 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                            >
                                {t.logout}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setLoginModalOpen(true)}
                            className="px-3 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {t.login}
                        </button>
                    )}
                </nav>
            </div>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </header>
    );
};

export default Header;