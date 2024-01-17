import { UserService } from './user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ErrorMessages } from 'src/constants/errors';
import {
  ResourceExistsException,
  ResourceNotFoundException,
} from 'src/exceptions';

describe('User Service Tests', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let errorMessages: ErrorMessages;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ErrorMessages,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn(),
            getUser: jest.fn(),
            updateUser: jest.fn(),
            getUserWithBasicContact: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    errorMessages = module.get<ErrorMessages>(ErrorMessages);
  });

  it('User service should be defined', () => {
    expect(userService).toBeDefined();
    expect(errorMessages).toBeDefined();
  });

  it('User repository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('Create user tests', () => {
    it('Should save if user is not created already', async () => {
      (userRepository.getUserWithBasicContact as jest.Mock).mockResolvedValue(
        undefined,
      );

      (userRepository.createUser as jest.Mock).mockResolvedValue({
        firstName: 'Jon',
        lastName: 'Snow',
        emailAddress: 'admin@nanoscale.com',
        phoneNumber: '08028818000',
      });

      const user = await userService.createUser({
        firstName: 'Jon',
        lastName: 'Snow',
        emailAddress: 'admin@nanoscale.com',
        phoneNumber: '08028818000',
      });

      expect(userRepository.getUserWithBasicContact).toHaveBeenCalledWith({
        emailAddress: 'admin@nanoscale.com',
        phoneNumber: '08028818000',
      });
      expect(user).not.toBeNull();
      expect(user.firstName).toBe('Jon');
      expect(userRepository.createUser).toHaveBeenCalledTimes(1);
    });

    it('Should save if user is not created already', async () => {
      (userRepository.getUserWithBasicContact as jest.Mock).mockResolvedValue({
        firstName: 'Jon',
        lastName: 'Snow',
        emailAddress: 'admin@nanoscale.com',
        phoneNumber: '08028818000',
      });

      const createUserFunction = async () => {
        await userService.createUser({
          firstName: 'Jon',
          lastName: 'Snow',
          emailAddress: 'admin@nanoscale.com',
          phoneNumber: '08028818000',
        });
      };

      expect(createUserFunction).rejects.toThrow(ResourceExistsException);
      expect(userRepository.createUser).toHaveBeenCalledTimes(0);
    });
  });

  describe('Update user tests', () => {
    it('Should update if user exists', async () => {
      (userRepository.getUser as jest.Mock).mockResolvedValue({
        id: '21800252-e833-43ad-974c-705b449eb830',
        firstName: 'Jon',
        lastName: 'Snow',
        emailAddress: 'admin@nanoscale.com',
        phoneNumber: '08028818000',
      });

      (userRepository.updateUser as jest.Mock).mockResolvedValue({
        firstName: 'Michael',
        lastName: 'Snow',
      });

      const user = await userService.updateUser({
        id: '21800252-e833-43ad-974c-705b449eb830',
        firstName: 'Jon',
        lastName: 'Snow',
        emailAddress: 'admin@nanoscale.com',
        phoneNumber: '08028818000',
      });

      expect(user).not.toBeNull();
      expect(user.firstName).toBe('Michael');
      expect(userRepository.createUser).toHaveBeenCalledTimes(0);
      expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
    });

    it('Should not update if user does not exist', async () => {
      (userRepository.getUser as jest.Mock).mockResolvedValue(undefined);

      const updateUserFunction = async () => {
        await userService.updateUser({
          id: '21800252-e833-43ad-974c-705b449eb830',
          firstName: 'Jon',
          lastName: 'Snow',
          emailAddress: 'admin@nanoscale.com',
          phoneNumber: '08028818000',
        });
      };

      expect(updateUserFunction).rejects.toThrow(ResourceNotFoundException);
      expect(userRepository.updateUser).toHaveBeenCalledTimes(0);
    });
  });
});
