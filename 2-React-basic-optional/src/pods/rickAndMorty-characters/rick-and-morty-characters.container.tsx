import React from "react";
import { Pagination, TextField } from "@mui/material";
import { CharacterList } from "./rick-and-morty-characters.component";
import { ErrorForms, SearchForm, createEmptyFormError, formValidation } from "./form";
import { SearchCharacterContext } from "../../core/rick-and-morty-characters/characters.context";


export const CharacterPage: React.FC = () => {
  const {
    searchForm,
    setSearchForm,
    characters,
    paginationData,
    defaultPage,
    page,
    setPage,
    error,
  } = React.useContext(SearchCharacterContext);
  const [errorValidation, setErrorValidation] = React.useState<ErrorForms>(
    createEmptyFormError()
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const updateFieldValue =
    (field: keyof SearchForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // console.log(e);
      formValidation
        .validateField(field, e.target.value)
        .then((validationResult) => {
          console.log(validationResult);
          setErrorValidation({
            ...errorValidation,
            [field]: validationResult.message as string,
          });
        });
      setSearchForm({
        [field]: e.target.value,
      });
      console.log("page", page);
      setPage(defaultPage);
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
        <span className="text-error">
          {errorValidation.name && errorValidation.name}
        </span>
        <CharacterList characters={characters}></CharacterList>
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
