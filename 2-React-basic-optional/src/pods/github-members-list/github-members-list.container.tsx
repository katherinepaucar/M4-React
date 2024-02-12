import React from "react";
import { MemberListComponent } from "./github-members-list.component";
import { MemberEntityAPI, getMemberCollection } from "./api";
import { mapMemberCollectionFromApiToVm } from "./github-members-list.mapper";
import { MemberEntity } from "./github-members-list.vm";
import { PaginationData, SplitData } from "./pagination";
import { SearchMemberContext } from "../../core/provider/github-members/search-member.context";

const perPage = 5;
const defaultPage = 1;
export const MemberListContainer: React.FC = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchMemberContext);

  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [error, setError] = React.useState(null);
  const [infoPagination, SetInfoPagination] = React.useState<PaginationData>({
    perPage: perPage,
    defaultPage: defaultPage,
    totalElement: 0,
  });
  const [newPagination, setNewPagination] = React.useState<SplitData>({
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
          totalElement: 0,
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
    /*console.log("from", from);
    console.log("to", to);*/
    const response = mapMemberCollectionFromApiToVm(res);
    if (response) {
      const data = response.slice(from, to);
      setMembers(data);
      SetInfoPagination({
        perPage: 5,
        defaultPage: 1,
        totalElement: response.length,
      });
      if (error) {
        setError(null);
      }
    }
  };
  return (
    <MemberListComponent
      members={members}
      error={error}
      infoPagination={infoPagination}
      searchValue={searchValue}
      setSearchValue = {setSearchValue}
      setNewPagination = {setNewPagination}
    />
  );
};
