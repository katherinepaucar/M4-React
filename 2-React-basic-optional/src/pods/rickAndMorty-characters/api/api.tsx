import { APIResponse, CharacterApi } from "./apiModel";

export const getCharacterList = (page: number, name:string): Promise<APIResponse | Response> => {
   return  fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${name}`)
            .then(response =>  response)

}
