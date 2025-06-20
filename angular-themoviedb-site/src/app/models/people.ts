import { IMedia } from './media';

export interface IPeopleList {
  page: number;
  results: IPeople[];
  total_pages: number;
  total_results: number;
}

export interface IPeople {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  character: string;
  known_for: {
    backdrop_path?: string;
    id: number;
    title?: string;
    original_title?: string;
    overview: string;
    poster_path: string;
    media_type: string;
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
    name?: string;
    original_name?: string;
    first_air_date?: string;
    origin_country?: string[];
  }[];
}

export interface IPeopleDetail {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: any;
  gender: number;
  homepage: any;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface ICredits {
  id: number;
  cast: IPeople[];
  crew: IPeople[];
}

export interface IMediaCredits {
  id: number;
  cast: IMedia[];
  crew: IMedia[];
}
