import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LoginPage } from "./login";
import { DetailPage } from "./members-list/detail";
import { SearchProvider } from "./context/search.context";
import { ListPage } from "./members-list/list";
import ResponsiveAppBar from "./navBar";
import { CharacterPage } from "./characters/character-page";
import { CharacterDetailPage } from "./characters/character-detail";

export const App = () => {
  return (
    <SearchProvider>
     <ResponsiveAppBar/>
        <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/character-list" element={<CharacterPage />} />
          <Route path="/character-detail/:id" element={<CharacterDetailPage />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
};
