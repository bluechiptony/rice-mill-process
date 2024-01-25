import { Module } from '@nestjs/common';
import { AuthVerificationService } from './auth-verification.service';
import { AuthVerificationController } from './auth-verification.controller';

@Module({
  controllers: [AuthVerificationController],
  providers: [AuthVerificationService],
})
export class AuthVerificationModule {}
