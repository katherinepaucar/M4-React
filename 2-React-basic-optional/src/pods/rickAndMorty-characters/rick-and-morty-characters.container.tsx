import React from "react";
import { CharactersComponent } from "./rick-and-morty-characters.component";
import { APIResponse, getCharacterList } from "./api";
import { ResponseFromApiToVm } from "./rick-and-morty-characters.mappers";
import { useDebounce } from "use-debounce";
import { Character, paginationDataRM } from "./rick-and-morty-characters.vm";
import { SearchCharacterContext } from "../../core/provider/rick-and-morty/characters.context";
const defaultPage = 1;
export const CharactersContainer: React.FC = () => {
  const {
    searchForm,
    setSearchForm,
  } = React.useContext(SearchCharacterContext);
  const [debounceSearch] = useDebounce(searchForm, 700);
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [error, setError] = React.useState(null);
  const [paginationData, SetPaginationData] = React.useState<paginationDataRM>();
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
   
  return(
    
        <CharactersComponent
        characters={characters}
        error= {error}
        page = {page}
        setPage = {setPage}
        searchForm={searchForm}
        setSearchForm={setSearchForm}
        paginationData = {paginationData}

        />
  )

};