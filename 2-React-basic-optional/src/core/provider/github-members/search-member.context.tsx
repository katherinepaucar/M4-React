import React from "react";

interface SearchContextModel {
  searchValue: string;
  setSearchValue: (newValue: string) => void;
}
export const SearchMemberContext = React.createContext<SearchContextModel>(null);