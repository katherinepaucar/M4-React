import React from "react";
import { CharactersComponent } from "./rick-and-morty-characters.component";
import { APIResponse, getCharacterList } from "./api";
import { ResponseFromApiToVm } from "./rick-and-morty-characters.mappers";
import { useDebounce } from "use-debounce";
import { Character, paginationDataRM } from "./rick-and-morty-characters.vm";
import { SearchCharacterContext } from "../../core/provider/rick-and-morty/characters.context";
const defaultPage = 1;
export const CharactersContainer: React.FC = () => {
  const { searchForm, setSearchForm } = React.useContext(
    SearchCharacterContext
  );
  const [debounceSearch] = useDebounce(searchForm, 700);
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [error, setError] = React.useState(null);
  const [paginationData, setPaginationData] =
    React.useState<paginationDataRM>(null);
  const [page, setPage] = React.useState(defaultPage);
  const onLoadCharacterList = () => {
    getCharacterList(page, debounceSearch.name)
      .then((res) => {
        const response = ResponseFromApiToVm(res);
        setCharacters(response.results);
        setPaginationData(response.info);
        setError(null);
      })
      .catch((err) => {
        setError(`Ha ocurrido un error ${err}`);
        setCharacters([]);
        setPaginationData(null);
      });
  };

  React.useEffect(() => {
    onLoadCharacterList();
  }, [debounceSearch.name, page]);

  return (
    <CharactersComponent
      characters={characters}
      error={error}
      page={page}
      setPage={setPage}
      searchForm={searchForm}
      setSearchForm={setSearchForm}
      paginationData={paginationData}
    />
  );
};
