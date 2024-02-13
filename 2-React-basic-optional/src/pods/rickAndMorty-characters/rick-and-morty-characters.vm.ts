export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}
export interface paginationDataRM {
  totalElements: number;
  next: string;
  pages: number;
  prev: string;
}

export interface ResponseVM {
  info: paginationDataRM;
  results: Character[];
}
