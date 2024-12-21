import { UserRoles } from 'src/auth/roles/roles.enum';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AlreadyExistsError } from 'src/common/errors/already-exists.error';
import { S3Service } from 'src/aws/s3/s3.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'src/common/errors/not-found.error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

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
        profilePicture: createUserDto.profilePicture,
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

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File,
  ) {
    const user = this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    if ((await user).profilePicture) {
      const fileKey = this.extractFileKey((await user).profilePicture);

      if (!fileKey) {
      } else {
        await this.s3Service.deleteFile(
          fileKey,
          process.env.AWS_USERS_BUCKET_NAME,
        );
      }
    }

    const profilePicture = await this.s3Service.uploadFile(
      file,
      process.env.AWS_USERS_BUCKET_NAME,
    );

    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        profilePicture,
        ...updateUserDto,
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

  private extractFileKey(fileUrl: string): string | null {
    try {
      const url = new URL(fileUrl);
      return url.pathname.substring(1); // Remove a barra inicial "/"
    } catch (error) {
      return null;
    }
  }
}
