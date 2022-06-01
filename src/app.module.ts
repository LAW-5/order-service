import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order/order.entity';
import { OrderModule } from './order/order.module';
import 'dotenv/config';
import { Cart } from './cart/cart.entity';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [Order, Cart],
      synchronize: true,
    }),
    OrderModule,
    CartModule,
  ],
})
export class AppModule {}
