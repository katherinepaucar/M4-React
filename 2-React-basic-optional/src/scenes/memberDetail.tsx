import React from "react";
import { Layout } from "../layout/layout";
import { MemberDetailContainer } from "../pods/github-members-details/github-members-details.container";

export const MemberDetailPage: React.FC = () => {
 
  return (
    <Layout>
      <MemberDetailContainer/>
    </Layout>
  );
};