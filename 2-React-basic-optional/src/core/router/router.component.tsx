import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { switchRoutes } from "./router";
import { CharacterDetailPage, CharacterListPage, LoginPage } from "../../scenes";
import { MemberListPage } from "../../scenes/memberList";
import { MemberDetailPage } from "../../scenes/memberDetail";


export const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={switchRoutes.root} element={<LoginPage />} />
        <Route path={switchRoutes.memberDetail} element={<MemberDetailPage />} />
        <Route path={switchRoutes.memberList} element={<MemberListPage />} />
        <Route path={switchRoutes.characterDetail} element={<CharacterDetailPage />} />
        <Route path={switchRoutes.characterList} element={<CharacterListPage />} />

      </Routes>
    </Router>
  );
};