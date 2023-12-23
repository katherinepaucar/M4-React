import React from "react";
import { Pagination, TextField } from "@mui/material";
import { CharacterList } from "./character-list";
import { useDebounce } from "use-debounce";
import {
  APIResponse,
  Character,
  InfoPagination,
  SearchName,
  createEmptyForm,
} from "./model";

export const CharacterPage: React.FC = () => {
  const pageDefault=1;
  const [searchForm, setSearchForm] = React.useState<SearchName>(
                                              createEmptyForm()
                                            );
  const [debounceSearch] = useDebounce(searchForm, 700);
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [error, setError] = React.useState(null);
  const [paginationData, SetPaginationData] = React.useState<InfoPagination>();
  const [page, setPage] = React.useState(pageDefault);
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

  const updateFieldValue =
    (name: keyof SearchName) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // console.log(e);
      setSearchForm({
        [name]: e.target.value,
      });
      setPage(pageDefault);
      // console.log('updateFieldValue e')
    };
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };
  

  return (
    <>
      <div className="container">
        <h2>RICK & MORTY LIST </h2>
        <form className="form-list">
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            value={searchForm.name}
            required
            onChange={updateFieldValue("name")}
          />
        </form>
        <CharacterList characters={characters}></CharacterList>
        {error && <p className="text-error">{error}</p>}
        {characters && characters.length > 0 &&
         <Pagination
          count={paginationData?.pages}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
        />}
      </div>
    </>
  );
};
