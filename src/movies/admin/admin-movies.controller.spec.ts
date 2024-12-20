import { Test, TestingModule } from '@nestjs/testing';
import { AdminMoviesController } from './admin-movies.controller';
import { AdminMoviesService } from './admin-movies.service';

describe('MoviesController', () => {
  let controller: AdminMoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminMoviesController],
      providers: [AdminMoviesService],
    }).compile();

    controller = module.get<AdminMoviesController>(AdminMoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
