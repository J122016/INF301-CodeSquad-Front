import { useQuery } from '@apollo/client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GET_ROLES } from './vista-ver-usuarios/graphql';
import { Rol } from './vista-ver-usuarios/Models';

interface AuthContextProps {
  user: string | null;
  rol: string | null;
  login: (username: string, nrol:string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [rol, setRol] = useState<string | null>(null);

  const { data: rolesData } = useQuery(GET_ROLES);

  const login = (username: string, nrol:string) => {
    setUser(username);
    const userRol = rolesData.getRoles.find((el:Rol) => el.nrol === nrol);
    setRol(userRol? userRol.rol : null);
  };

  const logout = () => {
    setUser(null);
    setRol(null);
  };

  return (
    <AuthContext.Provider value={{ user, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
