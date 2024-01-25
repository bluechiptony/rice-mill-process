import { Injectable, Logger } from '@nestjs/common';
import { AUTH_ACTION, User } from '@prisma/client';
import { ErrorMessages } from 'src/constants/errors';
import { UserDTO } from 'src/dto';
import {
  ResourceExistsException,
  ResourceNotFoundException,
} from 'src/exceptions';
import { UserRepository } from 'src/repositories/user.repository';
import { FullUserCreationDto } from 'src/types';
import { StringGenUtilService } from '../utils/string-gen-util/string-gen-util.service';

@Injectable()
export class UserService {
  private SERVICE_NAME: string = 'User service';
  private logger = new Logger(this.SERVICE_NAME);
  constructor(
    private userRepository: UserRepository,
    private stringUtilService: StringGenUtilService,
    private errorMessages: ErrorMessages,
  ) {}

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

  async createUser(user: UserDTO): Promise<User> {
    // check id user exists by phone  and email

    let userFound: User = await this.userRepository.getUserWithBasicContact({
      phoneNumber: user.phoneNumber,
      emailAddress: user.emailAddress,
    });

    if (userFound) {
      //throw exception
      throw new ResourceExistsException({
        message: this.errorMessages.User.USER_ALREADY_EXISTS,
        status: 400,
        description: `User ${user.emailAddress} - [User Creation]: User exists on database`,
      });
    }
    // if user exists throw exception
    userFound = await this.userRepository.createUser(user);

    this.logger.log(
      `User ${
        userFound.id
      } - [User Creation]:  successful with : ${JSON.stringify(userFound)}`,
    );
    // save user
    return userFound;
  }

  async updateUser(user: UserDTO): Promise<User> {
    let userFound = await this.userRepository.getUser(user.id);

    if (!userFound) {
      throw new ResourceNotFoundException({
        message: this.errorMessages.User.USER_NOT_EXISTS,
        status: 404,
        description: `User ${user.id} - [User Update]: Not found on database`,
      });
    }

    userFound.firstName = user.firstName || userFound.firstName;
    userFound.lastName = user.lastName || userFound.lastName;
    userFound.emailAddress = user.emailAddress || userFound.emailAddress;
    userFound.phoneNumber = user.phoneNumber || userFound.phoneNumber;

    userFound = await this.userRepository.updateUser(userFound);

    this.logger.log(
      `User ${
        userFound.id
      } - [User Update]:  successful with : ${JSON.stringify(userFound)}`,
    );
    return userFound;
  }

  async signUpUser(user: UserDTO): Promise<User> {
    // check id user exists by phone  and email

    let userFound: User = await this.userRepository.getUserWithBasicContact({
      phoneNumber: user.phoneNumber,
      emailAddress: user.emailAddress,
    });

    this.logger.log('userFound');
    this.logger.log(userFound);

    if (userFound) {
      //throw exception
      throw new ResourceExistsException({
        message: this.errorMessages.User.USER_ALREADY_EXISTS,
        status: 400,
        description: `User ${user.emailAddress} - [User Creation]: User exists on database`,
      });
    }

    const fullUser: FullUserCreationDto = {
      user: user,
      authentication: {
        password: this.stringUtilService.randomAlpha(10),
        active: false,
        role: user.role,
        has2fa: false,
      },
      userAuthVerification: {
        action: AUTH_ACTION.ACCOUNT_VERIFICATION,
        code: this.stringUtilService.randomAlpha(64),
        expiry: new Date(),
      },
    };
    // if user exists throw exception
    userFound = await this.userRepository.createUserAndAuthentication(fullUser);

    //send email to user

    this.logger.log(
      `User ${
        userFound.id
      } - [User & Auth Creation]:  successful with : ${JSON.stringify(
        userFound,
      )}`,
    );
    // save user
    return userFound;
  }
}
