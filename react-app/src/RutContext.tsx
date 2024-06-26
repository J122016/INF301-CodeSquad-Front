import React, { createContext, useContext, useState } from 'react';

interface RutContextProps {
  rut: string | null;
  setRut: (rut: string | null) => void;
}

const RutContext = createContext<RutContextProps | undefined>(undefined);

export const RutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rut, setRut] = useState<string | null>(null);

  return (
    <RutContext.Provider value={{ rut, setRut }}>
      {children}
    </RutContext.Provider>
  );
};

export const useRut = (): RutContextProps => {
  const context = useContext(RutContext);
  if (!context) {
    throw new Error('useRut debe usarse dentro de un RutProvider');
  }
  return context;
};
