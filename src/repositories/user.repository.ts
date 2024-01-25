import { Injectable } from '@nestjs/common';
import { AUTH_ACTION, ROLE, User } from '@prisma/client';
import { PrismaService } from '../../src/config/prisma/prisma.service';
import { UserDTO } from '../../src/dto';
import { BasicContact, FullUserCreationDto } from '../../src/types';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(user: UserDTO): Promise<User> {
    return this.prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
      },
    });
  }

  async updateUser(user: UserDTO): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
      },
    });
  }

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

  async getUserWithBasicContact(contact: BasicContact) {
    console.log(contact);
    return this.prisma.user.findFirst({
      where: {
        OR: [
          {
            phoneNumber: {
              startsWith: contact.phoneNumber,
              mode: 'insensitive',
            },
          },
          {
            emailAddress: {
              startsWith: contact.emailAddress,
              mode: 'insensitive',
            },
          },
        ],
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

  async createUserAndAuthentication(user: FullUserCreationDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        emailAddress: user.user.emailAddress,
        phoneNumber: user.user.phoneNumber,
        authentication: {
          create: {
            active: false,
            role: user.authentication.role as unknown as ROLE,
            password: user.authentication.password,
            has2fa: user.authentication.has2fa,
            userAuthVerification: {
              create: {
                action: user.userAuthVerification
                  .action as unknown as AUTH_ACTION,
                code: user.userAuthVerification.code,
                expiry: user.userAuthVerification.expiry,
              },
            },
          },
        },
      },
    });
  }
}
