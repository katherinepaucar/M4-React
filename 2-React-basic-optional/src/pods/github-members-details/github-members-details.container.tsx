import React, { useState } from "react";
import { MemberDetailComponent } from "./github-members-details.component";
import { useParams } from "react-router-dom";
import { getMemberDetailFinal } from "./api";
import { MemberEntity } from "../github-members-list";


export const MemberDetailContainer: React.FC = () => {
  const { id } = useParams();
  const [member, setMember] = useState<MemberEntity>(null);
   React.useEffect(() => {
     getMemberDetailFinal(id).then(res => setMember(res))
   }, []);
 

  return <MemberDetailComponent  member={member} />;
};