import React from "react";
import { SearchForm } from "../../../pods/rickAndMorty-characters/form";

interface SearchCharacterContextModel {
  searchForm: SearchForm;
  setSearchForm: (value: SearchForm) => void;
}
export const SearchCharacterContext = React.createContext<SearchCharacterContextModel>(null);
