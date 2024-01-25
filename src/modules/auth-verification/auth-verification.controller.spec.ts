import { Test, TestingModule } from '@nestjs/testing';
import { AuthVerificationController } from './auth-verification.controller';
import { AuthVerificationService } from './auth-verification.service';

describe('AuthVerificationController', () => {
  let controller: AuthVerificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthVerificationController],
      providers: [AuthVerificationService],
    }).compile();

    controller = module.get<AuthVerificationController>(AuthVerificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
