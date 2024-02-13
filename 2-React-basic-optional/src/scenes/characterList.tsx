import React from "react";
import { Layout } from "../layout/layout";
import { CharactersContainer } from "../pods/rickAndMorty-characters";

export const CharacterListPage: React.FC = () => {
  return (
    <Layout>
      <CharactersContainer />
    </Layout>
  );
};
