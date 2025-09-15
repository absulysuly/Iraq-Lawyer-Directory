import React, { createContext, useState, ReactNode, useContext, useCallback } from 'react';
import { MOCK_CONVERSATIONS } from '../data/mockData';
import { Conversation, Lawyer, User, Message } from '../types';
import { useAuth } from './AuthContext';

interface MessageContextType {
  conversations: Conversation[];
  isLoading: boolean;
  error: string | null;
  fetchConversations: () => Promise<void>;
  markConversationAsRead: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, text: string) => Promise<void>;
  startConversation: (lawyer: Lawyer, subject: string, text: string) => Promise<void>;
  getUnreadCount: () => number;
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

const fakeApiCall = (data?: any, delay = 300) => new Promise(resolve => setTimeout(() => resolve(data), delay));

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchConversations = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      await fakeApiCall();
      const allConversations = MOCK_CONVERSATIONS;
      let userConversations;
      if (user.type === 'lawyer') {
        userConversations = allConversations.filter(c => c.lawyer.id === user.lawyerProfileId);
      } else {
        userConversations = allConversations.filter(c => c.client.id === user.id);
      }
      setConversations(userConversations.sort((a,b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()));
    } catch (e) {
      setError("Failed to fetch conversations");
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  const getUnreadCount = useCallback(() => {
    if (!user) return 0;
    if (user.type === 'lawyer') {
        return conversations.filter(c => !c.isReadByLawyer).length;
    }
    return conversations.filter(c => !c.isReadByClient).length;
  }, [user, conversations]);


  const markConversationAsRead = async (conversationId: string) => {
    if(!user) return;
    const keyToUpdate = user.type === 'lawyer' ? 'isReadByLawyer' : 'isReadByClient';

    setConversations(prev =>
      prev.map(c => (c.id === conversationId ? { ...c, [keyToUpdate]: true } : c))
    );
    await fakeApiCall();
  };
  
  const sendMessage = async (conversationId: string, text: string) => {
    if (!user) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      text,
      timestamp: new Date().toISOString()
    };
    
    setConversations(prev => prev.map(c => {
        if (c.id === conversationId) {
            return {
                ...c,
                messages: [...c.messages, newMessage],
                lastUpdate: newMessage.timestamp,
                isReadByLawyer: user.type === 'lawyer',
                isReadByClient: user.type === 'client',
            };
        }
        return c;
    }));

    await fakeApiCall();
  };
  
  const startConversation = async (lawyer: Lawyer, subject: string, text: string) => {
    if (!user || user.type !== 'client') return;
    
    const newConversation: Conversation = {
        id: `conv-${Date.now()}`,
        lawyer: { id: lawyer.id, name: lawyer.name, avatarUrl: lawyer.avatarUrl },
        client: { id: user.id, name: user.name },
        subject,
        messages: [{
            id: `msg-${Date.now()}`,
            senderId: user.id,
            text,
            timestamp: new Date().toISOString()
        }],
        isReadByClient: true,
        isReadByLawyer: false,
        lastUpdate: new Date().toISOString()
    };

    setConversations(prev => [newConversation, ...prev].sort((a,b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()));
    MOCK_CONVERSATIONS.unshift(newConversation);
    await fakeApiCall();
  };

  return (
    <MessageContext.Provider value={{ conversations, isLoading, error, fetchConversations, markConversationAsRead, sendMessage, startConversation, getUnreadCount }}>
      {children}
    </MessageContext.Provider>
  );
};
