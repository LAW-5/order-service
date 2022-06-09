import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { CartController } from './cart.controller';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    WinstonModule.forRoot({
      format: format.combine(
        format.timestamp({ format: 'isoDateTime' }),
        format.json(),
      ),
      transports: [
        new transports.File({
          filename: 'src/log/logger.log',
        }),
      ],
    }),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
