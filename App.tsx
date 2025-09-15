// Fix: Implement the main App component and its content.
import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LawyerProvider } from './context/LawyerContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LawyerSearch from './components/pages/LawyerSearch';
import LawyerProfile from './components/pages/LawyerProfile';
import { Lawyer } from './types';
import LawyerDashboard from './components/pages/LawyerDashboard';
import { MessageProvider } from './context/MessageContext';

type View = 'search' | 'profile' | 'dashboard';

const AppContent: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('search');
    const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
    const { user } = useAuth();

    const handleSelectLawyer = (lawyer: Lawyer) => {
        setSelectedLawyer(lawyer);
        setCurrentView('profile');
    };

    const handleBackToSearch = () => {
        setSelectedLawyer(null);
        setCurrentView('search');
    };
    
    const handleNavigateToDashboard = () => {
        if (user?.type === 'lawyer') {
            setCurrentView('dashboard');
        }
    };
    
    const handleNavigateHome = () => {
        setSelectedLawyer(null);
        setCurrentView('search');
    };

    const renderContent = () => {
        if (currentView === 'profile' && selectedLawyer) {
            return <LawyerProfile lawyer={selectedLawyer} onBack={handleBackToSearch} />;
        }
        if (currentView === 'dashboard' && user?.type === 'lawyer') {
            return <LawyerDashboard />;
        }
        return <LawyerSearch onSelectLawyer={handleSelectLawyer} />;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
            <Header onNavigateToDashboard={handleNavigateToDashboard} onNavigateHome={handleNavigateHome} />
            <main className="flex-grow container mx-auto px-4 py-8">
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <AuthProvider>
                <LawyerProvider>
                    <MessageProvider>
                        <AppContent />
                    </MessageProvider>
                </LawyerProvider>
            </AuthProvider>
        </LanguageProvider>
    );
};

export default App;
