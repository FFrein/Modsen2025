import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'your_refresh_token_here',
    description:
      'Refresh token, который будет использован для получения новых токенов',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
