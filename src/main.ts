import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { catchAsync } from './middleware/catchAsync';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //Middleware
  app.useGlobalPipes(new ValidationPipe());
  app.use(catchAsync);

  await app.listen(3000);
}
bootstrap();
