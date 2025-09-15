import React, { useState, useRef, useEffect, useContext } from 'react';
import { Conversation } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';
import { useMessages } from '../../contexts/MessageContext';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageContext } from '../../contexts/LanguageContext';

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation | null;
}

const ConversationModal: React.FC<ConversationModalProps> = ({ isOpen, onClose, conversation }) => {
  const t = useTranslations();
  const { sendMessage } = useMessages();
  const { user } = useAuth();
  const { direction } = useContext(LanguageContext);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  if (!isOpen || !conversation) return null;

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setIsSending(true);
    await sendMessage(conversation.id, replyText);
    setReplyText('');
    setIsSending(false);
  };
  
  const otherParticipant = user?.type === 'lawyer' ? conversation.client : conversation.lawyer;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl m-4 flex flex-col h-[80vh]">
        <div className="flex-shrink-0 flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{conversation.subject}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.conversationWith} {otherParticipant.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-3xl">&times;</button>
        </div>
        
        <div className="flex-grow space-y-4 overflow-y-auto p-2">
            {conversation.messages.map(message => {
                const isMyMessage = message.senderId === user?.id;
                return (
                    <div key={message.id} className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
                        <div className={`p-3 rounded-lg max-w-lg ${isMyMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200'}`}>
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendReply} className="flex-shrink-0 mt-4 border-t dark:border-gray-700 pt-4">
            <div className="flex gap-2">
                <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={t.typeYourReply}
                    className="flex-grow border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
                />
                <button
                  type="submit"
                  disabled={isSending || !replyText.trim()}
                  className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {t.reply}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ConversationModal;