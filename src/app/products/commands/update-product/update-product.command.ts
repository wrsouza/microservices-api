import { UpdateProductDto } from '../../dtos';

export class UpdateProductCommand {
  constructor(
    public readonly id: string,
    public readonly updateProductDto: UpdateProductDto,
  ) {}
}
