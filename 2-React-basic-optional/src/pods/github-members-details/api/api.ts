import { mapMemberFromApiToVm } from "../github-members-details.mapper";
import { MemberEntity } from "../github-members-details.vm";
import { MemberDetailApi } from "./api-model";

export const getMemberDetail = (id: string): Promise<MemberDetailApi> => 
     fetch(`https://api.github.com/users/${id}`)
            .then(response =>  response.json())
