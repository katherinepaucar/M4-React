import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../layout/layout";
import { SearchCharacterProvider } from "../core/rick-and-morty-context/characters.context";
import { CharactersContainer } from "../pods/rickAndMorty-characters";


export const CharacterListPage: React.FC = () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <CharactersContainer/>
    </Layout>
  );
};