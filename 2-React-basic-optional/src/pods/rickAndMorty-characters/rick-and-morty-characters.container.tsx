import React from "react";
import { CharactersComponent } from "./rick-and-morty-characters.component";
import { SearchCharacterProvider } from "../../core/rick-and-morty-context/characters.context";


export const CharactersContainer: React.FC = () => {

  return(
    <SearchCharacterProvider>
        <CharactersComponent/>;
    </SearchCharacterProvider> 
  )

};