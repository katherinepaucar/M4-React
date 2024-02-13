import React from "react";
import { Layout } from "../layout/layout";
import { MemberDetailContainer } from "../pods/github-members-details";

export const MemberDetailPage: React.FC = () => {
  return (
    <Layout>
      <MemberDetailContainer />
    </Layout>
  );
};
