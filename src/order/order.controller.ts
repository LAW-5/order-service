import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateOrderDto,
  ListOrderDto,
  ListMerchantOrderDto,
  EditOrderDto,
} from './order.dto';
import {
  CreateOrderResponse,
  ListOrderResponse,
  ListMerchantOrderResponse,
  EditOrderResponse,
  ORDER_SERVICE_NAME,
} from './order.pb';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  @Inject(OrderService)
  private readonly service: OrderService;

  @GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
  private createOrder(payload: CreateOrderDto): Promise<CreateOrderResponse> {
    return this.service.createOrder(payload);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'ListOrder')
  private listOrder(payload: ListOrderDto): Promise<ListOrderResponse> {
    return this.service.listOrder(payload);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'ListMerchantOrder')
  private listMerchantOrder(payload: ListMerchantOrderDto): Promise<ListMerchantOrderResponse> {
    return this.service.listMerchantOrder(payload);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'EditOrder')
  private editOrder(payload: EditOrderDto): Promise<EditOrderResponse> {
    return this.service.editOrder(payload);
  }
}
