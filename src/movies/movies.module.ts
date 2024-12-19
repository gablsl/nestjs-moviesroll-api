import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MulterModule } from '@nestjs/platform-express';
import { S3Module } from 'src/aws/s3/s3.module';

@Module({
  imports: [S3Module, MulterModule.register({})],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
