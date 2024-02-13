import React from "react";
import { Layout } from "../layout/layout";
import { CharacterDetailContainer } from "../pods/rick-and-morty-character-details";

export const CharacterDetailPage: React.FC = () => {
  return (
    <Layout>
      <CharacterDetailContainer />
    </Layout>
  );
};
