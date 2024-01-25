import { Test, TestingModule } from '@nestjs/testing';
import { StringGenUtilService } from './string-gen-util.service';

describe('StringGenUtilService', () => {
  let service: StringGenUtilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StringGenUtilService],
    }).compile();

    service = module.get<StringGenUtilService>(StringGenUtilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
