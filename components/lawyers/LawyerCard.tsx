import React, { useContext } from 'react';
import { Lawyer } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';
import { LanguageContext } from '../../context/LanguageContext';

interface LawyerCardProps {
    lawyer: Lawyer;
    onSelect: (lawyer: Lawyer) => void;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onSelect }) => {
    const t = useTranslations();
    const { language } = useContext(LanguageContext);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 border border-gray-200 dark:border-gray-700">
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <img className="h-20 w-20 rounded-full object-cover" src={lawyer.avatarUrl} alt={lawyer.name} />
                    <div className="ms-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{lawyer.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{lawyer.governorate.name[language]}</p>
                    </div>
                </div>
                <div>
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">{t.yearsOfExperience}:</span> {lawyer.experience} {t.years}</p>
                    <div className="mt-2">
                         <h4 className="font-semibold text-gray-700 dark:text-gray-300">{t.practiceArea}:</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {lawyer.practiceAreas.slice(0, 2).map(pa => (
                                <span key={pa.id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    {pa.name[language]}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => onSelect(lawyer)}
                    className="mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                    {t.viewProfile}
                </button>
            </div>
        </div>
    );
};

export default LawyerCard;