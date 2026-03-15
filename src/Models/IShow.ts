export interface IShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  episode_run_time?: number[];
  tagline?: string;
  name: string;
  vote_average: number;
  vote_count: number;
}
