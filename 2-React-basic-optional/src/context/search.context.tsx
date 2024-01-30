import React from "react";
import { MemberEntity } from "../members-list/models";
const perPage = 5;
const defaultPage = 1;
interface SearchContextModel {
  searchValue: string;
  setSearchValue: (newValue: string) => void;
  members: MemberEntity[];
  error: string;
  infoPagination: PaginationData;
  setNewPagination: (newValue: SplitData) => void;
}
export const SearchContext = React.createContext<SearchContextModel>(null);
export const SearchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {

  const [searchValue, setSearchValue] = React.useState("lemoncode");
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [error, setError] = React.useState(null);
  const [infoPagination, SetInfoPagination] = React.useState<PaginationData>({
    perPage: perPage,
    defaultPage: defaultPage,
    totalElement: 0

  });
  const [newPagination, setNewPagination] = React.useState <SplitData>({
    from: 0,
    to: perPage,

  });
  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${searchValue}/members`)
      .then(handleError)
      .then((res) => getData(res, newPagination.from, newPagination.to))
      .catch((err) => {
        console.log(err);
        setError("Ha ocurrido un error");
        setMembers([]);
        SetInfoPagination({
          perPage: perPage,
          defaultPage: defaultPage,
          totalElement: 0
        });
      });
  }, [searchValue, newPagination.from, newPagination.to]);

  const handleError = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      return response.json();
    }
  };
  const getData = (res: MemberEntity[], from: number, to: number) => {
    /*console.log("from", from);
    console.log("to", to);*/
    if (res as MemberEntity[]) {
      const data = res.slice(from, to);
      setMembers(data);
      SetInfoPagination({
        perPage: 5,
        defaultPage: 1,
        totalElement: res.length
      });
      if (error) {
        setError(null);
      }
    }
  };
  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        members,
        error,
        infoPagination,
        setNewPagination,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
