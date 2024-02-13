import React, { useState } from "react";
import { MemberDetailComponent } from "./github-members-details.component";
import { useParams } from "react-router-dom";
import { getMemberDetail } from "./api";
import { MemberEntity } from "../github-members-list";
import { mapMemberFromApiToVm } from "./github-members-details.mapper";

export const MemberDetailContainer: React.FC = () => {
  const { id } = useParams();
  const [member, setMember] = useState<MemberEntity>(null);
  const [error, setError] = useState<string>(null);

  const loadMemberDetail = () =>
    getMemberDetail(id)
      .then((res) => setMember(mapMemberFromApiToVm(res)))
      .catch((err) => {
        setError(`Ha ocurrido un error ${err}`);
        throw Error(err);
      });
  React.useEffect(() => {
    loadMemberDetail();
  }, [id]);

  return <MemberDetailComponent member={member} />;
};
