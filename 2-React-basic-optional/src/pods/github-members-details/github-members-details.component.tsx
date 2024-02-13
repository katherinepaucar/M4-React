import React from "react";
import { Link } from "react-router-dom";
import { MemberEntity } from "./github-members-details.vm";
interface Props {
  member: MemberEntity;
}
export const MemberDetailComponent: React.FC<Props> = (props) => {
  const { member } = props;

  return (
    <>
      <div className="container">
        <h2>Hello from Detail page</h2>
        <h3>User {member?.login}</h3>
        <br />
        {member && <img src={member.avatarUrl} alt={member.login} />}

        <Link to="/list">Back to list page</Link>
      </div>
    </>
  );
};
