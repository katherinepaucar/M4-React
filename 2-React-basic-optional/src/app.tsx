import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LoginPage } from "./login";
import { DetailPage } from "./members-list/detail";
import { SearchProvider } from "./context/search.context";
import { ListPage } from "./members-list/list";
import { OtherList } from "./models/otherList";
import ResponsiveAppBar from "./navBar";

export const App = () => {
  return (
    <SearchProvider>
     <ResponsiveAppBar/>
        <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/other-list" element={<OtherList />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
};
