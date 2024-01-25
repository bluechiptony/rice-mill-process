import { PartialType } from '@nestjs/swagger';
import { CreateAuthVerificationDto } from './create-auth-verification.dto';

export class UpdateAuthVerificationDto extends PartialType(CreateAuthVerificationDto) {}
