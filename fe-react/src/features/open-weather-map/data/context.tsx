import { createContext, useContext, useState } from "react";
import type { LocationType } from "./type";

type AppContextType = {
  location: LocationType;
  setLocation: React.Dispatch<React.SetStateAction<LocationType>>;
};
const AppContext = createContext<AppContextType | null>(null);

export const OpenWeatherMapProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [location, setLocation] = useState<LocationType>({
    lat: 10,
    lon: 10,
  });

  return (
    <AppContext.Provider value={{ location, setLocation }}>
      {children}
    </AppContext.Provider>
  );
};

export const useOpenWeatherMapContext = () => {
  const ctx = useContext(AppContext);

  if (!ctx) throw Error(`useOpenWeatherMapContext not working!`);

  return ctx;
};
