import { Type } from 'class-transformer';
import { IsNumber, IsString, Max, MaxLength } from 'class-validator';

export class CreateProductRequest {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(20)
  sku: string;

  @IsNumber()
  @Type(() => Number)
  price: number;
}
