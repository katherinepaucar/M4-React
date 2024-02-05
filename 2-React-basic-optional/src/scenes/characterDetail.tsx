import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../layout/layout";
import { CharacterDetail } from "../pods/rick-and-morty-character-details";

export const CharacterDetailPage: React.FC = () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <CharacterDetail/>
    </Layout>
  );
};