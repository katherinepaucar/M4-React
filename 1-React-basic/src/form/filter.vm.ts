export interface Filter {
    org: string;
  }
  
  export const createEmptyFilter = (value:string): Filter => ({
    org: value,
  });