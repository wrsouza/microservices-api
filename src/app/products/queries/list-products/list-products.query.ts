import { PaginateDto } from '../../dtos';
import { Product } from '../../entities';

export class ListProductsQuery {
  constructor(public readonly paginateDto: PaginateDto) {}
}
