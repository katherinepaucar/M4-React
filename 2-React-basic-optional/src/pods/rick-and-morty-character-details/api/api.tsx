import { CharacterDetail } from "./apiModel";

export const getCharacterDetail = (id: string): Promise<CharacterDetail | Response> => {
   return  fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response =>  response)

}
