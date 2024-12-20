import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundFilter } from './common/filters/not-found.filter';
import { AlreadyExistsFilter } from './common/filters/already-exists.filter';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  app.useGlobalFilters(new NotFoundFilter(), new AlreadyExistsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
