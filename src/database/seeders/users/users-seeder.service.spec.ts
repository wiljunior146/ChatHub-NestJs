import { Test, TestingModule } from '@nestjs/testing';
import { UsersSeederService } from './users-seeder.service';

describe('UsersSeederService', () => {
  let service: UsersSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersSeederService],
    }).compile();

    service = module.get<UsersSeederService>(UsersSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
