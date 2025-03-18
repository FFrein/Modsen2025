import { Role } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class userDto {
  @IsInt()
  @IsNotEmpty()
  id?: number;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  role!: Role;

  @IsInt()
  sub?: number;
}
