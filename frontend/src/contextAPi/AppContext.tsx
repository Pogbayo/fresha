import React, { createContext, useState, ReactNode } from "react";

export interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  isMenuOpen: boolean;
  handleMenuDropDown: () => void;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  handleCalendarDropDown: () => void;
  isTreatmentsOpen: boolean;
  setIsTreatmentsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  handleTreatmentsDropDown: () => void;
  isCurrentLocation: boolean;
  handleCurrentLocationDropDown: () => void;
  setIsCurrentLocation: (value: boolean | ((prev: boolean) => boolean)) => void;
  isTime: boolean;
  handleTimeDropDown: () => void;
  setIsTime: (value: boolean | ((prev: boolean) => boolean)) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("light");
  //header menu drop don staten
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  //calendar state
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  //Treatments and venues state
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState<boolean>(false);
  //Current Location state
  const [isCurrentLocation, setIsCurrentLocation] = useState<boolean>(false);
  //Time state
  const [isTime, setIsTime] = useState<boolean>(false);
  // function
  const handleTimeDropDown = () => {
    setIsTime((prev) => !prev);
  };
  //Current Location function
  const handleCurrentLocationDropDown = () => {
    setIsCurrentLocation((prev) => !prev);
  };
  //Treatments and venues function
  const handleTreatmentsDropDown = () => {
    setIsTreatmentsOpen((prev) => !prev);
  };
  //header menu drop down function
  const handleMenuDropDown = () => {
    setIsMenuOpen((prev) => !prev);
  };
  //toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  //calendar function
  const handleCalendarDropDown = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isMenuOpen,
        handleMenuDropDown,
        isCalendarOpen,
        setIsCalendarOpen,
        handleCalendarDropDown,
        isTreatmentsOpen,
        setIsTreatmentsOpen,
        handleTreatmentsDropDown,
        isCurrentLocation,
        setIsCurrentLocation,
        handleCurrentLocationDropDown,
        isTime,
        setIsTime,
        handleTimeDropDown,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
