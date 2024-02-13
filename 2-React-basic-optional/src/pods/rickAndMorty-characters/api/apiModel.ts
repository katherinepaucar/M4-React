export interface CharacterApi {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface InfoPagination {
  count: number;
  next: string;
  pages: number;
  prev: string;
}
export interface APIResponse {
  info: InfoPagination;
  results: CharacterApi[];
}
