import { MemberEntityAPI } from "./api-model";

export const getMemberCollection = (org: string) : Promise<MemberEntityAPI[] | Response> => {
   return fetch(`https://api.github.com/orgs/${org}/members`)
    .then(response =>  response)
}
