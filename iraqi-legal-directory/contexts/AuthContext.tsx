import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { User, Lawyer } from '../types';
import { MOCK_LAWYERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  lawyerProfile: Lawyer | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateLawyerProfile: (updatedProfile: Partial<Lawyer>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  lawyerProfile: null,
  token: null,
  isLoading: false,
  login: async () => {},
  logout: () => {},
  updateLawyerProfile: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const LAWYER_USER_DATA = { email: 'ahmed.hassan@iraqlegal.com', password: 'password123', id: 'user-lawyer-1', lawyerProfileId: 'lawyer-1' };
const CLIENT_USER_DATA = { email: 'client@example.com', password: 'password123', id: 'client-1' };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [lawyerProfile, setLawyerProfile] = useState<Lawyer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // This effect could be used to rehydrate auth state from localStorage
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            try {
                if (email.toLowerCase() === LAWYER_USER_DATA.email && password === LAWYER_USER_DATA.password) {
                    const profile = MOCK_LAWYERS.find(l => l.id === LAWYER_USER_DATA.lawyerProfileId);
                    if (!profile) throw new Error("Lawyer profile not found");
                    const mockUser: User = { 
                        id: LAWYER_USER_DATA.id,
                        name: profile.name,
                        email: LAWYER_USER_DATA.email,
                        type: 'lawyer',
                        lawyerProfileId: profile.id,
                    };
                    setUser(mockUser);
                    setLawyerProfile(profile);
                    setToken(`fake-jwt-token-for-lawyer`);
                } else if (email.toLowerCase() === CLIENT_USER_DATA.email && password === CLIENT_USER_DATA.password) {
                     const mockUser: User = { 
                        id: CLIENT_USER_DATA.id,
                        name: 'Client User',
                        email: CLIENT_USER_DATA.email,
                        type: 'client' 
                    };
                    setUser(mockUser);
                    setLawyerProfile(null);
                    setToken(`fake-jwt-token-for-client`);
                } else {
                    throw new Error("Invalid credentials");
                }
                resolve();
            } catch (error) {
                reject(error);
            } finally {
                 setIsLoading(false);
            }
        }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setLawyerProfile(null);
  };
  
  const updateLawyerProfile = (updatedProfileData: Partial<Lawyer>) => {
    setLawyerProfile(prev => prev ? { ...prev, ...updatedProfileData } : null);
  };

  return (
    <AuthContext.Provider value={{ user, lawyerProfile, token, isLoading, login, logout, updateLawyerProfile }}>
      {children}
    </AuthContext.Provider>
  );
};