import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { Role } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiPropertyOptional({
    enum: Role,
    required: false,
    description: 'Роль пользователя',
  })
  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
