import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  providers: [UserRepository],
  imports: [PrismaModule],
  exports: [UserRepository],
})
export class RepositoryModule {}
