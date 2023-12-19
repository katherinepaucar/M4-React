import React from "react";
import { Link } from "react-router-dom";
import { Character, Filter, APIResponse, createEmptyFilter } from "../models";
import { SearchContext } from "../context/search.context";
import {
  Button,
  TextField,
} from "@mui/material";

import { CharacterList, } from "./character-list";



export const CharacterPage: React.FC = () => {
  const { searchValue, setNewValue } = React.useContext(SearchContext);
  const [searchForm, setSearchForm] = React.useState<Filter>(
                                    createEmptyFilter(searchValue)
                                  );
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [error, setError] = React.useState(null);
  const perPage = 5;
  const defaultPage= 1;
  const [totalElement, setTotalElement] = React.useState<number>(0);
  const [newData, setNewData] = React.useState({
    from: 0,
    to: perPage,
  });
  React.useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then(handleError)
      .then((res) => getData(res, newData.from, newData.to))
      .catch((err) => {
        console.log(err);
        setError('Ha ocurrido un error');
        setCharacters([]);
        setTotalElement(0);
      });
  }, [searchValue, newData.from, newData.to]);

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
      const data = (res.results as Character[]).slice(from, to);
      setCharacters(data);
      setTotalElement((res.results as Character[]).length);
      if(error){
        setError(null);
      }

    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewValue(searchForm.org);
  };
  const updateFieldValue =
    (name: keyof Filter) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchForm({
        [name]: e.target.value,
      });
      //  console.log('updateFieldValue e')
    };
  const updateData = (data) => {
    //  console.log("updateData data", data);
    setNewData({
      from: data.from,
      to: data.to,
    });
  };

  return (
    <>
      <div className="container">
        <h2>Hello from List page</h2>
        <form className="form-list" onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="Organización"
            variant="standard"
            value={searchForm.org}
            required
            onChange={updateFieldValue("org")}
          />
          <Button variant="contained" type="submit">
            Buscar
          </Button>
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
