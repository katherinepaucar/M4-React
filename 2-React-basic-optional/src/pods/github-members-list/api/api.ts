import { MemberEntityAPI } from "./api-model";

export const getMemberCollection = (org: string) : Promise<MemberEntityAPI[]> => {
   return fetch(`https://api.github.com/orgs/${org}/members`)
    .then(response =>  response.json())
}
