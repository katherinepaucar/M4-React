export interface SearchName {
    name: string;
  }
  
  export const createEmptyForm = (): SearchName => ({
    name: '',
  });