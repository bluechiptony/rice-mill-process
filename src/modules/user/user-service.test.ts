import { UserService } from './user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ErrorMessages } from 'src/constants/errors';
import { ResourceExistsException } from 'src/exceptions';

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

  it('Should save if user is not created already', async () => {
    /**
     * Arrange
     */

    (userRepository.getUserWithBasicContact as jest.Mock).mockResolvedValue(
      undefined,
    );

    (userRepository.createUser as jest.Mock).mockResolvedValue({
      firstName: 'Jon',
      lastName: 'Snow',
      emailAddress: 'admin@nanoscale.com',
      phoneNumber: '08028818000',
    });

    /**
     * Act
     */

    const user = await userService.createUser({
      firstName: 'Jon',
      lastName: 'Snow',
      emailAddress: 'admin@nanoscale.com',
      phoneNumber: '08028818000',
    });

    /**
     * Assert
     */

    expect(userRepository.getUserWithBasicContact).toHaveBeenCalledWith({
      emailAddress: 'admin@nanoscale.com',
      phoneNumber: '08028818000',
    });
    expect(user).not.toBeNull();
    expect(user.firstName).toBe('Jon');
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
  });

  it('Should save if user is not created already', async () => {
    /**
     * Arrange
     */

    (userRepository.getUserWithBasicContact as jest.Mock).mockResolvedValue({
      firstName: 'Jon',
      lastName: 'Snow',
      emailAddress: 'admin@nanoscale.com',
      phoneNumber: '08028818000',
    });

    (userRepository.createUser as jest.Mock).mockResolvedValue({
      firstName: 'Jon',
      lastName: 'Snow',
      emailAddress: 'admin@nanoscale.com',
      phoneNumber: '08028818000',
    });

    /**
     * Act
     */

    const createUserFunction = async () => {
      await userService.createUser({
        firstName: 'Jon',
        lastName: 'Snow',
        emailAddress: 'admin@nanoscale.com',
        phoneNumber: '08028818000',
      });
    };

    /**
     * Assert
     */

    expect(createUserFunction).rejects.toThrow(ResourceExistsException);
    expect(userRepository.createUser).toHaveBeenCalledTimes(0);
  });
});
