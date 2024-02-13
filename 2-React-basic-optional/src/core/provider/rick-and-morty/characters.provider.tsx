import React from "react";
import { SearchCharacterContext } from "./characters.context";
import {
  SearchForm,
  createEmptyForm,
} from "../../../pods/rickAndMorty-characters/form";

export const SearchCharacterProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchForm, setSearchForm] = React.useState<SearchForm>(
    createEmptyForm()
  );

  return (
    <SearchCharacterContext.Provider
      value={{
        searchForm,
        setSearchForm
      }}
    >
      {children}
    </SearchCharacterContext.Provider>
  );
};
