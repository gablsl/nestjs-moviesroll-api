import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'src/common/errors/not-found.error';
import { AlreadyExistsError } from 'src/common/errors/already-exists.error';
import { S3Service } from 'src/aws/s3/s3.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(createMovieDto: CreateMovieDto, file: Express.Multer.File) {
    const movie = await this.prismaService.movie.findFirst({
      where: {
        name: createMovieDto.name,
      },
    });

    if (movie) {
      throw new AlreadyExistsError('Movie');
    }

    if (!file) {
      throw new Error('File is undefined');
    }

    const imgUrl = await this.s3Service.uploadFile(
      file,
      process.env.AWS_MOVIES_BUCKET_NAME,
    );

    return await this.prismaService.movie.create({
      data: {
        imgUrl,
        name: createMovieDto.name,
        synopsis: createMovieDto.synopsis,
        episodes: Number(createMovieDto.episodes),
        year: Number(createMovieDto.year),
        genres: {
          set: Array.isArray(createMovieDto.genres)
            ? createMovieDto.genres
            : [createMovieDto.genres],
        },
        director: createMovieDto.director,
        cast: {
          set: Array.isArray(createMovieDto.cast)
            ? createMovieDto.cast
            : [createMovieDto.cast],
        },
        type: createMovieDto.type,
        slug: createMovieDto.slug,
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
