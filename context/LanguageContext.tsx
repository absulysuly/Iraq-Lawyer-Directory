
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Language, Direction } from '../types';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  direction: 'ltr',
  setLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [direction, setDirection] = useState<Direction>('ltr');

  useEffect(() => {
    const newDirection = (language === 'ar' || language === 'ku') ? 'rtl' : 'ltr';
    setDirection(newDirection);
    document.documentElement.lang = language;
    document.documentElement.dir = newDirection;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
