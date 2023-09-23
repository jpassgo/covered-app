/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface DonationItem {
  title: string;
  quantity: number;
  id: number;
}

interface AppContextProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reliefMissions: any[];
  setReliefMissions: React.Dispatch<React.SetStateAction<any[]>>;
  donatableItems: any[];
  setDonatableItems: React.Dispatch<React.SetStateAction<any[]>>;
  donationItems: DonationItem[];
  setDonationItems: React.Dispatch<React.SetStateAction<DonationItem[]>>;
}

export const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [reliefMissions, setReliefMissions] = useState<any[]>([]);
  const [donatableItems, setDonatableItems] = useState<any[]>([]);
  const [donationItems, setDonationItems] = useState<DonationItem[]>([]); 

  useEffect(() => {
    localStorage.setItem(
      'appContext',
      JSON.stringify({
        isDrawerOpen,
        reliefMissions,
        donatableItems,
        donationItems,
      }),
    ); 
  }, [isDrawerOpen, reliefMissions, donatableItems, donationItems]);

  return (
    <AppContext.Provider
      value={{
        isDrawerOpen,
        setIsDrawerOpen,
        reliefMissions,
        setReliefMissions,
        donatableItems,
        setDonatableItems,
        donationItems,
        setDonationItems,
      }}
    >
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
