import { BaseRepository } from './base.repository';
import { Product } from '../entities';
import { CustomRepository } from '../../../infra/database/typeorm/typeorm-ex.decorator';

@CustomRepository(Product)
export class ProductsRepository extends BaseRepository<Product> {}
