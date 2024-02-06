import * as api from './api/api-model';
import * as vm from './github-members-list.vm';
export const mapMemberFromApiToVm = (
    member: api.MemberEntityAPI
  ): vm.MemberEntity => ({
    id: member.id,
    login: member.login,
    avatarUrl: member.avatar_url,
  });
  
  export const mapMemberCollectionFromApiToVm = (
    memberCollection: api.MemberEntityAPI[]
  ): vm.MemberEntity[] =>
    memberCollection.map((member) => mapMemberFromApiToVm(member));