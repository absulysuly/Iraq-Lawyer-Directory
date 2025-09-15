
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const useTranslations = () => {
  const { language } = useContext(LanguageContext);
  return translations[language];
};
