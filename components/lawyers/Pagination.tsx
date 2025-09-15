
import React from 'react';
import { useTranslations } from '../../hooks/useTranslations';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalResults: number;
    itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, totalResults, itemsPerPage }) => {
    const t = useTranslations();

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const firstItem = totalResults === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const lastItem = Math.min(currentPage * itemsPerPage, totalResults);
    
    return (
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4" aria-label="Pagination">
            <div className="text-sm text-gray-700 dark:text-gray-400">
                {t.showing} <strong>{firstItem}</strong>-<strong>{lastItem}</strong> {t.of} <strong>{totalResults}</strong> {t.results}
            </div>
            <div className="inline-flex -space-x-px text-sm">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    {t.previous}
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    {t.next}
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
