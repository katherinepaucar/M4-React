import React from "react";
import { Layout } from "../layout/layout";
import { MemberListContainer } from "../pods/github-members-list";

export const MemberListPage: React.FC = () => {
  return (
    <Layout>
      <MemberListContainer />
    </Layout>
  );
};
