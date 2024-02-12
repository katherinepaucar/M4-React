import React from "react";
import { SearchForm } from "../../../pods/rickAndMorty-characters/form";
import { Character, paginationData } from "../../../pods/rickAndMorty-characters/rick-and-morty-characters.vm";




const defaultPage = 1;
interface SearchCharacterContextModel {
  searchForm: SearchForm;
  setSearchForm: (value: SearchForm) => void;
  characters: Character[];
  error: string;
  paginationData: paginationData;
  page: number;
  defaultPage: number
  setPage: (value: number) => void;
}
export const SearchCharacterContext = React.createContext<SearchCharacterContextModel>(null);
