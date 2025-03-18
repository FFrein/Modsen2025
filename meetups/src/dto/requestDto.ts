import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Request } from 'express';

import { User } from '../users/entities/user.entity';

export class AuthRequestDto extends Request {
  @ApiProperty({ description: 'User identifier' })
  @IsNotEmpty()
  @IsString()
  user!: User;
}
