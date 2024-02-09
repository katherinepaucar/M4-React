import React from "react";
import { MemberListComponent } from "./github-members-list.component";
import { SearchMemberProvider } from "../../core/github-members-context/search-member.context";

export const MemberListContainer: React.FC = () => {
  return (
    <SearchMemberProvider>
      <MemberListComponent />
    </SearchMemberProvider>
  );
};
