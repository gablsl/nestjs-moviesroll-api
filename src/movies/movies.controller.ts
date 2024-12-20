import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UserRoles } from 'src/auth/roles/roles.enum';
import { AuthGuard } from './../auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Roles(UserRoles.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imgUrl'))
  create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.moviesService.create(createMovieDto, file);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
