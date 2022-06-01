import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { protobufPackage as protobufPackageCart } from './cart/cart.pb';
import { protobufPackage } from './order/order.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: process.env.URL,
        package: [protobufPackage, protobufPackageCart],
        protoPath: [
          join('node_modules/proto/order.proto'),
          join('node_modules/proto/cart.proto'),
        ],
      },
    },
  );
  await app.listen();
}
bootstrap();
