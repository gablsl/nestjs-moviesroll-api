export class CreateMovieDto {
  imgUrl: string;
  name: string;
  synopsis: string;
  episodes?: number;
  year: number;
  genres: string[];
  director: string;
  cast: string[];
  type: 'SERIE' | 'MOVIE';
  slug: string;
}
