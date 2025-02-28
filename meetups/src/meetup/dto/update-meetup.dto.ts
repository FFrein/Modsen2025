import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreateMeetupDto } from './create-meetup.dto';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
