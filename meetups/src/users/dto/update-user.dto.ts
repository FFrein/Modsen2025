import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    enum: UserRole,
    required: false,
    description: 'Роль пользователя',
  })
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;
}
