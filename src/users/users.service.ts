import { UserRoles } from 'src/auth/roles/roles.enum';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AlreadyExistsError } from 'src/common/errors/already-exists.error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new AlreadyExistsError('Email');
    }

    // TODO: Create a custom error for this
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    return this.prismaService.user.create({
      data: {
        profile_picture: createUserDto.profile_picture,
        username: createUserDto.username,
        email: createUserDto.email,
        role: UserRoles.ADMIN,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  delete(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
