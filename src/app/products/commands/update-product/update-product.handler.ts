import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Product } from '../../entities';
import { ProductsRepository } from '../../repositories';
import { UpdateProductCommand } from './update-product.command';
import { ProductsFilter } from '../../filters';
import { ProductDto } from '../../dtos';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    private repository: ProductsRepository,
    private filter: ProductsFilter,
  ) {}

  async execute({
    id,
    updateProductDto,
  }: UpdateProductCommand): Promise<ProductDto> {
    try {
      const product = await this.repository.findOneByOrFail({ id });
      await this.repository.update(product, updateProductDto);
      return this.filter.map(product);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
