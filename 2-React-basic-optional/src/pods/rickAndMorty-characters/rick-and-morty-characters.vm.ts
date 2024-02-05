export interface Character {
    id: number;
    name: string;
    status: string;
    image: string;
  }
  export interface paginationData{
    totalElements: number;
    next: string;
    pages: number;
    prev: string;
}

  export interface ResponseVM {
    info: paginationData;
    results:  Character[];

}
