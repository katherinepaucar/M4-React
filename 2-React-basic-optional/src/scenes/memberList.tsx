import React from "react";
import { Layout } from "../layout/layout";
import { SearchMemberProvider } from "../core/github-members-context/search-member.context";
import { MemberListContainer } from "../pods/github-members-list";

export const MemberListPage: React.FC = () => {
  
  return (
    <SearchMemberProvider>
    <Layout>
      <MemberListContainer/>
    </Layout>
    </SearchMemberProvider>
  );
};