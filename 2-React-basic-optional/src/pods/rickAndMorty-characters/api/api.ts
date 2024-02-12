import { APIResponse } from "./apiModel";

export const getCharacterList = (page: number, name:string): Promise<APIResponse> => {
   return  fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${name}`)
            .then(response =>  response.json())

}
