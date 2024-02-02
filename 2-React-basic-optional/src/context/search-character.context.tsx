import React from "react";
import { APIResponse, Character, InfoPagination, SearchForm, createEmptyForm } from "../characters/model";
import { useDebounce } from "use-debounce";
const defaultPage = 1;
interface SearchCharacterContextModel {
  searchForm: SearchForm;
  setSearchForm: (value: SearchForm) => void;
  characters: Character[];
  error: string;
  paginationData: InfoPagination;
  page: number;
  defaultPage: number
  setPage: (value: number) => void;
}
export const SearchCharacterContext = React.createContext<SearchCharacterContextModel>(null);
export const SearchCharacterProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchForm, setSearchForm] = React.useState<SearchForm>(
                                              createEmptyForm()
                                            );
  const [debounceSearch] = useDebounce(searchForm, 700);
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [error, setError] = React.useState(null);
  const [paginationData, SetPaginationData] = React.useState<InfoPagination>();
  const [page, setPage] = React.useState(defaultPage);
  React.useEffect(() => {
    fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${debounceSearch.name}`
    )
      .then(handleError)
      .then((res) => getData(res))
      .catch((err) => {
        console.log(err);
        setError("Ha ocurrido un error");
        setCharacters([]);
      });
  }, [debounceSearch.name, page]);

  const handleError = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      return response.json();
    }
  };
  const getData = (res: APIResponse<Character[]>) => {
   //  console.log(res);
    if(res){
      if (res.results && (res.results as Character[])) {
        const data = res.results as Character[];
        setCharacters(data);
      }
      if (res.info && (res.info as InfoPagination)) {
        const pagination = res.info as InfoPagination;
        SetPaginationData(pagination);
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