import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './http-exception.filter';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
