import { Injectable } from '@nestjs/common';
import { Product } from '../entities';
import { ProductDto } from '../dtos';

@Injectable()
export class ProductsFilter {
  map(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      createdAt: product.createdAt,
    };
  }
}
