import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductsController } from './products.controller';
import { RabbitMQProvider } from '../../infra/rabbitmq/rabbitmq.provider';
import { CommandHandlers } from './commands';
import { EventHandlers } from './events';
import { QueryHandlers } from './queries';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities';
import { ProductsRepository } from './repositories';
import { TypeOrmExModule } from '../../infra/database/typeorm/typeorm-ex.module';
import { ProductsFilter } from './filters';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Product]),
    TypeOrmExModule.forCustomRepository([ProductsRepository]),
  ],
  controllers: [ProductsController],
  providers: [
    RabbitMQProvider,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ProductsFilter,
  ],
})
export class ProductsModule {}
