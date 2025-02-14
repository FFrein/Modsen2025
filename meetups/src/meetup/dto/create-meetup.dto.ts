import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMeetupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  place: string;
}
