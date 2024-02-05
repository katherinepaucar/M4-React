import { generatePath } from "react-router-dom"

interface SwitchRoutes{
    root: string,
    memberList: string,
    memberDetail: string,
    characterList: string,
    characterDetail: string,

}
export const switchRoutes: SwitchRoutes = {
    root: "/",
    memberList: "/list",
    memberDetail: "/detail/:id",
    characterList: "/character-list",
    characterDetail: "/character-detail/:id"
}

/*interface Routes extends Omit<SwitchRoutes, {"memberDetail"}>{
    memberDetail: (id:string) => string

}*/
/*interface Routes extends Omit<SwitchRoutes, "characterDetail">{
    characterDetail: (id:string) => string

}*/

/*export const routes: Routes = {
    ...switchRoutes
   //  memberDetail: (id) => generatePath(switchRoutes.memberDetail, {id}),
    // characterDetail:(id) => generatePath(switchRoutes.characterDetail,{id})
}*/