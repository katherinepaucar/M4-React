interface SwitchRoutes {
  root: string;
  memberList: string;
  memberDetail: string;
  characterList: string;
  characterDetail: string;
}
export const switchRoutes: SwitchRoutes = {
  root: "/",
  memberList: "/list",
  memberDetail: "/detail/:id",
  characterList: "/character-list",
  characterDetail: "/character-detail/:id",
};
