import { Injectable } from '@nestjs/common';
import { ROLE, UserAuthentication } from '@prisma/client';
import { PrismaService } from '../../src/config/prisma/prisma.service';
import { CreateAuthenticationDto } from 'src/modules/authentication/dto/create-authentication.dto';
import { UpdateAuthenticationDto } from 'src/modules/authentication/dto/update-authentication.dto';

@Injectable()
export class UserAuthVerificationRepository {
  constructor(private prisma: PrismaService) {}

  async createAuthentication(
    userAuthentication: CreateAuthenticationDto,
  ): Promise<UserAuthentication> {
    return this.prisma.userAuthentication.create({
      data: {
        userId: userAuthentication.userId,
        password: null,
        active: false,
        has2fa: false,
        role: userAuthentication.role as unknown as ROLE,
      },
    });
  }

  async updateAuthentication(
    userAuthentication: UpdateAuthenticationDto,
  ): Promise<UserAuthentication> {
    return this.prisma.userAuthentication.update({
      where: {
        id: userAuthentication.id,
      },
      data: {
        userId: userAuthentication.userId,
        password: userAuthentication.password,
        active: userAuthentication.active,
        has2fa: userAuthentication.has2fa,
        role: userAuthentication.role as unknown as ROLE,
      },
    });
  }

  /**
   * gets user with id
   * @param id User id
   * @returns Found user or throws exception
   */
  async getUserAuthentication(id: string): Promise<UserAuthentication> {
    return this.prisma.userAuthentication.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  async getUserAuthentications(page: number, size: number) {
    return this.prisma.userAuthentication.findMany({ skip: page, take: size });
  }
}
