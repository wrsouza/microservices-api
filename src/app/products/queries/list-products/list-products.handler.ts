import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Product } from '../../entities';
import { ListProductsQuery } from './list-products.query';
import { ProductsRepository } from '../../repositories';
import { PaginateResultDto, ProductDto } from '../../dtos';
import { ProductsFilter } from '../../filters';

@QueryHandler(ListProductsQuery)
export class ListProductsHandler implements IQueryHandler<ListProductsQuery> {
  constructor(
    private repository: ProductsRepository,
    private filter: ProductsFilter,
  ) {}

  async execute({
    paginateDto,
  }: ListProductsQuery): Promise<PaginateResultDto<ProductDto>> {
    const result = await this.repository.paginate(paginateDto, {}, []);
    return {
      ...result,
      data: result.data.map((product) => this.filter.map(product)),
    };
  }
}
