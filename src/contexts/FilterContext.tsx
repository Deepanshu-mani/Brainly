import { createContext, useContext } from "react";

export interface FilterContextType {
  filter: "all" | "twitter" | "youtube" | "website" | "notes";
  setFilter: (
    filter: "all" | "twitter" | "youtube" | "website" | "notes",
  ) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterContext.Provider");
  }
  return context;
}
