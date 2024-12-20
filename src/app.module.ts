import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from './aws/s3/s3.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    MoviesModule,
    ConfigModule.forRoot(),
    MulterModule.register({}),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, S3Service],
})
export class AppModule {}
