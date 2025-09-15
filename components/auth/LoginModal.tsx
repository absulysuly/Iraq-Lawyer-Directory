
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslations } from '../../hooks/useTranslations';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const t = useTranslations();

  if (!isOpen) return null;

  const handleLogin = (type: 'client' | 'lawyer') => {
    login(type);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-sm m-4">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{t.login}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">&times;</button>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => handleLogin('client')}
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            {t.loginAsClient}
          </button>
          <button
            onClick={() => handleLogin('lawyer')}
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            {t.loginAsLawyer}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
