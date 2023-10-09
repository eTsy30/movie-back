export interface IMovie {
  id: string;
  rating: number;
  status: boolean;
  title: string;
  director: string;
  year: number;
}

export interface IMovieData {
  movies: IMovie[];
}
