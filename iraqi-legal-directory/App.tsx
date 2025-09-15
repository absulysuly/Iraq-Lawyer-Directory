import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LawyerProvider } from './contexts/LawyerContext';
import { MessageProvider } from './contexts/MessageContext';
import { ReferenceDataProvider } from './contexts/ReferenceDataContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LawyerListPage from './pages/LawyerListPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import LawyerDashboardPage from './pages/LawyerDashboardPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import EditProfilePage from './pages/EditProfilePage';

import { Lawyer } from './types';

type View = 'search' | 'profile' | 'lawyer-dashboard' | 'client-dashboard' | 'edit-profile';

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
            setCurrentView('lawyer-dashboard');
        } else if (user?.type === 'client') {
            setCurrentView('client-dashboard');
        }
    };
    
    const handleNavigateHome = () => {
        setSelectedLawyer(null);
        setCurrentView('search');
    };

    const handleNavigateToEditProfile = () => {
        if (user?.type === 'lawyer') {
            setCurrentView('edit-profile');
        }
    }

    const renderContent = () => {
        switch (currentView) {
            case 'profile':
                return selectedLawyer ? <LawyerProfilePage lawyer={selectedLawyer} onBack={handleBackToSearch} /> : <LawyerListPage onSelectLawyer={handleSelectLawyer} />;
            case 'lawyer-dashboard':
                return user?.type === 'lawyer' ? <LawyerDashboardPage onNavigateToEditProfile={handleNavigateToEditProfile}/> : <LawyerListPage onSelectLawyer={handleSelectLawyer} />;
            case 'client-dashboard':
                 return user?.type === 'client' ? <ClientDashboardPage /> : <LawyerListPage onSelectLawyer={handleSelectLawyer} />;
            case 'edit-profile':
                return user?.type === 'lawyer' ? <EditProfilePage onBackToDashboard={handleNavigateToDashboard} /> : <LawyerListPage onSelectLawyer={handleSelectLawyer} />;
            case 'search':
            default:
                return <LawyerListPage onSelectLawyer={handleSelectLawyer} />;
        }
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
                <ReferenceDataProvider>
                    <LawyerProvider>
                        <MessageProvider>
                            <AppContent />
                        </MessageProvider>
                    </LawyerProvider>
                </ReferenceDataProvider>
            </AuthProvider>
        </LanguageProvider>
    );
};

export default App;