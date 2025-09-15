import React, { useContext } from 'react';
import { useLawyers } from '../../context/LawyerContext';
import { useTranslations } from '../../hooks/useTranslations';
import { GOVERNORATES, PRACTICE_AREAS } from '../../constants';
import { LanguageContext } from '../../context/LanguageContext';
import { Filters } from '../../types';

const Chip: React.FC<{ onRemove: () => void; children: React.ReactNode }> = ({ onRemove, children }) => (
    <span className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
        {children}
        <button onClick={onRemove} className="ms-2 text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-100" aria-label="Remove filter">
            &times;
        </button>
    </span>
);

const FilterChips: React.FC = () => {
    const { filters, setFilters, clearFilters } = useLawyers();
    const t = useTranslations();
    const { language } = useContext(LanguageContext);

    const removeFilter = <K extends keyof Filters>(type: K, value?: string) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            if (type === 'governorates' || type === 'practiceAreas') {
                // Fix: The generic key 'type' is not narrowed sufficiently by the `if` condition for safe assignment.
                // By creating a new variable with an explicit, narrowed type, we resolve the issue.
                const arrayField: 'governorates' | 'practiceAreas' = type;
                newFilters[arrayField] = prev[arrayField].filter((item: string) => item !== value);
            } else if (type === 'name') {
                 newFilters.name = '';
            } else if (type === 'minExperience') {
                newFilters.minExperience = 0;
            }
            return newFilters;
        });
    };

    const getGovName = (id: string) => GOVERNORATES.find(g => g.id === id)?.name[language] || id;
    const getPaName = (id: string) => PRACTICE_AREAS.find(p => p.id === id)?.name[language] || id;
    
    const hasActiveFilters = 
        filters.name || 
        filters.minExperience > 0 || 
        filters.governorates.length > 0 || 
        filters.practiceAreas.length > 0;

    if (!hasActiveFilters) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2 items-center">
            {filters.name && (
                <Chip onRemove={() => removeFilter('name')}>
                    {t.name}: {filters.name}
                </Chip>
            )}
            {filters.minExperience > 0 && (
                <Chip onRemove={() => removeFilter('minExperience')}>
                    {t.yearsOfExperience}: {filters.minExperience}+
                </Chip>
            )}
            {filters.governorates.map(id => (
                <Chip key={`gov-${id}`} onRemove={() => removeFilter('governorates', id)}>
                    {getGovName(id)}
                </Chip>
            ))}
            {filters.practiceAreas.map(id => (
                <Chip key={`pa-${id}`} onRemove={() => removeFilter('practiceAreas', id)}>
                    {getPaName(id)}
                </Chip>
            ))}
             {hasActiveFilters && (
                 <button 
                    onClick={clearFilters}
                    className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:underline"
                >
                    {t.clearAll}
                </button>
            )}
        </div>
    );
};

export default FilterChips;