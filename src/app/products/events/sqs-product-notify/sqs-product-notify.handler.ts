import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SqsProductNotifyEvent } from './sqs-product-notify.event';
import { Producer } from 'sqs-producer';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

interface ProducerOptions {
  queueUrl: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

@EventsHandler(SqsProductNotifyEvent)
export class SqsProductNotifyHandler
  implements IEventHandler<SqsProductNotifyEvent>
{
  private readonly producer: Producer;

  constructor(private readonly configService: ConfigService) {
    this.producer = Producer.create({
      queueUrl: this.configService.get<string>('AWS_SQS_QUEUE_URL'),
      region: this.configService.get<string>('AWS_REGION'),
      accessKeyId: this.configService.get<string>('AWS_CLIENT_ID'),
      secretAccessKey: this.configService.get<string>('AWS_CLIENT_SECRET'),
    } as ProducerOptions);
  }

  async handle({ productDto }: SqsProductNotifyEvent) {
    try {
      Logger.log(`Handler SQS: ${JSON.stringify(productDto)}`);
      const id = uuid();
      const body = JSON.stringify(productDto);
      await this.producer.send([{ id, body }]);
      Logger.log(`Published SQS: ${id} | Body: ${body}`);
    } catch (err) {
      throw err;
    }
  }
}
