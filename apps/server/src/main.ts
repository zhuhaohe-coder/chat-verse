import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true }), // 将请求体中的数据转换为 DTO 实例
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
