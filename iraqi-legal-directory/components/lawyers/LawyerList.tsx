import React, { useState } from 'react';
import { useLawyers } from '../../contexts/LawyerContext';
import { useTranslations } from '../../hooks/useTranslations';
import LawyerCard from './LawyerCard';
import Pagination from './Pagination';
import { Lawyer } from '../../types';

interface LawyerListProps {
    onSelectLawyer: (lawyer: Lawyer) => void;
}

const ITEMS_PER_PAGE = 9;

const LawyerList: React.FC<LawyerListProps> = ({ onSelectLawyer }) => {
    const { filteredLawyers, isLoading, error, filters, setFilters } = useLawyers();
    const t = useTranslations();
    const [currentPage, setCurrentPage] = useState(1);

    const totalResults = filteredLawyers.length;
    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(1);
    }
    const paginatedLawyers = filteredLawyers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value) {
            const [sortBy, sortOrder] = value.split('-');
            setFilters(prev => ({ ...prev, sortBy, sortOrder: sortOrder as 'asc' | 'desc' }));
        } else {
            setFilters(prev => ({ ...prev, sortBy: '', sortOrder: 'asc' }));
        }
    };

    const firstItem = totalResults === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const lastItem = Math.min(currentPage * ITEMS_PER_PAGE, totalResults);

    if (isLoading) {
        return <div className="text-center py-12">{t.loading}</div>
    }

    if (error) {
        return <div className="text-center py-12 text-red-500">{t.errorOccurred}</div>
    }

    if (totalResults === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-400">{t.noLawyersFound}</p>
            </div>
        );
    }
    
    return (
        <div>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-sm text-gray-700 dark:text-gray-400">
                    {t.showing} <strong>{firstItem}</strong>-<strong>{lastItem}</strong> {t.of} <strong>{totalResults}</strong> {t.results}
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.sortBy}:</label>
                    <select
                        id="sort"
                        value={filters.sortBy ? `${filters.sortBy}-${filters.sortOrder}` : ''}
                        onChange={handleSortChange}
                        className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option value="">{t.sortRelevance}</option>
                        <option value="name-asc">{t.sortNameAsc}</option>
                        <option value="name-desc">{t.sortNameDesc}</option>
                        <option value="experience-desc">{t.sortExpDesc}</option>
                        <option value="experience-asc">{t.sortExpAsc}</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedLawyers.map(lawyer => (
                    <LawyerCard key={lawyer.id} lawyer={lawyer} onSelect={onSelectLawyer} />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default LawyerList;