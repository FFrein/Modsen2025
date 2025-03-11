import { Module } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PasswordService],
  exports: [PasswordService],
})
export class UsersModule {}
