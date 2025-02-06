import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import React from "react";

export interface subServiceType {
  name: string;
  desdcription: string;
  price: number;
  duration: string;
}

export interface serviceType {
  name: string;
  subServices: [subServiceType];
}

export interface teamType {
  name: string;
  role: string;
}

export interface reviewType {
  name: string;
  comment: string;
}

export interface openingTimetype {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}
export interface addressType {
  street: string;
  city: string;
  country: string;
}

export interface shopType {
  name: string;
  address: addressType[];
  categoryId: string;
  services: serviceType[];
  images: string[];
  team: teamType[];
  reviews: reviewType[];
  about: string;
  openingTime: openingTimetype;
}

export interface categoryType {
  name: string;
  shops: shopType[];
}

export interface ApiContextType {
  categoryArray: categoryType[];
  scroll: (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right"
  ) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  reviewsRef: React.RefObject<HTMLDivElement>;
  jointArray: shopType[];
  trendingRef: React.RefObject<HTMLDivElement>;
  recommendedRef: React.RefObject<HTMLDivElement>;
  recentlyRef: React.RefObject<HTMLDivElement>;
  favouritesRef: React.RefObject<HTMLDivElement>;
  appointmentRef: React.RefObject<HTMLDivElement>;
  trendingCombinedArray: shopType[];
  recommendedCombinedArray: shopType[];
  recentlyArray: shopType[];
  favouritesArray: shopType[];
  appointmentArray: shopType[];
  addToRecentlyViewedArray: (shop: shopType) => void;
  addToFavouritesArray: (shop: shopType) => void;
  addToAppointmentArray: (shop: shopType) => void;
  utilityShop: shopType | [];
  viewUtilityShop: (shop: shopType) => void;
}

interface ApiProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const trendingRef = React.useRef<HTMLDivElement | null>(null);
  const recommendedRef = React.useRef<HTMLDivElement | null>(null);
  const reviewsRef = React.useRef<HTMLDivElement | null>(null);
  const recentlyRef = React.useRef<HTMLDivElement | null>(null);
  const favouritesRef = React.useRef<HTMLDivElement | null>(null);
  const appointmentRef = React.useRef<HTMLDivElement | null>(null);

  const [favouritesArray, setFavouritesArry] = useState<shopType[]>([]);
  const [appointmentArray, setAppointmentArray] = useState<shopType[]>([]);
  const [categoryArray, setCategoryArray] = useState<categoryType[]>([]);
  const [jointArray, setJointArray] = useState<shopType[]>([]);
  const [utilityShop, setUtilityShop] = useState<shopType | []>([]);
  const [trendingCombinedArray, setTrendingCombinedArray] = useState<
    shopType[]
  >([]);
  const [recommendedCombinedArray, setRecommendedCombinedArray] = useState<
    shopType[]
  >([]);
  const [recentlyArray, setRecentlyArray] = useState<shopType[]>([]);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategoryArray(response.data.categories);
        console.log(categoryArray);
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewUtilityShop = (shop: shopType) => {
    setUtilityShop(shop);
  };

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right"
  ) => {
    if (
      ref?.current === recommendedRef.current ||
      ref?.current === trendingRef.current ||
      ref?.current === containerRef.current
    ) {
      const scrollAmount = direction === "left" ? -500 : 500;
      ref.current?.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    } else {
      const scrollAmount = direction === "left" ? -1000 : 1000;
      ref.current?.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const addToRecentlyViewedArray = (shop: shopType) => {
    setRecentlyArray((prev) => {
      const existingItem = prev.find((item) => item.name === shop.name);
      if (existingItem) {
        return prev;
      }
      return [...prev, shop];
    });
  };

  const addToFavouritesArray = (shop: shopType) => {
    setFavouritesArry((prev) => {
      const existingItem = prev.find((item) => item.name === shop.name);
      if (existingItem) {
        return prev;
      }
      return [...prev, shop];
    });
  };

  const addToAppointmentArray = (shop: shopType) => {
    setAppointmentArray((prev) => {
      const existingItem = prev.find((item) => item.name === shop.name);
      if (existingItem) {
        return prev;
      }
      return [...prev, shop];
    });
    // localStorage.setItem("localStorageAppointmentArray")
  };

  useEffect(() => {
    const combinedArray = categoryArray.flatMap((category) => {
      const firstArray = category.shops[0];
      const secondArray = category.shops[2];
      return [firstArray, secondArray].filter(Boolean);
    });

    const trendingArray = categoryArray.flatMap((category) => {
      const firstArray = category.shops[1];
      const secondArray = category.shops[2];
      return [secondArray, firstArray].filter(Boolean);
    });

    const recommendedArray = categoryArray.flatMap((category) => {
      const firstArray = category.shops[2];
      const secondArray = category.shops[1];
      return [secondArray, firstArray].filter(Boolean);
    });
    setJointArray(combinedArray);
    setTrendingCombinedArray(trendingArray);
    setRecommendedCombinedArray(recommendedArray);
  }, [categoryArray]);

  return (
    <ApiContext.Provider
      value={{
        categoryArray,
        scroll,
        containerRef,
        jointArray,
        favouritesRef,
        appointmentRef,
        trendingCombinedArray,
        trendingRef,
        recommendedRef,
        reviewsRef,
        recentlyRef,
        recentlyArray,
        favouritesArray,
        appointmentArray,
        recommendedCombinedArray,
        addToRecentlyViewedArray,
        addToFavouritesArray,
        addToAppointmentArray,
        utilityShop,
        viewUtilityShop,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
