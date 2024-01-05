import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import LoggerFactory from './config/logging/logger.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory.createLogger(),
  });

  const config = new DocumentBuilder()
    .setTitle('COREN Hub API')
    .setVersion('1.0')
    .setDescription('COREN Hub Rest API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8083);
}
bootstrap();
