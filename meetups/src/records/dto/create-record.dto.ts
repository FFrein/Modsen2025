import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecordDto {
  @ApiProperty({
    example: 1,
    description: 'Id митапа',
  })
  @IsNumber()
  @IsNotEmpty()
  meetupId!: number;
}
