import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { S3Module } from 'src/aws/s3/s3.module';
import { AuthModule } from 'src/auth/auth.module';
import { AdminMoviesController } from './admin/admin-movies.controller';
import { AdminMoviesService } from './admin/admin-movies.service';
import { MoviesController } from './user/movies.controller';
import { MoviesService } from './user/movies.service';

@Module({
  imports: [S3Module, AuthModule, MulterModule.register({})],
  controllers: [AdminMoviesController, MoviesController],
  providers: [AdminMoviesService, MoviesService],
})
export class MoviesModule {}
