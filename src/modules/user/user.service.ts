import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  private SERVICE_NAME: string = 'User service';
  private logger = new Logger(this.SERVICE_NAME);
  constructor(private userRepository: UserRepository) {}
  async getUser(id: string): Promise<User> {
    return this.userRepository.getUser(id);
  }
}
