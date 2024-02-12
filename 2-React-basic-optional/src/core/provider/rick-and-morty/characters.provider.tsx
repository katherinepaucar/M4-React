import React from "react";
import { useDebounce } from "use-debounce";
import { SearchForm, createEmptyForm } from "../../../pods/rickAndMorty-characters/form";
import { Character, paginationData } from "../../../pods/rickAndMorty-characters/rick-and-morty-characters.vm";
import { APIResponse, getCharacterList } from "../../../pods/rickAndMorty-characters/api";
import { ResponseFromApiToVm } from "../../../pods/rickAndMorty-characters/rick-and-morty-characters.mappers";
import { SearchCharacterContext } from "./characters.context";



const defaultPage = 1;

export const SearchCharacterProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchForm, setSearchForm] = React.useState<SearchForm>(
                                              createEmptyForm()
                                            );
  const [debounceSearch] = useDebounce(searchForm, 700);
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [error, setError] = React.useState(null);
  const [paginationData, SetPaginationData] = React.useState<paginationData>();
  const [page, setPage] = React.useState(defaultPage);
  React.useEffect(() => {
    getCharacterList(page, debounceSearch.name)
      .then(handleError)
      .then((res) => getData(res))
      .catch((err) => {
        console.log(err);
        setError("Ha ocurrido un error");
        setCharacters([]);
      });
  }, [debounceSearch.name, page]);

  const handleError = (response: Response) => {
   //  console.log('response', response)
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      return response.json();
    }
  };
  const getData = (res: APIResponse) => {
     console.log(res);
    if(res){
      const response = ResponseFromApiToVm(res)
      if (response.results) {
        setCharacters(response.results);
      }
      if (response.info) {
        SetPaginationData(response.info);
      }
      if (error) {
        setError(null);
      }
    }

  };
   

  return (
    <SearchCharacterContext.Provider
      value={{
        searchForm,
        setSearchForm,
        characters,
        error,
        paginationData,
        page,
        setPage,
        defaultPage
              }}
    >
      {children}
    </SearchCharacterContext.Provider>
  );
};
