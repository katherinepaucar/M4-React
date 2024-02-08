import * as api from "./api/api-model";
import * as vm from "./github-members-details.vm";

export const mapMemberFromApiToVm = (
  member: api.MemberDetailApi
): vm.MemberEntity => ({
  id: member.id.toString(),
  login: member.login,
  avatarUrl: member.avatar_url
});