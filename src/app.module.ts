import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './config/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { RepositoryModule } from './repositories/repository.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { ErrorMessages } from './constants/errors';
import { ResponseMessages } from './constants/messages';
import { APP_FILTER } from '@nestjs/core';
import { NanoscaleExceptionFilter } from './filters/exception.filter';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AuthVerificationModule } from './modules/auth-verification/auth-verification.module';
import { UtilsModule } from './modules/utils/utils.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    RepositoryModule,
    AuthenticationModule,
    AuthVerificationModule,
    UtilsModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    { provide: APP_FILTER, useClass: NanoscaleExceptionFilter },
    AppService,
    UserService,
    ErrorMessages,
    ResponseMessages,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes(UserController);
  }
}
