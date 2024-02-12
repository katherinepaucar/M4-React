import React from "react";
import { MemberEntity } from "../../../pods/github-members-list/github-members-list.vm";
import { getMemberCollection } from "../../../pods/github-members-list/api/api";
import { mapMemberCollectionFromApiToVm } from "../../../pods/github-members-list/github-members-list.mapper";
import { MemberEntityAPI } from "../../../pods/github-members-list/api";
import { PaginationData, SplitData } from "../../../pods/github-members-list/pagination";

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