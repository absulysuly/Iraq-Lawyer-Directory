import React, { useState } from 'react';
import FilterSidebar from '../components/lawyers/FilterSidebar';
import LawyerList from '../components/lawyers/LawyerList';
import HeroBanner from '../components/lawyers/HeroBanner';
import FilterChips from '../components/lawyers/FilterChips';
import { Lawyer } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import MobileFilterOverlay from '../components/ui/MobileFilterOverlay';

interface LawyerListPageProps {
    onSelectLawyer: (lawyer: Lawyer) => void;
}

const LawyerListPage: React.FC<LawyerListPageProps> = ({ onSelectLawyer }) => {
    const t = useTranslations();
    const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

    return (
        <div>
            <HeroBanner />
            <div className="mt-8">
                <FilterChips />
            </div>

            <div className="mt-4 md:hidden">
                 <button 
                    onClick={() => setMobileFilterOpen(true)}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    {t.showFilters}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mt-6">
                <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">{t.filters}</h3>
                        <FilterSidebar />
                    </div>
                </div>
                
                <div className="w-full md:w-3/4 lg:w-4/5">
                    <LawyerList onSelectLawyer={onSelectLawyer} />
                </div>
            </div>
            
            <MobileFilterOverlay 
                isOpen={isMobileFilterOpen} 
                onClose={() => setMobileFilterOpen(false)}
                title={t.filters}
            >
                <FilterSidebar />
            </MobileFilterOverlay>
        </div>
    );
};

export default LawyerListPage;