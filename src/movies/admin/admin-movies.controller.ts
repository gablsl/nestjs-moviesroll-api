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
import { AdminMoviesService } from './admin-movies.service';
import { CreateMovieDto } from './dto/admin-create-movie.dto';
import { UpdateMovieDto } from './dto/admin-update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UserRoles } from 'src/auth/roles/roles.enum';
import { AuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Roles(UserRoles.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Controller('api/v1/admin/movies')
export class AdminMoviesController {
  constructor(private readonly moviesService: AdminMoviesService) {}

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
