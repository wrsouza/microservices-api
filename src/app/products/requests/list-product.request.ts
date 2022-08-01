import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { TypeExists, SortExists } from '../validations';

export class ListProductRequest {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  @TypeExists()
  type: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @IsOptional()
  @IsString()
  @SortExists()
  sort: string;

  @IsOptional()
  @IsNumber()
  @Min(5)
  @Max(100)
  perPage: number;
}
