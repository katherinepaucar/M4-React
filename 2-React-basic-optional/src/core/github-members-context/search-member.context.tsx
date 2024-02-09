import React from "react";
import { MemberEntity } from "../../pods/github-members-list/github-members-list.vm";
import { getMemberCollection } from "../../pods/github-members-list/api/api";
import { mapMemberCollectionFromApiToVm } from "../../pods/github-members-list/github-members-list.mapper";
import { MemberEntityAPI } from "../../pods/github-members-list/api";
import { PaginationData, SplitData } from "../../pods/github-members-list/pagination";

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
export const SearchMemberContext = React.createContext<SearchContextModel>(null);
export const SearchMemberProvider: React.FC<React.PropsWithChildren> = ({
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
    getMemberCollection(searchValue)
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
  const getData = (res: MemberEntityAPI[], from: number, to: number) => {
    /*console.log("from", from);
    console.log("to", to);*/
      const response = mapMemberCollectionFromApiToVm(res)
    if (response) {
      const data = response.slice(from, to);
      setMembers(data);
      SetInfoPagination({
        perPage: 5,
        defaultPage: 1,
        totalElement: response.length
      });
      if (error) {
        setError(null);
      }
    }
  };
  return (
    <SearchMemberContext.Provider
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
    </SearchMemberContext.Provider>
  );
};
