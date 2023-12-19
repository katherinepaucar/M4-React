import React from "react";
import { Character, APIResponse } from "../models";
import { SearchContext } from "../context/search.context";
import {
  Button,
  TextField,
} from "@mui/material";

import { SearchName, createEmptyForm } from "../models/search";
import { CharacterList } from "./character-list";
import { useDebounce } from "use-debounce";



export const CharacterPage: React.FC = () => {
  const { searchValue, setNewValue } = React.useContext(SearchContext);
  const [searchForm, setSearchForm] = React.useState<SearchName>(
                           createEmptyForm());

  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [error, setError] = React.useState(null);
  const [debounceSearch] = useDebounce(searchForm, 700);
  console.log('debounceSearch', debounceSearch)
  const perPage = 5;
  const defaultPage= 1;
  const [totalElement, setTotalElement] = React.useState<number>(0);
  const [newData, setNewData] = React.useState({
    from: 0,
    to: perPage,
  });
  React.useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?name=${debounceSearch.name}`)
      .then(handleError)
      .then((res) => getData(res, newData.from, newData.to))
      .catch((err) => {
        console.log(err);
        setError('Ha ocurrido un error');
        setCharacters([]);
        setTotalElement(0);
      });
  }, [debounceSearch.name]);

  const handleError = response => {
    if (!response.ok) { 
        throw Error(response.statusText);
    } else {
        return response.json();
    }
  }; 
  const getData = (res: APIResponse<Character[]>, from: number, to: number) => {
    console.log(res)
    /*console.log("from", from);
    console.log("to", to);*/
    if (res.results && (res.results as Character[])) {
      const data = (res.results as Character[]);
      setCharacters(data);
      setTotalElement((res.results as Character[]).length);
      if(error){
        setError(null);
      }

    }
  };

  const updateFieldValue =
    (name: keyof SearchName) => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e);
      setSearchForm({
        [name]: e.target.value,
      });
      //  console.log('updateFieldValue e')
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
       {/* 
        <BasicPagination
          pageSize={perPage}
          totalElement={totalElement}
          defaultPage = {defaultPage}
          search = {searchValue}
          updateData={updateData}
        />*/}
      </div>
    </>
  );
};
