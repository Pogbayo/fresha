import { useContext } from "react";
import { ApiContext, ApiContextType } from "./ApiContext";

export const useApiContext = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within an Api provider");
  }
  return context;
};
