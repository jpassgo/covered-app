/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import volcano from '../assets/volcano.jpeg';
import town from '../assets/town.jpeg';
import trees from '../assets/trees.jpeg';

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
  const defaultReliefMissions = [
    {
      title: 'Volcano Relief',
      description:
        'Help the people of St. Vincent and the Grenadines recover from the La Soufrière volcanic eruption.',
      image: volcano,
      neededItems: ['Water', 'Food', 'Shovel'],
      id: 1,
    },
    {
      title: 'Tornado Relief',
      description:
        'Help the people of Nashville, Tennessee recover from the March 2020 tornado.',
      image: town,
      neededItems: ['Water', 'Food', 'Tent'],
      id: 2,
    },
    {
      title: 'Wildfire Relief',
      description:
        'Help the people of California recover from the 2020 wildfires.',
      image: trees,
      neededItems: ['Water', 'Food', 'Clothing', 'Tent', 'Shovel', 'Gloves'],
      id: 3,
    },
  ];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [reliefMissions, setReliefMissions] = useState<any[]>(
    defaultReliefMissions,
  );
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
