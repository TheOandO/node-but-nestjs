import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { catchAsync } from './middleware/catchAsync';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Middleware
  app.use(catchAsync);

  await app.listen(3000);
}
bootstrap();
