import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './admin-create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
