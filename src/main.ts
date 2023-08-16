import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const PORT = process.env.NODE_PORT;
  await app.listen(PORT);
  console.log(`server started on port ${PORT}`);
}
bootstrap();
