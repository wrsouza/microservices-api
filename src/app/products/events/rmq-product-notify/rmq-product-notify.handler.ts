import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { RmqProductNotifyEvent } from './rmq-product-notify.event';

@EventsHandler(RmqProductNotifyEvent)
export class RmqProductNotifyHandler
  implements IEventHandler<RmqProductNotifyEvent>
{
  constructor(
    @Inject('RMQ_PRODUCT_NOTIFY')
    private rmqService: ClientProxy,
  ) {}

  async handle({ productDto }: RmqProductNotifyEvent) {
    try {
      Logger.log(`Handler RMQ: ${JSON.stringify(productDto)}`);
      this.rmqService.emit({ cmd: 'add-product' }, JSON.stringify(productDto));
      Logger.log(`Published RMQ (add-product): ${JSON.stringify(productDto)}`);
    } catch (err) {
      throw err;
    }
  }
}
