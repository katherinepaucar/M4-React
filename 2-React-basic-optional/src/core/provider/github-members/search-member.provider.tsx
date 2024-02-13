import React from "react";
import { SearchMemberContext } from "./search-member.context";

export const SearchMemberProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = React.useState("lemoncode");

  return (
    <SearchMemberContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </SearchMemberContext.Provider>
  );
};
