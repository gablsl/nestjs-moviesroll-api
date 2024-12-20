import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(dto: { name?: string; page?: number; limit?: number }) {
    const { name, page = 1, limit = 15 } = dto;

    return this.prismaService.movie.findMany({
      ...(name && {
        where: {
          name: {
            contains: name,
          },
        },
      }),
      skip: Number((page - 1) * limit),
      take: Number(limit),
    });
  }
}
