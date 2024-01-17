import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from './user.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ErrorMessages } from 'src/constants/errors';
import { ResponseMessages } from 'src/constants/messages/response.messages';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    PrismaService,
    ErrorMessages,
    ResponseMessages,
  ],
})
export class UserModule {}
