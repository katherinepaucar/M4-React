export interface Character {
    id: string;
    name: string;
    status: string;
    image: string;
  }
  export interface CharacterInfo {
    id: string;
    name: string;
    status: string;
    image: string;
    gender: string;
  }
export interface InfoPagination{
    count: number;
    next: string;
    pages: 42;
    prev: any;
}
export interface APIResponse<T> {
    info: InfoPagination;
    results:  T;

}
