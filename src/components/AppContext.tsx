import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

export const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(prevState => !prevState);
  };

  return (
    <AppContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
}

export default AppProvider;
