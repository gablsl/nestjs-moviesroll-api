import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundFilter } from './common/filters/not-found.filter';
import { AlreadyExistsFilter } from './common/filters/already-exists.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalFilters(new NotFoundFilter(), new AlreadyExistsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
