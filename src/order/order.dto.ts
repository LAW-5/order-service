import { IsNumber, IsString } from 'class-validator';
import {
  CreateOrderRequest,
  ListOrderRequest,
  ListMerchantOrderRequest,
  EditOrderRequest,
} from './order.pb';

export class CreateOrderDto implements CreateOrderRequest {
  @IsNumber()
  public readonly userId: number;

  @IsNumber()
  public readonly merchantId: number;

  @IsNumber()
  public readonly productId: number[];

  @IsNumber()
  public readonly quantity: number[];

  @IsNumber()
  public readonly totalPrice: number;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly address: string;

  @IsString()
  public readonly orderStatus: string;
}

export class ListOrderDto implements ListOrderRequest {
  @IsNumber()
  public readonly userId: number;
}

export class ListMerchantOrderDto implements ListMerchantOrderRequest {
  @IsNumber()
  public readonly merchantId: number;
}

export class EditOrderDto implements EditOrderRequest {
  @IsNumber()
  public readonly id: number;

  @IsString()
  public readonly orderStatus: string;
}
