
import React from 'react';
import { useTranslations } from '../../hooks/useTranslations';

const Footer: React.FC = () => {
    const t = useTranslations();
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} {t.appName}. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
