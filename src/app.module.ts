import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './config/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { RepositoryModule } from './repositories/repository.module';

@Module({
  imports: [PrismaModule, UserModule, RepositoryModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
