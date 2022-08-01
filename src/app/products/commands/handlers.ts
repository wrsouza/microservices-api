import { CreateProductHandler } from './create-product/create-product.handler';
import { UpdateProductHandler } from './update-product/update-product.handler';
import { DeleteProductHandler } from './delete-product/delete-product.handler';

export const CommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
];
