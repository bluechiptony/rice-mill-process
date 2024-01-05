import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * gets user with id
   * @param id User id
   * @returns Found user or throws exception
   */
  async getUser(id: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }
}
