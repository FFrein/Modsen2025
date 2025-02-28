import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    example: '1',
    description: 'Страница',
  })
  @IsOptional()
  @IsString()
  page: string;

  @ApiPropertyOptional({
    example: '2',
    description: 'Количество',
  })
  @IsOptional()
  @IsString()
  limit: string;

  @ApiPropertyOptional({
    example: 'name',
    description: 'Поле сортировки',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    example: 'asc',
    description: 'Порядок сортировки',
    enum: ['asc', 'desc'],
  })
  @ApiPropertyOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({
    example: 'не реализованно',
    description: 'Пользователь по которому фильтруем',
  })
  @IsOptional()
  @IsString()
  ownerName?: string;
}
