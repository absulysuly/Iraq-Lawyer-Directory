
import React, { createContext, useState, ReactNode, useContext } from 'react';

type User = {
  type: 'client' | 'lawyer';
  name: string;
};

interface AuthContextType {
  user: User | null;
  login: (type: 'client' | 'lawyer') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (type: 'client' | 'lawyer') => {
    const name = type === 'lawyer' ? 'Lawyer User' : 'Client User';
    setUser({ type, name });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
