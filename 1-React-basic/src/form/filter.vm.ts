export interface Filter {
    org: string;
  }
  
  export const createEmptyFilter = (): Filter => ({
    org: 'lemoncode',
  });