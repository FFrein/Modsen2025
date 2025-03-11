import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'username',
    description: 'Имя пользователя',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    example: 'password',
    description: 'Пароль пользователя',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    example: 'creator',
    description: 'Роль пользователя',
    enum: Role,
  })
  @IsString()
  @IsNotEmpty()
  role!: Role;
}
