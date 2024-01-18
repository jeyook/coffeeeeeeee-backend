import { Test, TestingModule } from '@nestjs/testing';
import { CafeController } from './cafe.controller';

describe('PlaceController', () => {
  let controller: CafeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CafeController],
    }).compile();

    controller = module.get<CafeController>(CafeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
