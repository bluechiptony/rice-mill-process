import { Injectable } from '@nestjs/common';
import { CreateAuthVerificationDto } from './dto/create-auth-verification.dto';
import { UpdateAuthVerificationDto } from './dto/update-auth-verification.dto';

@Injectable()
export class AuthVerificationService {
  create(createAuthVerificationDto: CreateAuthVerificationDto) {
    return 'This action adds a new authVerification';
  }

  findAll() {
    return `This action returns all authVerification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authVerification`;
  }

  update(id: number, updateAuthVerificationDto: UpdateAuthVerificationDto) {
    return `This action updates a #${id} authVerification`;
  }

  remove(id: number) {
    return `This action removes a #${id} authVerification`;
  }
}
