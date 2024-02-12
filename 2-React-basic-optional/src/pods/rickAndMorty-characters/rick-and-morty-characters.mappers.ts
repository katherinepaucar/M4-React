import * as vm from "./rick-and-morty-characters.vm";
import * as api from "./api/apiModel";
export const mapCharacterFromApiToVm = (character: api.CharacterApi):vm.Character => (
    {
        id:character.id,
        image: character.image,
        status: character.status,
        name: character.name,
    }
)
export const mapInfoPaginationFromApiToVm = (info: api.InfoPagination):vm.paginationDataRM => (
    {
        next: info.next,
        totalElements: info.count,
        pages: info.pages,
        prev: info.prev
    }
)

export const mapCharacterCollectionFromApiToVm = (
    characterCollection: api.CharacterApi[]
  ): vm.Character[] =>
  characterCollection.map((member) => mapCharacterFromApiToVm(member));

export const ResponseFromApiToVm = (
    characterCollection: api.APIResponse
  ): vm.ResponseVM =>(
    {   info: mapInfoPaginationFromApiToVm(characterCollection.info),
        results : mapCharacterCollectionFromApiToVm(characterCollection.results)
    }
  )