import React from "react";
import { RouterComponent } from "./core/router/router.component";
import { SearchMemberProvider } from "./core/provider/github-members/search-member.provider";
import { SearchCharacterProvider } from "./core/provider/rick-and-morty/characters.provider";
export const App = () => {
  return (
    <SearchMemberProvider>
      <SearchCharacterProvider>
        <RouterComponent />
      </SearchCharacterProvider>
    </SearchMemberProvider>
  );
};
