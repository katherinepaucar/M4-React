import React from "react";
import { MemberEntity, mapMemberCollectionFromApiToVm } from "../../../pods/github-members-list";
import { PaginationData, SplitData } from "../../../pods/github-members-list/pagination";
import { MemberEntityAPI, getMemberCollection } from "../../../pods/github-members-list/api";
import { SearchMemberContext } from "./search-member.context";

export const SearchMemberProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {

  const [searchValue, setSearchValue] = React.useState("lemoncode");
  /*const [members, setMembers] = React.useState<MemberEntity[]>([]);
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

  const handleError = (response: Response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      return response.json();
    }
  };
  const getData = (res: MemberEntityAPI[], from: number, to: number) => {
  console.log("from", from);
    console.log("to", to);
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
  };*/
  return (
    <SearchMemberContext.Provider
      value={{
        searchValue,
        setSearchValue
      }}
    >
      {children}
    </SearchMemberContext.Provider>
  );
};
