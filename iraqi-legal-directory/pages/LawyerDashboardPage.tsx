import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMessages } from '../contexts/MessageContext';
import { useTranslations } from '../hooks/useTranslations';
import { Conversation } from '../types';
import ConversationModal from '../components/messaging/ConversationModal';
import { LanguageContext } from '../contexts/LanguageContext';

const ConversationItem: React.FC<{ conversation: Conversation, onSelect: () => void }> = ({ conversation, onSelect }) => {
    const t = useTranslations();
    const { user } = useAuth();
    const { direction } = useContext(LanguageContext);
    
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const isUnread = user?.type === 'lawyer' && !conversation.isReadByLawyer;
    
    return (
        <div 
            onClick={onSelect}
            className={`p-4 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 ${isUnread ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-800'}`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className={`font-semibold ${isUnread ? 'text-blue-800 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>{conversation.subject}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.from}: {conversation.client.name}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{new Date(conversation.lastUpdate).toLocaleString()}</p>
            </div>
            <p className={`mt-2 text-sm text-gray-700 dark:text-gray-300 truncate ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              {lastMessage.senderId === user?.id ? 'You: ' : ''}{lastMessage.text}
            </p>
        </div>
    );
};


const LawyerDashboardPage: React.FC<{onNavigateToEditProfile: () => void;}> = ({ onNavigateToEditProfile }) => {
    const t = useTranslations();
    const { user } = useAuth();
    const { conversations, isLoading, error, fetchConversations, markConversationAsRead } = useMessages();
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

    useEffect(() => {
        if(user) fetchConversations();
    }, [user, fetchConversations]);

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        if (!conversation.isReadByLawyer) {
            markConversationAsRead(conversation.id);
        }
    };

    const renderContent = () => {
        if (isLoading) return <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t.loading}</p>;
        if (error) return <p className="text-red-500 text-center py-8">{error}</p>;
        if (conversations.length === 0) return <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t.noConversations}</p>;
        
        return (
            <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
                {conversations.map(conv => <ConversationItem key={conv.id} conversation={conv} onSelect={() => handleSelectConversation(conv)} />)}
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.lawyerDashboard}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">{t.welcome}, {user?.name}!</p>
                </div>
                <button
                    onClick={onNavigateToEditProfile}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 self-start sm:self-center"
                >
                    {t.editProfile}
                </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold p-6 border-b dark:border-gray-700">{t.inbox}</h2>
                {renderContent()}
            </div>
            
            <ConversationModal
                isOpen={!!selectedConversation}
                onClose={() => setSelectedConversation(null)}
                conversation={selectedConversation}
            />
        </div>
    );
};

export default LawyerDashboardPage;