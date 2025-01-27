import React, { createContext, useState, ReactNode } from "react";

export interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  isMenuOpen: boolean;
  handleMenuDropDown: () => void;
}

interface AppProviderProps {
  children: ReactNode;
}
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("light");
  //header menu drop down
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleMenuDropDown = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{ theme, toggleTheme, isMenuOpen, handleMenuDropDown }}
    >
      {children}
    </AppContext.Provider>
  );
};
