import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  private SERVICE_NAME: string = 'User service';
  private logger = new Logger(this.SERVICE_NAME);
  constructor(private userRepository: UserRepository) {}

  /**
   * Searches for a user with an id
   * @param id User's Id
   * @returns User
   */
  async getUser(id: string): Promise<User> {
    return this.userRepository.getUser(id);
  }

  async getUsers(page: number, size: number): Promise<User[]> {
    if (page == 0 || page == 1) {
      page = 0;
    }
    return this.userRepository.getUsers(page, size);
  }

  async searchUsers(searchString: string): Promise<User[]> {
    return this.userRepository.searchUsers(searchString);
  }
}
