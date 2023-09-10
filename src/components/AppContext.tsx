import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AppContextProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  reliefMissions: any[];
  setReliefMissions: React.Dispatch<React.SetStateAction<any[]>>;
  donatableItems: any[];
  setDonatableItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [reliefMissions, setReliefMissions] = useState<any[]>([]);
  const [donatableItems, setDonatableItems] = useState<any[]>([]);

  const toggleDrawer = () => {
    setIsDrawerOpen(prevState => !prevState);
  };

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('appContext') || '{}');
    if (savedState) {
      setIsDrawerOpen(savedState.isDrawerOpen || false);
      setReliefMissions(savedState.reliefMissions || []);
      setDonatableItems(savedState.donatableItems || []);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('appContext', JSON.stringify({ isDrawerOpen, reliefMissions, donatableItems }));
  }, [isDrawerOpen, reliefMissions, donatableItems]);

  return (
    <AppContext.Provider value={{ isDrawerOpen, toggleDrawer, reliefMissions, setReliefMissions, donatableItems, setDonatableItems }}>
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
