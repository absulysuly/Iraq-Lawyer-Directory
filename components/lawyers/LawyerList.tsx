
import React, { useState } from 'react';
import { useLawyers } from '../../context/LawyerContext';
import { useTranslations } from '../../hooks/useTranslations';
import LawyerCard from './LawyerCard';
import Pagination from './Pagination';
import { Lawyer } from '../../types';

interface LawyerListProps {
    onSelectLawyer: (lawyer: Lawyer) => void;
}

const ITEMS_PER_PAGE = 9;

const LawyerList: React.FC<LawyerListProps> = ({ onSelectLawyer }) => {
    const { filteredLawyers } = useLawyers();
    const t = useTranslations();
    const [currentPage, setCurrentPage] = useState(1);

    const totalResults = filteredLawyers.length;
    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

    // Reset to page 1 if filters change and current page is out of bounds
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(1);
    }
    const paginatedLawyers = filteredLawyers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (totalResults === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-400">{t.noLawyersFound}</p>
            </div>
        );
    }
    
    return (
        <div>
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
                        totalResults={totalResults}
                        itemsPerPage={ITEMS_PER_PAGE}
                    />
                </div>
            )}
        </div>
    );
};

export default LawyerList;
