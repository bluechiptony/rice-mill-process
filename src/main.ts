import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import LoggerFactory from './config/logging/logger.factory';
// import * as csurf from 'csurf';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory.createLogger(),
  });

  app.use(cookieParser());
  // app.use(csurf({ cookie: true }));
  app.enableCors();
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('NANOSCALE BASE API')
    .setVersion('1.0')
    .setDescription('Nanoscale Base Rest API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8083);
}
bootstrap();
