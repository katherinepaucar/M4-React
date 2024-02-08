import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MemberEntity } from "./github-members-details.vm";
import { getMemberDetailFinal } from "./api";

export const MemberDetailComponent: React.FC = () => {
  const { id } = useParams();
 const [member, setMember] = useState<MemberEntity>(null);
  React.useEffect(() => {
    getMemberDetailFinal(id).then(res => setMember(res))
  }, []);

  return (
    <>
      <div className="container">
        <h2>Hello from Detail page</h2>
        <h3>User {member?.login }</h3>
        <br/>
        {member && (
            <img src={member.avatarUrl} alt={member.login}/>
        )}

        <Link to="/list">Back to list page</Link>
      </div>
    </>
  );
};
