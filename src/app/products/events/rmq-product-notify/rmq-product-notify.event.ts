import { ProductDto } from '../../dtos';

export class RmqProductNotifyEvent {
  constructor(public readonly productDto: ProductDto) {}
}
