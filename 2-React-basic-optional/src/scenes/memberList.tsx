import React from "react";

import { Layout } from "../layout/layout";

import { SearchMemberProvider } from "../core/providers/github-members-list/search-member.context";
import { MemberListContainer } from "../pods/github-members-list/github-members-list.container";


export const MemberListPage: React.FC = () => {

  
  return (
    <SearchMemberProvider>
    <Layout>
      <MemberListContainer/>
    </Layout>
    </SearchMemberProvider>
  );
};