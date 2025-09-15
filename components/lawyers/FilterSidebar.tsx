import React, { useContext } from 'react';
import { useLawyers } from '../../context/LawyerContext';
import { useTranslations } from '../../hooks/useTranslations';
import { GOVERNORATES, PRACTICE_AREAS } from '../../constants';
import { LanguageContext } from '../../context/LanguageContext';
import { Governorate, PracticeArea } from '../../types';

const FilterSidebar: React.FC = () => {
    const t = useTranslations();
    const { language } = useContext(LanguageContext);
    const { filters, setFilters, clearFilters } = useLawyers();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, name: e.target.value }));
    };

    const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, minExperience: Number(e.target.value) }));
    };

    const renderMultiSelect = (
        title: string,
        field: 'governorates' | 'practiceAreas',
        options: readonly (Governorate | PracticeArea)[]
    ) => {
        const allIds = options.map(o => o.id);
        const selectedIds = filters[field];
        const allSelected = allIds.length > 0 && selectedIds.length === allIds.length;

        const handleToggleAll = () => {
            setFilters(prev => ({
                ...prev,
                [field]: allSelected ? [] : allIds,
            }));
        };

        const handleToggleItem = (id: string) => {
            setFilters(prev => {
                const currentValues = prev[field];
                const newValues = currentValues.includes(id)
                    ? currentValues.filter(item => item !== id)
                    : [...currentValues, id];
                return { ...prev, [field]: newValues };
            });
        };

        return (
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{title}</label>
                    <button onClick={handleToggleAll} className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400 focus:outline-none">
                        {allSelected ? t.deselectAll : t.selectAll}
                    </button>
                </div>
                <div className="max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-2">
                    {options.map(option => (
                        <div key={option.id} className="flex items-center">
                            <input
                                id={`${field}-${option.id}`}
                                type="checkbox"
                                checked={selectedIds.includes(option.id)}
                                onChange={() => handleToggleItem(option.id)}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`${field}-${option.id}`} className="ms-2 block text-sm text-gray-900 dark:text-gray-200">{option.name[language]}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Name Filter */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.name}</label>
                <input
                    type="text"
                    id="name"
                    value={filters.name}
                    onChange={handleNameChange}
                    placeholder={t.searchByName}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                />
            </div>

            {/* Governorate Filter */}
            {renderMultiSelect(t.governorate, 'governorates', GOVERNORATES)}

            {/* Practice Area Filter */}
            {renderMultiSelect(t.practiceArea, 'practiceAreas', PRACTICE_AREAS)}

            {/* Experience Filter */}
            <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.yearsOfExperience}: {filters.minExperience}+</label>
                <input
                    type="range"
                    id="experience"
                    min="0"
                    max="40"
                    step="1"
                    value={filters.minExperience}
                    onChange={handleExperienceChange}
                    className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
            </div>

            <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
                {t.clearFilters}
            </button>
        </div>
    );
};

export default FilterSidebar;
