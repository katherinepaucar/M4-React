import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { LoginPage } from "./login";
import { DetailPage } from "./members-list/detail";
import { SearchProvider } from "./context/search-member.context";
import { ListPage } from "./members-list/list";
import { CharacterPage } from "./characters/character-page";
import { CharacterDetailPage } from "./characters/character-detail";
import { Layout } from "./layout/layout";
import { SearchCharacterProvider } from "./context/search-character.context";

export const App = () => {
  return (
    <SearchProvider>
      <SearchCharacterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/list"
            element={
              <Layout>
                <ListPage />
              </Layout>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Layout>
                <DetailPage />
              </Layout>
            }
          />
          
          <Route
            path="/character-list"
            element={
              <Layout>
                <CharacterPage />
              </Layout>
            }
          />
          <Route
            path="/character-detail/:id"
            element={
              <Layout>
                <CharacterDetailPage />
              </Layout>
            }
          />
        </Routes>
      </Router>
      </SearchCharacterProvider>
    </SearchProvider>
  );
};
