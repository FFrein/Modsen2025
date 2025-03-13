import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PasswordService } from './password.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthRequestDto } from '../dto/requestDto';
import { AuthLoginDto } from './dto/AuthLoginDto';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService,PrismaService,PasswordService,UsersService,JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


describe('AuthController2', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  let passwordService: PasswordService;
  let jwtService: JwtService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = new PrismaService();
    passwordService = new PasswordService();
    jwtService = new JwtService({
        secret: 'test-secret', 
      });
    usersService = new UsersService(prisma);
    authService = new AuthService(usersService,jwtService,passwordService);
    authController = new AuthController(authService,passwordService,usersService);
  });

  describe('registration', () => {
    it('should return an array of Auth', async () => {
      const mockRequest = {
        username: 'testuser',
        password: "testuser",
        role: "user"
      } as CreateUserDto;

      const result = 
        {
          id: expect.any(Number),
          password: expect.any(String),
          role: expect.any(String),
          username: expect.any(String),
        }

      try{
        let data = expect(await authController.create(mockRequest));

        data.toMatchObject(result);
      }
      catch(e){
        if (e instanceof Error) {
            expect(e).toMatchObject(new Error("User exist"));
          } else {
            throw e;
          }
      }
    });
  });

  describe('authorization', () => {
    it('should return an array of Auth', async () => {
      const mockRequest = {
        username:"testuser",
        password:"testuser"
      } as AuthLoginDto;

      const mockAuthRequest = {
        user:{
            username: 'testuser',
            password: "testuser",
        }
      } as AuthRequestDto

      const result = 
        {
          access_token: expect.any(String),
          refresh_token: expect.any(String),
        }

      expect(authController.login(mockRequest,mockAuthRequest)).toMatchObject(result);
    });
  });

});