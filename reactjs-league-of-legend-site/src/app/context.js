import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState("en_US");

  return (
    <AppContext.Provider value={{ lang, setLang, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
