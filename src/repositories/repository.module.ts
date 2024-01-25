import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { UserAuthRepository } from './authentication.repository';
import { UserAuthVerificationRepository } from './auth-verification.repository';

@Module({
  providers: [
    UserRepository,
    UserAuthRepository,
    UserAuthVerificationRepository,
  ],
  imports: [PrismaModule],
  exports: [UserRepository, UserAuthRepository, UserAuthVerificationRepository],
})
export class RepositoryModule {}
