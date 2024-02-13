import React from "react";
import { MemberListComponent } from "./github-members-list.component";
import { getMemberCollection } from "./api";
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
  const onLoadMemberList = (from:number, to: number) => {
    getMemberCollection(searchValue)
      .then((res) => {
        const response =  mapMemberCollectionFromApiToVm(res);
        const data = response.slice(from, to);
        setMembers(data);
        SetInfoPagination({
          perPage: 5,
          defaultPage: 1,
          totalElement: response.length,
        });
        setError(null);
      })
      .catch((err) => {
        setError(`Ha ocurrido un error ${err}`);
        setMembers([]);
        SetInfoPagination({
          perPage: perPage,
          defaultPage: defaultPage,
          totalElement: 0,
        });
      });
  };

  React.useEffect(() => {
    onLoadMemberList(newPagination.from, newPagination.to);
  }, [searchValue, newPagination.from, newPagination.to]);


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
