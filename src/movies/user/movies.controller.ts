import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UserRoles } from 'src/auth/roles/roles.enum';
import { MovieQueryDto } from './dto/movie-query.dto';

@Roles(UserRoles.USER)
@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(@Query() queryDto: MovieQueryDto) {
    return this.moviesService.findAll(queryDto);
  }
}
