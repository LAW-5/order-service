import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ORDER_SERVICE_NAME,
} from './order.pb';

@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  public async createOrder({
    userId,
    merchantId,
    productId,
    quantity,
    address,
    promoId,
  }: CreateOrderDto): Promise<CreateOrderResponse> {
    let order = new Order();
    order.userId = userId;
    order.merchantId  = merchantId;
    order.productId  = productId;
    order.quantity  = quantity;
    order.address  = address;
    order.promoId = promoId;
    order.orderStatus = 'Menunggu Konfirmasi';

    await this.repository.save(order);

    return { status: HttpStatus.OK, error: null };
  }

  public async listOrder({
    userId,
  }: ListOrderDto): Promise<ListOrderResponse> {
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
        address: x.address,
      }),
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
        address: x.address,
      }),
    );

    return response;
  }

  public async editOrder({ id, orderStatus }: EditOrderDto): Promise<EditOrderResponse> {
    let order: Order = await this.repository.findOne({ where: { id: id } });

    if (!order) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['No order with given id'],
      };
    }

    order.orderStatus = orderStatus;
    await this.repository.save(order);

    return { status: HttpStatus.OK, error: null };
  }
}
