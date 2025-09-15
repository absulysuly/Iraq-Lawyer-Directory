
import React, { createContext, useState, useEffect, ReactNode, useMemo, useContext } from 'react';
import { MOCK_LAWYERS } from '../constants';
import { Lawyer, Filters } from '../types';

interface LawyerContextType {
  allLawyers: Lawyer[];
  filteredLawyers: Lawyer[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  clearFilters: () => void;
}

const LawyerContext = createContext<LawyerContextType>({
  allLawyers: [],
  filteredLawyers: [],
  filters: { name: '', governorates: [], practiceAreas: [], minExperience: 0 },
  setFilters: () => {},
  clearFilters: () => {},
});

export const useLawyers = () => useContext(LawyerContext);

interface LawyerProviderProps {
  children: ReactNode;
}

const INITIAL_FILTERS: Filters = {
  name: '',
  governorates: [],
  practiceAreas: [],
  minExperience: 0,
};

export const LawyerProvider: React.FC<LawyerProviderProps> = ({ children }) => {
  const [allLawyers] = useState<Lawyer[]>(MOCK_LAWYERS);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filteredLawyers = useMemo(() => {
    return allLawyers.filter(lawyer => {
      const nameMatch = lawyer.name.toLowerCase().includes(filters.name.toLowerCase());
      const experienceMatch = lawyer.experience >= filters.minExperience;
      const governorateMatch = filters.governorates.length === 0 || filters.governorates.includes(lawyer.governorate.id);
      const practiceAreaMatch = filters.practiceAreas.length === 0 || filters.practiceAreas.some(pa => lawyer.practiceAreas.map(lpa => lpa.id).includes(pa));
      
      return nameMatch && experienceMatch && governorateMatch && practiceAreaMatch;
    });
  }, [allLawyers, filters]);

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <LawyerContext.Provider value={{ allLawyers, filteredLawyers, filters, setFilters, clearFilters }}>
      {children}
    </LawyerContext.Provider>
  );
};
