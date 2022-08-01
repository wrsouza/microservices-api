import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RmqProductNotifyEvent, SqsProductNotifyEvent } from '../../events';
import { CreateProductCommand } from './create-product.command';
import { ProductsRepository } from '../../repositories';
import { ProductDto } from '../../dtos';
import { ProductsFilter } from '../../filters';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    private repository: ProductsRepository,
    private filter: ProductsFilter,
  ) {}

  async execute({
    createProductDto,
  }: CreateProductCommand): Promise<ProductDto> {
    Logger.log(`Executing Create Product: ${JSON.stringify(createProductDto)}`);

    try {
      const newProduct = this.repository.create();
      newProduct.name = createProductDto.name;
      newProduct.sku = createProductDto.sku;
      newProduct.price = createProductDto.price;

      await this.repository.save(newProduct);

      Logger.log(`new Product: ${JSON.stringify(newProduct)}`);

      const productDto = this.filter.map(newProduct);

      const rmqEvent = new RmqProductNotifyEvent(productDto);
      await this.eventBus.publish(rmqEvent);

      const sqsEvent = new SqsProductNotifyEvent(productDto);
      await this.eventBus.publish(sqsEvent);

      return productDto;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
