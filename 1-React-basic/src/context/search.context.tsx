import React from "react";

interface SearchContextModel {
  searchValue: string;
  setNewValue(newValue: string): void;
}
export const SearchContext = React.createContext<SearchContextModel>(null);
export const SearchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = React.useState("lemoncode");
  const setNewValue = (newValue: string) => {
    setSearchValue(newValue);
    console.log("Search new Value", newValue);
  };
  return (
    <SearchContext.Provider value={{ searchValue, setNewValue }}>
      {children}
    </SearchContext.Provider>
  );
};
