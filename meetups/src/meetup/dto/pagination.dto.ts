import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ example: '1', description: 'Страница' })
  @IsOptional()
  @IsString()
  page: string;

  @ApiPropertyOptional({ example: '2', description: 'Количество' })
  @IsOptional()
  @IsString()
  limit: string;

  @ApiPropertyOptional({ example: 'name', description: 'Поле сортировки' })
  @ValidateIf((o: PaginationDto) => o.sortOrder !== undefined)
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    example: 'asc',
    description: 'Порядок сортировки',
    enum: ['asc', 'desc'],
  })
  @ValidateIf((o: PaginationDto) => o.sortBy !== undefined)
  @IsString()
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({
    example: 'name',
    description: 'Поле по которому фильтруем',
  })
  @ValidateIf((o: PaginationDto) => o.filterValue !== undefined)
  @IsString()
  filterBy?: string;

  @ApiPropertyOptional({
    example: 'Meetup1',
    description: 'Значение поля фильтрации',
  })
  @ValidateIf((o: PaginationDto) => o.filterBy !== undefined)
  @IsString()
  filterValue?: string;
}
