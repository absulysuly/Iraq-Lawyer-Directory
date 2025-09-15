
import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { Language } from '../../types';

const FlagIcon: React.FC<{ lang: Language }> = ({ lang }) => {
    const flags: Record<Language, string> = {
        en: "🇺🇸", // USA Flag
        ar: "🇮🇶", // Iraq Flag
        ku: ""    // Handled by custom component below
    };

    if (lang === 'ku') {
        return (
            <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-400 dark:border-gray-500 flex flex-col flex-shrink-0">
                <div className="h-1/3 w-full bg-red-600"></div>
                <div className="h-1/3 w-full bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                </div>
                <div className="h-1/3 w-full bg-green-600"></div>
            </div>
        );
    }

    return <span className="text-xl">{flags[lang]}</span>;
}

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const languages: Language[] = ['en', 'ar', 'ku'];

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full p-1">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`p-1.5 rounded-full transition-colors duration-200 flex items-center justify-center ${
            language === lang 
              ? 'bg-blue-500 shadow' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          aria-label={`Switch to ${lang}`}
        >
          <FlagIcon lang={lang} />
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;