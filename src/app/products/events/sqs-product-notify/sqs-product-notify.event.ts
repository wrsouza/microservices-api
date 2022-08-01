import { ProductDto } from '../../dtos';

export class SqsProductNotifyEvent {
  constructor(public readonly productDto: ProductDto) {}
}
