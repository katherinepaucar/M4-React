import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../layout/layout";
import { CharacterContainer } from "../pods/rickAndMorty-characters/rick-and-morty-characters.container";
import { SearchCharacterProvider } from "../core/providers/rick-and-morty-characters/characters.context";


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