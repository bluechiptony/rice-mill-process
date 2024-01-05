import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from './user.service';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService, PrismaService],
})
export class UserModule {}
