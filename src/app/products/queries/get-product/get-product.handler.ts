import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from './get-product.query';
import { ProductsRepository } from '../../repositories';
import { Product } from '../../entities';
import { NotFoundException } from '@nestjs/common';
import { ProductDto } from '../../dtos';
import { ProductsFilter } from '../../filters';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(
    private repository: ProductsRepository,
    private filter: ProductsFilter,
  ) {}

  async execute({ id }: GetProductQuery): Promise<ProductDto> {
    try {
      const product = await this.repository.findOneByOrFail({ id });
      return this.filter.map(product);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
