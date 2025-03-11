import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    example: '1',
    description: 'Идентификатор митапа',
  })
  @IsInt()
  @IsNotEmpty()
  meetupId!: number;
  @ApiProperty({
    example: 'Тэг1',
    description: 'Название тэга',
  })
  @IsString()
  @IsNotEmpty()
  tag!: string;
}
