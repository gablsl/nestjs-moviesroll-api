import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'src/common/errors/not-found.error';
import { AlreadyExistsError } from 'src/common/errors/already-exists.error';

@Injectable()
export class MoviesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.prismaService.movie.findFirst({
      where: {
        name: createMovieDto.name,
      },
    });

    if (movie) {
      throw new AlreadyExistsError('Movie');
    }

    return await this.prismaService.movie.create({
      data: {
        ...createMovieDto,
      },
    });
  }

  findAll() {
    return this.prismaService.movie.findMany();
  }

  findOne(id: string) {
    const movie = this.prismaService.movie.findFirst({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundError('Movie');
    }

    return movie;
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = this.prismaService.movie.findFirst({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundError('Movie');
    }

    return this.prismaService.movie.update({
      where: {
        id,
      },
      data: {
        ...updateMovieDto,
      },
    });
  }

  remove(id: string) {
    const movie = this.prismaService.movie.findFirst({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundError('Movie');
    }

    return this.prismaService.movie.delete({
      where: {
        id,
      },
    });
  }
}
