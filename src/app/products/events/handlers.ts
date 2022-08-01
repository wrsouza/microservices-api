import { RmqProductNotifyHandler } from './rmq-product-notify/rmq-product-notify.handler';
import { SqsProductNotifyHandler } from './sqs-product-notify/sqs-product-notify.handler';

export const EventHandlers = [RmqProductNotifyHandler, SqsProductNotifyHandler];
