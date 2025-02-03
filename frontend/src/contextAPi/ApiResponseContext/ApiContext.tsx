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
  subService: [subServiceType];
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

export interface shopType {
  name: string;
  address: string;
  categoryId: string;
  services: serviceType[];
  images: string[];
  team: teamType[];
  reviews: reviewType[];
  about: string;
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
  trendingCombinedArray: shopType[];
  recommendedCombinedArray: shopType[];
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
  const [categoryArray, setCategoryArray] = useState<categoryType[]>([]);
  const [jointArray, setJointArray] = useState<shopType[]>([]);
  const [trendingCombinedArray, setTrendingCombinedArray] = useState<
    shopType[]
  >([]);
  const [recommendedCombinedArray, setRecommendedCombinedArray] = useState<
    shopType[]
  >([]);

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

  useEffect(() => {
    const combinedArray = categoryArray.flatMap((category) => {
      const firstArray = category.shops[0];
      const secondArray = category.shops[2];
      return [firstArray, secondArray].filter(Boolean);
    });

    const trendingArray = categoryArray.flatMap((category) => {
      const firstArray = category.shops[1];
      const secondArray = category.shops[3];
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
        trendingCombinedArray,
        trendingRef,
        recommendedRef,
        reviewsRef,
        recommendedCombinedArray,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
