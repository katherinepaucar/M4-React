import { CharacterDetail } from "./apiModel";

export const getCharacterDetail = (id: string): Promise<CharacterDetail> => {
   return  fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response =>  response.json())

}
