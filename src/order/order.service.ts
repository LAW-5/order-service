import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import {
  CreateOrderDto,
  ListOrderDto,
  ListMerchantOrderDto,
  EditOrderDto,
} from './order.dto';
import { Order } from './order.entity';
import {
  CreateOrderResponse,
  ListOrderResponse,
  ListMerchantOrderResponse,
  EditOrderResponse,
} from './order.pb';

@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger;

  public async createOrder({
    userId,
    merchantId,
    productId,
    quantity,
    totalPrice,
    name,
    address,
  }: CreateOrderDto): Promise<CreateOrderResponse> {
    let order = new Order();
    order.userId = userId;
    order.merchantId = merchantId;
    order.productId = productId;
    order.quantity = quantity;
    order.totalPrice = totalPrice;
    order.name = name;
    order.address = address;
    order.orderStatus = 'Dikemas';

    await this.repository.save(order);

    this.logger.log('info', `creating an order named: ${order.name}`);

    return { status: HttpStatus.OK, error: null };
  }

  public async listOrder({ userId }: ListOrderDto): Promise<ListOrderResponse> {
    const orders: Order[] = await this.repository.find({
      where: { userId: userId },
    });

    let response: ListOrderResponse = {
      data: [],
      status: HttpStatus.OK,
      error: null,
    };

    orders.forEach((x: Order) =>
      response.data.push({
        id: x.id,
        orderStatus: x.orderStatus,
        productId: x.productId,
        quantity: x.quantity,
        totalPrice: x.totalPrice,
        name: x.name,
        address: x.address,
      }),
    );

    this.logger.log(
      'info',
      `listing all order in total of ${orders.length} row`,
    );

    return response;
  }

  public async listMerchantOrder({
    merchantId,
  }: ListMerchantOrderDto): Promise<ListMerchantOrderResponse> {
    const orders: Order[] = await this.repository.find({
      where: { merchantId: merchantId },
    });

    let response: ListOrderResponse = {
      data: [],
      status: HttpStatus.OK,
      error: null,
    };

    orders.forEach((x: Order) =>
      response.data.push({
        id: x.id,
        orderStatus: x.orderStatus,
        productId: x.productId,
        quantity: x.quantity,
        totalPrice: x.totalPrice,
        name: x.name,
        address: x.address,
      }),
    );

    this.logger.log(
      'info',
      `listing all order for merchant id: ${merchantId} with a total of ${orders.length} row`,
    );

    return response;
  }

  public async editOrder({
    id,
    orderStatus,
  }: EditOrderDto): Promise<EditOrderResponse> {
    let order: Order = await this.repository.findOne({ where: { id: id } });

    if (!order) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['No order with given id'],
      };
    }

    order.orderStatus = orderStatus;
    await this.repository.save(order);

    this.logger.log('info', `editing order for order id: ${id}`);

    return { status: HttpStatus.OK, error: null };
  }
}
