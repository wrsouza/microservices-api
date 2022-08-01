import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateProductCommand,
  UpdateProductCommand,
  DeleteProductCommand,
} from './commands';
import { Product } from './entities';
import {
  CreateProductRequest,
  UpdateProductRequest,
  ListProductRequest,
} from './requests';
import { ListProductsQuery, GetProductQuery } from './queries';
import { PaginateDto, PaginateResultDto, ProductDto } from './dtos';

@Controller('/products')
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async paginate(
    @Query() listProductRequest: ListProductRequest,
  ): Promise<PaginateResultDto<Product>> {
    const query = new ListProductsQuery(listProductRequest);
    return await this.queryBus.execute(query);
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<ProductDto> {
    const query = new GetProductQuery(id);
    return await this.queryBus.execute(query);
  }

  @Post()
  async store(
    @Body() createProductRequest: CreateProductRequest,
  ): Promise<ProductDto> {
    const command = new CreateProductCommand(createProductRequest);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductRequest: UpdateProductRequest,
  ): Promise<ProductDto> {
    const command = new UpdateProductCommand(id, updateProductRequest);
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<void> {
    const command = new DeleteProductCommand(id);
    await this.commandBus.execute(command);
  }
}
