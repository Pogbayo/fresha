import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import React from "react";

export interface subServiceType {
  name: string;
  desdcription: string;
  price: number;
  duration: string;
  handleContinue: () => void;
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
  openingTimes: openingTimetype;
}

export interface categoryType {
  name: string;
  shops: shopType[];
}

export interface ApiContextType {
  categoryArray: categoryType[];
  showAppointment: boolean;
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
  setShowAppointment: (value: boolean) => void;
  addToRecentlyViewedArray: (shop: shopType) => void;
  addToFavouritesArray: (shop: shopType) => void;
  addToAppointmentArray: (shop: shopType) => void;
  utilityShop: shopType | [];
  subServiceArray: subServiceType[];
  viewUtilityShop: (shop: shopType) => void;
  handleContinue: () => void;
  formattedTotalPrice: string;
  addSubService: (subService: subServiceType) => void;
  setsubServiceArray: (subservice: subServiceType[]) => void;
  displayUtilShop: (shop: shopType) => void;
  utilShop: shopType | null;
  setFormattedTotalPrice: (value: string) => void;
  activeComponent: "deets" | "fav" | "appointment" | "deleteaccount" | null;
  setActiveComponent: React.Dispatch<
    React.SetStateAction<
      "deets" | "fav" | "appointment" | "deleteaccount" | null
    >
  >;
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

  const [categoryArray, setCategoryArray] = useState<categoryType[]>([]);
  const [jointArray, setJointArray] = useState<shopType[]>([]);
  const [utilityShop, setUtilityShop] = useState<shopType | []>([]);
  const [trendingCombinedArray, setTrendingCombinedArray] = useState<
    shopType[]
  >([]);
  const [recommendedCombinedArray, setRecommendedCombinedArray] = useState<
    shopType[]
  >([]);
  const [subServiceArray, setsubServiceArray] = useState<subServiceType[] | []>(
    []
  );
  const addToRecentlyViewedArray = (shop: shopType) => {
    setRecentlyArray((prev) => {
      if (!Array.isArray(prev)) prev = []; // Ensure prev is always an array
      const existingItem = prev.find((item) => item.name === shop.name);
      if (existingItem) return prev;

      const updatedArray = [...prev, shop];
      localStorage.setItem("recentlyArray", JSON.stringify(updatedArray));
      return updatedArray;
    });
  };

  const [recentlyArray, setRecentlyArray] = useState<shopType[]>(() => {
    const savedData = localStorage.getItem("recentlyArray");
    return savedData ? (JSON.parse(savedData) as shopType[]) : [];
  });

  const [utilShop, setUtilShop] = useState<shopType | null>(() => {
    try {
      const storedShop = localStorage.getItem("utilShop");
      return storedShop ? JSON.parse(storedShop) : null;
    } catch {
      return null;
    }
  });

  const displayUtilShop = (shop: shopType) => {
    setUtilShop(shop);
    localStorage.setItem("utilShop", JSON.stringify(shop));
  };

  const addPurpleBorder = (subService: subServiceType) => {
    const existingItem = subServiceArray.find(
      (item) => item.name === subService.name
    );

    const element = document.querySelector(".subService") as HTMLElement;

    if (element) {
      element.style.border = existingItem
        ? "2px solid grey"
        : "2px solid purple";
    }
  };

  const addSubService = (subService: subServiceType) => {
    setsubServiceArray((prevArray) => {
      const existingItem = prevArray.find(
        (item) => item.name === subService.name
      );
      if (!existingItem) {
        return [...prevArray, subService];
      }
      return [...prevArray.filter((item) => item.name !== subService.name)];
    });
    addPurpleBorder(subService);
  };

  const [formattedTotalPrice, setFormattedTotalPrice] =
    useState<string>("free");

  useEffect(() => {
    const totalPrice = subServiceArray.reduce(
      (sum, subService) => sum + subService.price,
      0
    );
    const price = totalPrice.toLocaleString("en-US");
    setFormattedTotalPrice(price);
  }, [subServiceArray]);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(
          "https://fresha-1.onrender.com/api/categories"
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
  const [favouritesArray, setFavouritesArray] = useState<shopType[]>(() => {
    const savedData = localStorage.getItem("favouritesArray");
    return savedData ? JSON.parse(savedData) : [];
  });

  const addToFavouritesArray = (shop: shopType) => {
    setFavouritesArray((prev) => {
      const updatedArray = Array.isArray(prev) ? [...prev] : [];
      const existingItemIndex = updatedArray.findIndex(
        (item) => item.name === shop.name
      );

      let newFavourites;

      if (existingItemIndex > -1) {
        newFavourites = updatedArray.filter((item) => item.name !== shop.name);
      } else {
        newFavourites = [...updatedArray, shop];
      }

      localStorage.setItem("favouritesArray", JSON.stringify(newFavourites));
      return newFavourites;
    });
  };

  const [appointmentArray, setAppointmentArray] = useState<shopType[]>(() => {
    const savedData = localStorage.getItem("appointmentArray");
    return savedData ? JSON.parse(savedData) : [];
  });

  const addToAppointmentArray = (shop: shopType) => {
    setAppointmentArray((prev) => {
      if (!Array.isArray(prev)) prev = [];
      const existingItem = prev.find((item) => item.name === shop.name);
      if (existingItem) return prev;

      const updatedArray = [...prev, shop];
      localStorage.setItem("appointmentArray", JSON.stringify(updatedArray));
      return updatedArray;
      // console.log(updatedArray);
    });
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

  const [showAppointment, setShowAppointment] = useState(false);

  const handleContinue = () => {
    setShowAppointment(true);
  };
  const [activeComponent, setActiveComponent] = useState<
    "deets" | "fav" | "appointment" | "deleteaccount" | null
  >(null);
  useEffect(() => {
    setActiveComponent("deets");
  }, []);

  return (
    <ApiContext.Provider
      value={{
        activeComponent,
        setActiveComponent,
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
        handleContinue,
        showAppointment,
        setShowAppointment,
        subServiceArray,
        formattedTotalPrice,
        addSubService,
        setsubServiceArray,
        displayUtilShop,
        utilShop,
        setFormattedTotalPrice,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
