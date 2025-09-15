// Fix: Implement the MessageContext and MessageProvider.
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { MOCK_MESSAGES } from '../constants';
import { ClientMessage } from '../types';

interface MessageContextType {
  messages: ClientMessage[];
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  addMessage: (message: Omit<ClientMessage, 'id' | 'timestamp' | 'isRead'>) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ClientMessage[]>(MOCK_MESSAGES);

  const markAsRead = (id: string) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, isRead: true } : msg))
    );
  };
  
  const markAsUnread = (id: string) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, isRead: false } : msg))
    );
  };
  
  const addMessage = (message: Omit<ClientMessage, 'id' | 'timestamp' | 'isRead'>) => {
    const newMessage: ClientMessage = {
        ...message,
        id: `msg${Date.now()}`,
        timestamp: new Date().toISOString(),
        isRead: false,
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  return (
    <MessageContext.Provider value={{ messages, markAsRead, markAsUnread, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
