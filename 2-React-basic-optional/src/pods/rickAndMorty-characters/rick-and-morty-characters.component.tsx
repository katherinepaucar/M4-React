import React from "react";
import { Pagination, TextField } from "@mui/material";
import {
  ErrorForms,
  SearchForm,
  createEmptyFormError,
  formValidation,
} from "./form";
import { CharacterTableList } from "./components/rick-and-morty-characters-table.component";
import { Character, paginationDataRM } from "./rick-and-morty-characters.vm";
const defaultPage = 1;
interface Props {
  characters: Character[];
  error: string;
  paginationData: paginationDataRM;
  searchForm: SearchForm;
  setSearchForm: (value: SearchForm) => void;
  page: number;
  setPage: (value: number) => void;
}
export const CharactersComponent: React.FC<Props> = (props) => {
  const {
    searchForm,
    setSearchForm,
    characters,
    page,
    setPage,
    paginationData,
    error,
  } = props;

  const [errorValidation, setErrorValidation] = React.useState<ErrorForms>(
    createEmptyFormError()
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const updateFieldValue =
    (field: keyof SearchForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      formValidation
        .validateField(field, e.target.value)
        .then((validationResult) => {
          setErrorValidation({
            ...errorValidation,
            [field]: validationResult.message as string,
          });
        });
      setSearchForm({
        [field]: e.target.value,
      });

      setPage(defaultPage);
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
        <span className="text-error">
          {errorValidation.name && errorValidation.name}
        </span>
        <CharacterTableList characters={characters}></CharacterTableList>
        {error && <p className="text-error">{error}</p>}
        {characters && characters.length > 0 && (
          <Pagination
            count={paginationData?.pages}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="secondary"
          />
        )}
      </div>
    </>
  );
};
