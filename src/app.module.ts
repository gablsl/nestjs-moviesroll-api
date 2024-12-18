import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [PrismaModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
