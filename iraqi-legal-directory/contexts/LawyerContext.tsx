import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Lawyer, Filters } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { MOCK_LAWYERS } from '../data/mockData';

interface LawyerContextType {
  filteredLawyers: Lawyer[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  clearFilters: () => void;
  isLoading: boolean;
  error: string | null;
}

const LawyerContext = createContext<LawyerContextType>({
  filteredLawyers: [],
  filters: { name: '', governorates: [], practiceAreas: [], minExperience: 0, sortBy: '', sortOrder: 'asc' },
  setFilters: () => {},
  clearFilters: () => {},
  isLoading: true,
  error: null,
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
  sortBy: '',
  sortOrder: 'asc',
};

export const LawyerProvider: React.FC<LawyerProviderProps> = ({ children }) => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedName = useDebounce(filters.name, 300);

  useEffect(() => {
    const fetchLawyers = async () => {
      setIsLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      try {
        let filtered = MOCK_LAWYERS.filter(lawyer => {
            const nameMatch = lawyer.name.toLowerCase().includes(debouncedName.toLowerCase());
            const experienceMatch = lawyer.experience >= filters.minExperience;
            const governorateMatch = filters.governorates.length === 0 || filters.governorates.includes(lawyer.governorate.id);
            const practiceAreaMatch = filters.practiceAreas.length === 0 || filters.practiceAreas.some(pa => lawyer.practiceAreas.map(lpa => lpa.id).includes(pa));
            return nameMatch && experienceMatch && governorateMatch && practiceAreaMatch;
        });

        if (filters.sortBy) {
            filtered.sort((a, b) => {
                let valA: string | number, valB: string | number;
                if (filters.sortBy === 'name') {
                    valA = a.name.toLowerCase();
                    valB = b.name.toLowerCase();
                } else if (filters.sortBy === 'experience') {
                    valA = a.experience;
                    valB = b.experience;
                } else {
                    return 0;
                }
                
                if (valA < valB) {
                    return filters.sortOrder === 'asc' ? -1 : 1;
                }
                if (valA > valB) {
                    return filters.sortOrder === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        
        setLawyers(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLawyers();
  }, [debouncedName, filters.governorates, filters.practiceAreas, filters.minExperience, filters.sortBy, filters.sortOrder]);

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <LawyerContext.Provider value={{ filteredLawyers: lawyers, filters, setFilters, clearFilters, isLoading, error }}>
      {children}
    </LawyerContext.Provider>
  );
};