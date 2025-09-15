import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Governorate, PracticeArea } from '../types';
import { GOVERNORATES, PRACTICE_AREAS } from '../constants';

interface ReferenceDataContextType {
  governorates: Governorate[];
  practiceAreas: PracticeArea[];
  isLoading: boolean;
  error: string | null;
}

const ReferenceDataContext = createContext<ReferenceDataContextType>({
  governorates: [],
  practiceAreas: [],
  isLoading: true,
  error: null,
});

export const useReferenceData = () => useContext(ReferenceDataContext);

interface ReferenceDataProviderProps {
  children: ReactNode;
}

export const ReferenceDataProvider: React.FC<ReferenceDataProviderProps> = ({ children }) => {
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API delay to mimic a real network request
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Use local mock data
        setGovernorates(GOVERNORATES);
        setPracticeAreas(PRACTICE_AREAS);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ReferenceDataContext.Provider value={{ governorates, practiceAreas, isLoading, error }}>
      {children}
    </ReferenceDataContext.Provider>
  );
};