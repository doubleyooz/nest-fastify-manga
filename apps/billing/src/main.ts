import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  const configService = app.get(ConfigService);
  console.log(configService.get<string>('RABBIT_MQ_URI'));
  await app.startAllMicroservices();
}
bootstrap();
