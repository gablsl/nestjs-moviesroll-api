export class CreateMovieDto {
  imgUrl: string;
  name: string;
  synopsis: string;
  episodies?: number;
  year: number;
  genres: string[];
  director: string;
  cast: string[];
  type: 'SERIE' | 'MOVIE';
  slug: string;
}
