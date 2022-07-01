import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

const createUserDto: CreateUserDto = {
  name: 'Andrew Neto',
  age: 26,
  address: 'ES, Brazil',
};

const mockUser = {
  name: 'Andrew Neto',
  age: 26,
  address: 'ES, Brazil',
  _id: 'a id',
};

const mockUsers = [
  {
    name: 'Andrew',
    age: 26,
    address: 'ES, Brazil',
  },
  {
    name: 'Enzo',
    age: 12,
    address: 'ES, Brazil',
  },
];

describe('User Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockUsers),
            create: jest.fn().mockResolvedValue(createUserDto),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockUser);

      await controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of User', async () => {
      expect(controller.findAll()).resolves.toEqual(mockUsers);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
