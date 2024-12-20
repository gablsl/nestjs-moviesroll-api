import { Test, TestingModule } from '@nestjs/testing';
import { AdminMoviesService } from './admin-movies.service';

describe('MoviesService', () => {
  let service: AdminMoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminMoviesService],
    }).compile();

    service = module.get<AdminMoviesService>(AdminMoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
