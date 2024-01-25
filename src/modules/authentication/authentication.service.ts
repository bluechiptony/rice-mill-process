import { Injectable, Logger } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { UserAuthRepository } from 'src/repositories/authentication.repository';
import { ErrorMessages } from 'src/constants/errors/error.messages';
import { ResourceNotFoundException } from 'src/exceptions';
import { UserAuthentication } from '@prisma/client';

@Injectable()
export class AuthenticationService {
  private SERVICE_NAME: string = 'Authentication service';
  private logger = new Logger(this.SERVICE_NAME);

  constructor(
    private userAuthRepository: UserAuthRepository,
    private errorMessages: ErrorMessages,
  ) {}

  create(createAuthenticationDto: CreateAuthenticationDto) {
    //check
    return this.userAuthRepository.createAuthentication(
      createAuthenticationDto,
    );
  }

  findAll(page: number, size: number) {
    return this.userAuthRepository.getUserAuthentications(page, size);
  }

  async findOne(id: string): Promise<UserAuthentication> {
    const auth = await this.userAuthRepository.getUserAuthentication(id);
    if (!auth) {
      throw new ResourceNotFoundException();
    }
    return auth;
  }

  update(updateAuthenticationDto: UpdateAuthenticationDto) {
    //check user auth

    return this.userAuthRepository.updateAuthentication(
      updateAuthenticationDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
