import React from "react";
import { Filter, MemberEntity, createEmptyFilter } from "../models";

interface SearchContextModel {
  searchValue: string;
  setNewValue(newValue: string): void;
  members: MemberEntity[];
  error: any;
}
export const SearchContext = React.createContext<SearchContextModel>(null);
export const SearchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = React.useState("lemoncode");
  const setNewValue = (newValue: string) => {
    setSearchValue(newValue);
    console.log("Search new Value", newValue);
  };
  const [members, setMembers] = React.useState<MemberEntity[]>([]);

  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${searchValue}/members`)
      .then(handleError)
      .then((res) => {
        setMembers(res);
        if (error) {
          setError(null);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Ha ocurrido un error");
        setMembers([]);
      });
  }, [searchValue]);
  const handleError = (response) => {
    // console.log("response", response);
    if (!response.ok) {
      throw Error(response.status);
    } else {
      return response.json();
    }
  };
  return (
    <SearchContext.Provider value={{ searchValue, setNewValue, members, error}}>
      {children}
    </SearchContext.Provider>
  );
};
