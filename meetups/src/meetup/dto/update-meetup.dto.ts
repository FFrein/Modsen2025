import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreateMeetupDto } from './create-meetup.dto';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {
  @ApiProperty({ description: 'ID записи', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
