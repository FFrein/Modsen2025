import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMeetupDto {
  @ApiProperty({
    example: 'Meetup1',
    description: 'Название митапа',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Митап о митапах',
    description: 'Описание митапа',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '2013-02-14T13:15:03-08:00',
    description: 'Время проведения',
  })
  @IsString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    example: 'Место',
    description: 'Место проведения',
  })
  @IsString()
  @IsNotEmpty()
  place: string;
}
