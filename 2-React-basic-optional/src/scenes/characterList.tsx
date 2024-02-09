import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../layout/layout";
import { SearchCharacterProvider } from "../core/rick-and-morty-context/characters.context";
import { CharacterContainer } from "../pods/rickAndMorty-characters";


export const CharacterListPage: React.FC = () => {
  const { id } = useParams();
  
  return (
    <SearchCharacterProvider>
    <Layout>
      <CharacterContainer/>
    </Layout>
    </SearchCharacterProvider>
  );
};