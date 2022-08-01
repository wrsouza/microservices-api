import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductsRepository } from '../../repositories';
import { DeleteProductCommand } from './delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(private repository: ProductsRepository) {}

  async execute({ id }: DeleteProductCommand): Promise<void> {
    try {
      const product = await this.repository.findOneByOrFail({ id });
      await this.repository.remove(product);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
