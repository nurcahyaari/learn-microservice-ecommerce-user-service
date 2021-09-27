import { Test, TestingModule } from '@nestjs/testing';
import { Users } from './entities/user.entity';
import { UserRepository } from './repository/user.repo';
import { UsersService } from './users.service';

class UserRepoMock {
  FindByEmail(email: string) {
    return [];
  }
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const userRepo = {
      provide: UserRepository,
      useClass: UserRepoMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userRepo],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
