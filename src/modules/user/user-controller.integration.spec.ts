import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { ErrorMessages } from 'src/constants/errors';
import { ResponseMessages } from 'src/constants/messages';

describe('User Controller Integration Tests', () => {
  let userController: UserController;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        ErrorMessages,
        ResponseMessages,
        { provide: UserRepository, useValue: {} },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('Should define the controller', () => {
    expect(userController).toBeDefined();
  });

  it('Should define the repository', () => {
    expect(userRepository).toBeDefined();
  });
});
