import React from "react";
import { Pagination, TextField } from "@mui/material";
import { CharacterList } from "./character-list";
import { useDebounce } from "use-debounce";
import {
  APIResponse,
  Character,
  ErrorForms,
  InfoPagination,
  SearchForm,
  createEmptyForm,
  createEmptyFormError,
  formValidation,
} from "./model";

export const CharacterPage: React.FC = () => {
  const pageDefault=1;
  const [searchForm, setSearchForm] = React.useState<SearchForm>(
                                              createEmptyForm()
                                            );
  const [debounceSearch] = useDebounce(searchForm, 700);
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [error, setError] = React.useState(null);
  const [errorValidation, setErrorValidation] = React.useState<ErrorForms>(createEmptyFormError());
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const updateFieldValue =
    (field: keyof SearchForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // console.log(e);
      formValidation.validateField(field, e.target.value)
      .then(validationResult => {
        console.log(validationResult);
        setErrorValidation({
          ...errorValidation,
          [field]: validationResult.message as string,
        })
      })
      setSearchForm({
        [field]: e.target.value,
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
        <form className="form-list" onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            value={searchForm.name}
            onChange={updateFieldValue("name")}
          />
        </form>
        <span className="text-error">{errorValidation.name && errorValidation.name}</span>
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
