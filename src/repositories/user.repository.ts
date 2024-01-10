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

  async getUsers(page: number, size: number) {
    return this.prisma.user.findMany({ skip: page, take: size });
  }

  async searchUsers(searchString: string) {
    return this.prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: searchString,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: searchString,
              mode: 'insensitive',
            },
          },
          {
            emailAddress: {
              contains: searchString,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }
}
