import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Closeable,
  Transport,
} from '@nestjs/microservices';

export const RabbitMQProvider: Provider = {
  provide: 'RMQ_PRODUCT_NOTIFY',
  useFactory: (configService: ConfigService): ClientProxy & Closeable => {
    const host = configService.get<string>('RMQ_HOST');
    const user = configService.get<string>('RMQ_USER');
    const pass = configService.get<string>('RMQ_PASS');
    const queueName = configService.get<string>('RMQ_QUEUE_NAME');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${pass}@${host}`],
        queue: queueName,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};
