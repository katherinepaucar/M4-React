import * as vm from "./rick-and-morty-characters-details.vm";
import * as api from "./api/apiModel";

export const mapCharacterFromApiToVm = (character: api.CharacterDetail) : vm.CharacterInfo => ({
    id: (character.id).toString(),
    name: character.name,
    gender: character.gender,
    image: character.image,
    status: character.status
})