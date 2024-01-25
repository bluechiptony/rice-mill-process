import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ErrorMessages } from 'src/constants/errors';
import { ResponseMessages } from 'src/constants/messages/response.messages';
import { UserAuthRepository } from 'src/repositories/authentication.repository';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UserAuthRepository,
    PrismaService,
    ErrorMessages,
    ResponseMessages,
  ],
})
export class AuthenticationModule {}
