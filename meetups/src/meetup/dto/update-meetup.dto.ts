import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMeetupDto } from './create-meetup.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {
  @ApiProperty({ description: 'ID записи', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
