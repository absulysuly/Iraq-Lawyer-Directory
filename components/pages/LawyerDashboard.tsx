// Fix: Implement the LawyerDashboard component.
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMessages } from '../../context/MessageContext';
import { useTranslations } from '../../hooks/useTranslations';
import { ClientMessage } from '../../types';

const MessageItem: React.FC<{ message: ClientMessage, onToggleRead: (id: string, isRead: boolean) => void }> = ({ message, onToggleRead }) => {
    const t = useTranslations();
    const formattedDate = new Date(message.timestamp).toLocaleString();
    return (
        <div className={`p-4 border rounded-lg ${message.isRead ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-700 font-semibold'}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className={`${message.isRead ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}><span className="font-normal">{t.from}:</span> {message.clientName}</p>
                    <p className={`${message.isRead ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}><span className="font-normal">{t.subject}:</span> {message.subject}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{formattedDate}</p>
                </div>
                <button 
                    onClick={() => onToggleRead(message.id, message.isRead)}
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                    {message.isRead ? t.markAsUnread : t.markAsRead}
                </button>
            </div>
            <p className={`mt-3 text-sm ${message.isRead ? 'text-gray-700 dark:text-gray-300 font-normal' : 'text-gray-800 dark:text-gray-200'}`}>{message.message}</p>
        </div>
    );
};


const LawyerDashboard: React.FC = () => {
    const t = useTranslations();
    const { user } = useAuth();
    const { messages, markAsRead, markAsUnread } = useMessages();

    const handleToggleRead = (id: string, isRead: boolean) => {
        if (isRead) {
            markAsUnread(id);
        } else {
            markAsRead(id);
        }
    };
    
    const unreadMessages = messages.filter(m => !m.isRead);
    const readMessages = messages.filter(m => m.isRead);

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.lawyerDashboard}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{t.welcome}, {user?.name}!</p>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">{t.inbox} ({unreadMessages.length})</h2>
                {messages.length > 0 ? (
                     <div className="space-y-4">
                        {unreadMessages.map(msg => <MessageItem key={msg.id} message={msg} onToggleRead={handleToggleRead} />)}
                        {readMessages.map(msg => <MessageItem key={msg.id} message={msg} onToggleRead={handleToggleRead} />)}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">{t.noMessages}</p>
                )}
            </div>
        </div>
    );
};

export default LawyerDashboard;
